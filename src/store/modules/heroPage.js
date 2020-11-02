import Axios from 'axios'

const md5 = require('md5')
const ts = Date.now()
const hash = md5(ts + process.env.VUE_APP_PRIVATE_KEY + process.env.VUE_APP_PUBLIC_KEY)

export default {
  namespaced: true,
  state: {
    hero: {
      info: null,
      comics: []
    },
    error: null,
    hasNoImage: element => element.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
  },
  actions: {
    async getHero({commit}, id) {
      commit('setLoading', true, { root: true })
      commit('clearHero')
      await Axios 
        .get(`${process.env.VUE_APP_API_URL}/characters/${id}?ts=${ts}&apikey=${process.env.VUE_APP_PUBLIC_KEY}&hash=${hash}`)
        .then(response => {
          commit('setLoading', false, { root: true })
          commit('setHero', response.data.data.results)
        })
        .catch(error => commit('setError', error))
    },
    async getComics({commit}, id) {
      commit('setLoading', true, { root: true })
      commit('clearHero')
      await Axios 
        .get(`${process.env.VUE_APP_API_URL}/characters/${id}/comics?ts=${ts}&apikey=${process.env.VUE_APP_PUBLIC_KEY}&hash=${hash}`)
        .then(response => {
          commit('setLoading', false, { root: true })
          commit('setComics', response.data.data.results)
        })
        .catch(error => commit('setError', error))
    },
  },
  mutations: {
    setHero(state, response) {
      state.hero.info = response[0]
    },
    clearHero(state) {
      state.hero.info = null
      state.hero.comics = []
    },
    setComics(state, response) {
      state.hero.comics = response.filter(state.hasNoImage)
    },
    setError(state, error) {
      state.error = error.message
      // console.log(error)
    }
  }
}
