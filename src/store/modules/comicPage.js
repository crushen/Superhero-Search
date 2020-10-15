import Axios from 'axios'
import { db } from '@/db'

export default {
  namespaced: true,
  state: {
    comic: null,
    error: null
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
  },
  mutations: {
    setComic(state, response) {
      state.comic = response[0]
    },
    clearComic(state) {
      state.comic = null
    },
    setError(state, error) {
      state.error = error.message
      console.log(error)
    }
  }
}
