import Axios from 'axios'

const md5 = require('md5')
const ts = Date.now()
const hash = md5(ts + process.env.VUE_APP_PRIVATE_KEY + process.env.VUE_APP_PUBLIC_KEY)

export default {
  namespaced: true,
  state: {
    comic: null,
    characters: [],
    error: null,
    hasNoImage: element => element.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
  },
  actions: {
    async getComic({commit}, id) {
      commit('setLoading', true, { root: true })
      commit('clearComic')
      await Axios 
        .get(`${process.env.VUE_APP_API_URL}/comics/${id}?ts=${ts}&apikey=${process.env.VUE_APP_PUBLIC_KEY}&hash=${hash}`)
        .then(response => {
          commit('setLoading', false, { root: true })
          commit('setComic', response.data.data.results)
        })
        .catch(error => commit('setError', error))
    },
    async getCharacters({commit}, id) {
      commit('setLoading', true, { root: true })
      commit('clearCharacters')
      await Axios 
        .get(`${process.env.VUE_APP_API_URL}/comics/${id}/characters?ts=${ts}&apikey=${process.env.VUE_APP_PUBLIC_KEY}&hash=${hash}`)
        .then(response => {
          commit('setLoading', false, { root: true })
          commit('setCharacters', response.data.data.results)
        })
        .catch(error => commit('setError', error))
    }
  },
  mutations: {
    setComic(state, response) {
      state.comic = response[0]
    },
    clearComic(state) {
      state.comic = null
    },
    setCharacters(state, response) {
      state.characters = response.filter(state.hasNoImage)
    },
    clearCharacters(state) {
      state.characters = []
    },
    setError(state, error) {
      state.error = error.message
      console.log(error)
    }
  }
}
