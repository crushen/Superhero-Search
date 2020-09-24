import Vue from 'vue'
import Vuex from 'vuex'

import home from '@/store/modules/home.js'
import heroPage from '@/store/modules/heroPage.js'
import superheroes from '@/store/modules/superheroes.js'
import comics from '@/store/modules/comics.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    heroPage,
    superheroes,
    comics
  },
  state() {
    return {
      loading: false
    }
  },
  mutations: {
    setLoading(state, set) {
      state.loading = set
    }
  }
})
