import Axios from 'axios'

const md5 = require('md5')
const ts = Date.now()
const hash = md5(ts + process.env.VUE_APP_PRIVATE_KEY + process.env.VUE_APP_PUBLIC_KEY)

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
      .get(`${process.env.VUE_APP_API_URL}/characters/${id}?ts=${ts}&apikey=${process.env.VUE_APP_PUBLIC_KEY}&hash=${hash}`)
      .then(response => {
        commit('addHero', response.data.data.results)
        commit('setLoading', false, { root: true })
      })
      .catch(error => commit('setError', error))
  },
  async searchHeroes({commit}, string) {
    commit('setLoading', true, { root: true })
    await Axios 
      .get(`${process.env.VUE_APP_API_URL}/characters?nameStartsWith=${string}&ts=${ts}&apikey=${process.env.VUE_APP_PUBLIC_KEY}&hash=${hash}&limit=${15}`)
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
      .get(`${process.env.VUE_APP_API_URL}/characters?nameStartsWith=${string}&ts=${ts}&apikey=${process.env.VUE_APP_PUBLIC_KEY}&hash=${hash}&limit=${15}&offset=${state.offset}`)
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
    // console.log(error)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
