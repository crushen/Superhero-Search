import Vue from 'vue'
import Vuex from 'vuex'

import home from '@/store/modules/home.js'
import superheroes from '@/store/modules/superheroes.js'
import comics from '@/store/modules/comics.js'
import superheroesAtoZ from '@/store/modules/superheroesAtoZ.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    superheroes,
    comics,
    superheroesAtoZ
  },
  state() {
    return {}
  }
})
