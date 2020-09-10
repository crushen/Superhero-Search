import Axios from 'axios'
import { db } from '@/db'

export default {
  namespaced: true,
  state: {
    featuredHeroes: [],
    searchResults: [],
    noScroll: false,
    offset: 15,
    loading: true,
    error: null,
    hasNoImage: element => element.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
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
    },
    async searchHeroes({commit}, string) {
      commit('setLoading', true)
      await Axios 
        .get(`${db.url}/characters?nameStartsWith=${string}&ts=${db.ts}&apikey=${db.key}&hash=${db.hash}&limit=${15}`)
        .then(response => {
          commit('setLoading', false)
          commit('setSearchResults', response.data)
        })
        .catch(error => commit('setError', error))
    },
    async getMoreHeroes({commit, state}, string) {
      commit('setLoading', true)
      commit('setOffset', 15)
        await Axios 
        .get(`${db.url}/characters?nameStartsWith=${string}&ts=${db.ts}&apikey=${db.key}&hash=${db.hash}&limit=${15}&offset=${state.offset}`)
        .then(response => {
          commit('setLoading', false)
          commit('addSearchResults', response.data)
        })
        .catch(error => commit('setError', error))
    }
  },
  mutations: {
    addHero(state, response) {
      state.featuredHeroes.push(response[0])
    },
    setSearchResults(state, response) {
      state.searchResults = []
      state.noScroll = false
      state.offset = 15
      const array = response.data.results
      state.searchResults = array.filter(state.hasNoImage)
    },
    setOffset(state, amount) {
      state.offset += amount
    },
    addSearchResults(state, response) {
      const array = response.data.results.filter(state.hasNoImage)
      if(array.length) {
        state.searchResults = state.searchResults.concat(array)
      } else {
        state.noScroll = true
      }
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
