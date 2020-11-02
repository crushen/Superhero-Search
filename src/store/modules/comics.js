import Axios from 'axios'

const md5 = require('md5')
const ts = Date.now()
const hash = md5(ts + process.env.VUE_APP_PRIVATE_KEY + process.env.VUE_APP_PUBLIC_KEY)

export default {
  namespaced: true,
  state: {
    featuredComics: [],
    searchResults: [],
    comic: null,
    offset: 15,
    error: null,
    noMoreResults: false,
    hasNoImage: element => element.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
  },
  actions: {
    async getComics({commit}, id) {
      commit('setLoading', true, { root: true })
      await Axios 
        .get(`${process.env.VUE_APP_API_URL}/comics/${id}?ts=${ts}&apikey=${process.env.VUE_APP_PUBLIC_KEY}&hash=${hash}`)
        .then(response => {
          commit('addComics', response.data.data.results)
          commit('setLoading', false, { root: true })
        })
        .catch(error => commit('setError', error))
    },
    async searchComics({commit}, {year, title}) {
      let url = null
      // set URL depending on whether user has searched for year, title or both
      if(year && !title) {
        url = `${process.env.VUE_APP_API_URL}/comics?ts=${ts}&apikey=${process.env.VUE_APP_PUBLIC_KEY}&hash=${hash}&limit=${15}&startYear=${year}`
      } else if(title && !year) {
        url = `${process.env.VUE_APP_API_URL}/comics?ts=${ts}&apikey=${process.env.VUE_APP_PUBLIC_KEY}&hash=${hash}&limit=${15}&titleStartsWith=${title}`
      } else {
        url = `${process.env.VUE_APP_API_URL}/comics?ts=${ts}&apikey=${process.env.VUE_APP_PUBLIC_KEY}&hash=${hash}&limit=${15}&startYear=${year}&titleStartsWith=${title}`
      }
      commit('clearSearchResults')
      commit('setLoading', true, { root: true })
      await Axios
        .get(url)
        .then(response => {
          commit('setSearchResults', response.data.data.results)
          commit('setLoading', false, { root: true })
        })
        .catch(error => {
          commit('setError', error)
          commit('setLoading', false, { root: true })
        })
    },
    async getMoreComics({commit, state}, {year, title}) {
      let url = null
      // set URL depending on whether user has searched for year, title or both
      if(year && !title) {
        url = `${process.env.VUE_APP_API_URL}/comics?ts=${ts}&apikey=${process.env.VUE_APP_PUBLIC_KEY}&hash=${hash}&limit=${15}&startYear=${year}&offset=${state.offset}`
      } else if(title && !year) {
        url = `${process.env.VUE_APP_API_URL}/comics?ts=${ts}&apikey=${process.env.VUE_APP_PUBLIC_KEY}&hash=${hash}&limit=${15}&titleStartsWith=${title}&offset=${state.offset}`
      } else {
        url = `${process.env.VUE_APP_API_URL}/comics?ts=${ts}&apikey=${process.env.VUE_APP_PUBLIC_KEY}&hash=${hash}&limit=${15}&startYear=${year}&titleStartsWith=${title}&offset=${state.offset}`
      }

      commit('setLoading', true, { root: true })
      commit('setOffset', 15)
        await Axios
        .get(url)
        .then(response => {
          commit('addSearchResults', response.data.data.results)
          commit('setLoading', false, { root: true })
        })
        .catch(error => commit('setError', error))
    }
  },
  mutations: {
    addComics(state, response) {
      state.featuredComics.push(response[0])
    },
    setSearchResults(state, response) {
      state.searchResults = []
      state.noScroll = false
      state.offset = 15
      state.searchResults = response.filter(state.hasNoImage)
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
      state.error = null
    },
    setError(state, error) {
      state.searchResults = []
      state.error = error.message
      // console.log(error)
    }
  }
}
