import Axios from 'axios'
import { db } from '@/db'

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
        .get(`${db.url}/comics/${id}?ts=${db.ts}&apikey=${db.key}&hash=${db.hash}`)
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
        .get(`${db.url}/comics/${id}/characters?ts=${db.ts}&apikey=${db.key}&hash=${db.hash}`)
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
