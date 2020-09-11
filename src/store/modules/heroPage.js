import Axios from 'axios'
import { db } from '@/db'

export default {
  namespaced: true,
  state: {
    hero: {
      info: null,
      comics: []
    },
    loading: true,
    error: null,
    hasNoImage: element => element.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
  },
  actions: {
    async getHero({commit}, id) {
      commit('setLoading', true)
      commit('clearHero')
      await Axios 
        .get(`${db.url}/characters/${id}?ts=${db.ts}&apikey=${db.key}&hash=${db.hash}`)
        .then(response => {
          commit('setLoading', false)
          commit('setHero', response.data.data.results)
        })
        .catch(error => commit('setError', error))
    },
    async getComics({commit}, id) {
      commit('setLoading', true)
      commit('clearHero')
      await Axios 
        .get(`${db.url}/characters/${id}/comics?ts=${db.ts}&apikey=${db.key}&hash=${db.hash}`)
        .then(response => {
          commit('setLoading', false)
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
    setLoading(state, set) {
      state.loading = set
    },
    setError(state, error) {
      state.error = error.message
      console.log(error)
    }
  }
}
