import Vue from 'vue'
import Vuex from 'vuex'

import superheroes from '@/store/modules/superheroes.js'
import comics from '@/store/modules/comics.js'
import superheroesAtoZ from '@/store/modules/superheroesAtoZ.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    superheroes,
    comics,
    superheroesAtoZ
  },
  state() {
    return {}
  }
})
