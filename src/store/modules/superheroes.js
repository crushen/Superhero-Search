import Axios from 'axios'
import { db } from '@/db'

export default {
  namespaced: true,
  state: {
    heroes: [],
    collections: [],
    error: null,
    noScroll: false,
    hasNoImage: element => element.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
  },
  actions: {
    async getSuperheroes({commit}) {
      commit('clearState')
      commit('setLoading', true, { root: true })
      await Axios
        .get(`${db.url}/characters?ts=${db.ts}&apikey=${db.key}&hash=${db.hash}&limit=${100}`)
        .then(response => {
          commit('sortHeroes', response.data.data.results)
          commit('setLoading', false, { root: true })
        })
        .catch(error => commit('setError', error))
    },
    async getMoreHeroes({commit, state}) {
      commit('setLoading', true, { root: true })
        await Axios
        .get(`${db.url}/characters?ts=${db.ts}&apikey=${db.key}&hash=${db.hash}&limit=${100}&offset=${state.heroes.length}`)
        .then(response => {
          commit('sortHeroes', response.data.data.results)
          commit('setLoading', false, { root: true })
        })
        .catch(error => commit('setError', error))
    }
  },
  mutations: {
    sortHeroes(state, array) {
      if(array.length) {
        // if no heroes already in state - add array
        if(!state.heroes.length) {
          state.heroes = array
          // if heroes already in state - concat array
          // state.heroes.length will be used as the offset for fetching more data
        } else {
          state.heroes = state.heroes.concat(array)
        }
        while(array.length) {
          // filter heroes that don't have images
          array = array.filter(state.hasNoImage)
          // remove first item from array and get first letter
          const hero = array.shift(),
                letter = hero.name.slice(0, 1);
          // add first object to collections array
          if(!state.collections.length) {
            state.collections.push({
              letter: letter,
              superheroes: [hero]
            })
          } else {
            // get most recent collection array item to compare
            const pushedCollection = state.collections[state.collections.length - 1]
            // if letters match, push to that object to the collection
            if(letter === pushedCollection.letter) {
              pushedCollection.superheroes.push(hero)
              // if not, add new object to collections array
            } else {
              state.collections.push({
                letter: letter,
                superheroes: [hero]
              })
            }
          }
        }
        // if user reaches end of results, infinite scroll disabled
      } else {
        state.noScroll = true
      }
    },
    clearState(state) {
      state.heroes = []
      state.collections = []
    },
    setError(state, error) {
      state.error = error.message
      console.log(error)
    }
  }
}
