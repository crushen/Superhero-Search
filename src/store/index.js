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
      commit('setLoading')
      await Axios
        .get(`${db.url}/characters?ts=${db.ts}&apikey=${db.key}&hash=${db.hash}&limit=${state.limit}&offset=${state.offset}`)
        .then(response => {
          commit('setSuperheroes', response.data)
          commit('removeLoading')
        })
        .catch(error => commit('setError', error))
    }
  },
  mutations: {
    setSuperheroes(state, response) {
      state.superheroes = response.data.results
      state.attribution = response.attributionHTML
    },
    setLoading(state) {
      state.loading = true
    },
    removeLoading(state) {
      state.loading = false
    },
    setError(state, error) {
      state.error = error.message
      console.log(error)
    }
  }
})
