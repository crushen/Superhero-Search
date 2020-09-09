import Axios from 'axios'
import { db } from '@/db'

export default {
  namespaced: true,
  state: {
    featuredHeroes: [],
    loading: true,
    error: null,
  },
  actions: {
    async getHero({commit}, id) {
      commit('setLoading', true)
      await Axios 
        .get(`${db.url}/characters/${id}?ts=${db.ts}&apikey=${db.key}&hash=${db.hash}`)
        .then(response => {
          commit('addHero', response.data.data.results)
          commit('setLoading', false)
        })
        .catch(error => commit('setError', error))
    }
  },
  mutations: {
    addHero(state, response) {
      state.featuredHeroes.push(response[0])
    },
    setLoading(state, set) {
      state.loading = set
    },
    setError(state, error) {
      state.error = error.message
      console.log(error)
    }
  }
}
