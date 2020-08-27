import Axios from 'axios'
import { db } from '@/db'

export default {
  namespaced: true,
  state: {
    collections: [],
    limit: 10,
    offset: 0,
    loading: true,
    error: null,
    noScroll: false,
    hasNoImage: element => element.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
  },
  actions: {
    async getSuperheroes({commit}) {
      commit('setLoading', true)
      await Axios
        .get(`${db.url}/characters?ts=${db.ts}&apikey=${db.key}&hash=${db.hash}&limit=${100}`)
        .then(response => {
          commit('sortHeroes', response.data.data.results)
          commit('setLoading', false)
        })
        .catch(error => commit('setError', error))
    },
    async getMoreHeroes({commit, state}) {
      commit('setOffset', 100)
        await Axios
        .get(`${db.url}/characters?ts=${db.ts}&apikey=${db.key}&hash=${db.hash}&limit=${100}&offset=${state.offset}`)
        .then(response => {
          commit('setLoading', false)
          commit('sortHeroes', response.data.data.results)
        })
        .catch(error => commit('setError', error))
    }
  },
  mutations: {
    sortHeroes(state, array) {
      if(!array.length) {
        state.noScroll = true
      } else {
        while(array.length) {
          // remove first item from array and get first letter
          const hero = array.shift(),
                letter = hero.name.slice(0, 1);
          // add first object to sorted array
          if(!state.collections.length) {
            state.collections.push({
              letter: letter,
              superheroes: [hero]
            })
          } else {
            // get most recent sorted array item to compare
            const pushedCollection = state.collections[state.collections.length - 1]
            // if letters match, push to that objects collections
            if(letter === pushedCollection.letter) {
              pushedCollection.superheroes.push(hero)
              // if not, add new object to sorted array
            } else {
              state.collections.push({
                letter: letter,
                superheroes: [hero]
              })
            }
          }
        }
      }
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
