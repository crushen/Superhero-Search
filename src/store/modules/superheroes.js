import Axios from 'axios'
import { db } from '@/db'

export default {
  namespaced: true,
  state: {
    superheroes: [],
    searchResults: [],
    hero: {
      info: null,
      comics: []
    },
    limit: 10,
    offset: 0,
    loading: true,
    error: null,
    noScroll: false,
    hasNoImage: element => element.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
  },
  actions: {
    async getSuperheroes({commit, state}) {
      commit('setLoading', true)
      await Axios
        .get(`${db.url}/characters?ts=${db.ts}&apikey=${db.key}&hash=${db.hash}&limit=${state.limit}`)
        .then(response => {
          commit('setSuperheroes', response.data)
          commit('setLoading', false)
        })
        .catch(error => commit('setError', error))
    },
    async getMoreHeroes({commit, state}, string) {
      commit('setLoading', true)
      commit('setOffset', 10)
      // If all heroes are being displayed
      if(!state.searchResults.length) {
        await Axios
        .get(`${db.url}/characters?ts=${db.ts}&apikey=${db.key}&hash=${db.hash}&limit=${state.limit}&offset=${state.offset}`)
        .then(response => {
          commit('setLoading', false)
          commit('addHeroes', response.data)
        })
        .catch(error => commit('setError', error))
      } else {
        // If search results are being displayed
        await Axios 
        .get(`${db.url}/characters?nameStartsWith=${string}&ts=${db.ts}&apikey=${db.key}&hash=${db.hash}&limit=${state.limit}&offset=${state.offset}`)
        .then(response => {
          commit('setLoading', false)
          commit('addSearchResults', response.data)
        })
        .catch(error => commit('setError', error))
      }

    },
    async searchHeroes({commit, state}, string) {
      commit('setLoading', true)
      await Axios 
        .get(`${db.url}/characters?nameStartsWith=${string}&ts=${db.ts}&apikey=${db.key}&hash=${db.hash}&limit=${state.limit}`)
        .then(response => {
          commit('setLoading', false)
          commit('setSearchResults', response.data)
        })
        .catch(error => commit('setError', error))
    },
    async getHero({commit, state}, id) {
      commit('setLoading', true)
      commit('clearHero')
      await Axios 
        .get(`${db.url}/characters/${id}?ts=${db.ts}&apikey=${db.key}&hash=${db.hash}&limit=${state.limit}`)
        .then(response => {
          commit('setLoading', false)
          commit('setHero', response.data)
        })
        .catch(error => commit('setError', error))
    },
    async getComics({commit, state}, id) {
      commit('setLoading', true)
      commit('clearHero')
      await Axios 
        .get(`${db.url}/characters/${id}/comics?ts=${db.ts}&apikey=${db.key}&hash=${db.hash}&limit=${state.limit}`)
        .then(response => {
          commit('setLoading', false)
          commit('setComics', response.data)
        })
        .catch(error => commit('setError', error))
    },
  },
  mutations: {
    setSuperheroes(state, response) {
      state.superheroes = []
      state.noScroll = false
      const array = response.data.results
      state.superheroes = array.filter(state.hasNoImage)
    },
    addHeroes(state, response) {
      const array = response.data.results.filter(state.hasNoImage)
      // If response has any data, concat to array
      if(array.length) {
        state.superheroes = state.superheroes.concat(array)
      } else {
        // Otherwise, stop getting more data when scrolling to bottom of page
        state.noScroll = true
      }
    },
    setSearchResults(state, response) {
      state.searchResults = []
      state.noScroll = false
      const array = response.data.results
      state.searchResults = array.filter(state.hasNoImage)
    },
    addSearchResults(state, response) {
      const array = response.data.results.filter(state.hasNoImage)
      if(array.length) {
        state.searchResults = state.searchResults.concat(array)
      } else {
        state.noScroll = true
      }
    },
    setHero(state, response) {
      state.hero.info = response.data.results[0]
    },
    clearHero(state) {
      state.hero.info = null
      state.hero.comics = []
    },
    setComics(state, response) {
      state.hero.comics = response.data.results.filter(state.hasNoImage)
    },
    setLoading(state, set) {
      state.loading = set
    },
    setError(state, error) {
      state.error = error.message
      console.log(error)
    },
    setOffset(state, amount) {
      state.offset += amount
    }
  }
}