import Axios from 'axios'
import { db } from '@/db'

export default {
  namespaced: true,
  state: {
    comics: [],
    searchResults: [],
    loading: false,
    error: null,
    noScroll: false
  },
  actions: {
    async getComics({commit}) {
      commit('setLoading', true)
      await Axios
        .get(`${db.url}/comics?ts=${db.ts}&apikey=${db.key}&hash=${db.hash}&limit=${15}`)
        .then(response => {
          commit('setComics', response.data.data.results)
          commit('setLoading', false)
        })
        .catch(error => commit('setError', error))
    },
    async searchComics({commit}, {year, title}) {
      let url = null
      // set URL depending on whether user has searched for year, title or both
      if(year && !title) {
        url = `${db.url}/comics?ts=${db.ts}&apikey=${db.key}&hash=${db.hash}&limit=${15}&startYear=${year}`
      } else if(title && !year) {
        url = `${db.url}/comics?ts=${db.ts}&apikey=${db.key}&hash=${db.hash}&limit=${15}&titleStartsWith=${title}`
      } else {
        url = `${db.url}/comics?ts=${db.ts}&apikey=${db.key}&hash=${db.hash}&limit=${15}&startYear=${year}&titleStartsWith=${title}`
      }

      commit('setLoading', true)
      await Axios
        .get(url)
        .then(response => {
          commit('setSearchResults', response.data.data.results)
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setError', error)
          commit('setLoading', false)
        })
    }
    // async getMoreComics({commit, state}) {
    //   commit('setLoading', true)
    //     await Axios
    //     .get(`${db.url}/comics?ts=${db.ts}&apikey=${db.key}&hash=${db.hash}&limit=${100}&offset=${state.comics.length}`)
    //     .then(response => {
    //       commit('addComics', response.data.data.results)
    //       commit('setLoading', false)
    //     })
    //     .catch(error => commit('setError', error))
    // }
  },
  mutations: {
    setComics(state, array) {
      if(!state.comics.length) {
        state.comics = array
      } else {
        state.comics = state.comics.concat(array)
      }
    },
    setSearchResults(state, array) {
      state.searchResults = []
      // state.noScroll = false
      // state.offset = 15
      state.searchResults = array
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
