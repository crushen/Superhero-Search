import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import { db } from '@/db'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    superheroes: [],
    limit: 10,
    offset: 0,
    loading: true,
    attribution: null,
    error: null
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
    async getMoreHeroes({commit, state}) {
      commit('setLoading', true)
      commit('setOffset', 10)
      await Axios
        .get(`${db.url}/characters?ts=${db.ts}&apikey=${db.key}&hash=${db.hash}&limit=${state.limit}&offset=${state.offset}`)
        .then(response => {
          commit('setLoading', false)
          commit('addHeroes', response.data)
        })
        .catch(error => commit('setError', error))
    }
  },
  mutations: {
    setSuperheroes(state, response) {
      // filter out any heroes that don't have an image
      const hasNoImage = hero => hero.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
      const array = response.data.results
      state.superheroes = array.filter(hasNoImage)
      state.attribution = response.attributionHTML
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
    },
    addHeroes(state, response) {
      // filter out any heroes that don't have an image
      const hasNoImage = hero => hero.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
      const array = response.data.results.filter(hasNoImage)
      state.superheroes = state.superheroes.concat(array)
    }
  }
})
