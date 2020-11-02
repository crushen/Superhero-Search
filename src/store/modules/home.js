import Axios from 'axios'
import { db } from '@/db'

const state = () => ({
  featuredHeroes: [],
  searchResults: [],
  noMoreResults: false,
  offset: 15,
  error: null,
  hasNoImage: element => element.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
})

export const actions = {
  async getHero({commit}, id) {
    commit('setLoading', true, { root: true })
    await Axios 
      .get(`${db.url}/characters/${id}?ts=${db.ts}&apikey=${db.key}&hash=${db.hash}`)
      .then(response => {
        commit('addHero', response.data.data.results)
        commit('setLoading', false, { root: true })
      })
      .catch(error => commit('setError', error))
  },
  async searchHeroes({commit}, string) {
    commit('setLoading', true, { root: true })
    await Axios 
      .get(`${db.url}/characters?nameStartsWith=${string}&ts=${db.ts}&apikey=${db.key}&hash=${db.hash}&limit=${15}`)
      .then(response => {
        commit('setLoading', false, { root: true })
        commit('setSearchResults', response.data.data.results)
      })
      .catch(error => commit('setError', error))
  },
  async getMoreHeroes({commit, state}, string) {
    commit('setLoading', true, { root: true })
    commit('setOffset', 15)
      await Axios 
      .get(`${db.url}/characters?nameStartsWith=${string}&ts=${db.ts}&apikey=${db.key}&hash=${db.hash}&limit=${15}&offset=${state.offset}`)
      .then(response => {
        commit('setLoading', false, { root: true })
        commit('addSearchResults', response.data.data.results)
      })
      .catch(error => commit('setError', error))
  }
}

export const mutations = {
  addHero(state, response) {
    state.featuredHeroes.push(response[0])
  },
  setSearchResults(state, response) {
    state.searchResults = []
    state.noScroll = false
    state.offset = 15
    const array = response
    state.searchResults = array.filter(state.hasNoImage)
  },
  setOffset(state, amount) {
    state.offset += amount
  },
  addSearchResults(state, response) {
    const array = response.filter(state.hasNoImage)
    if(array.length) {
      state.searchResults = state.searchResults.concat(array)
    } else {
      state.noMoreResults = true
    }
  },
  clearSearchResults(state) {
    state.noMoreResults = false
    state.searchResults = []
  },
  setError(state, error) {
    state.error = error.message
    console.log(error)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
