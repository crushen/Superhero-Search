import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Comics from '@/views/Comics'
import mockData from '../mocks/superheroesCollection.json'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Comics', () => {
  let store
  let comicsModule

  beforeEach(() => {
    comicsModule = {
      namespaced: true,
      actions: {
      },
      mutations: {
      }
    }
    
    store = new Vuex.Store({
      modules: { comics: comicsModule }
    })
  })

  // it('dispatches getSuperheroes when mounted & collections.length is 0', () => {
  //   const wrapper = shallowMount(Comics, {
  //     computed: {
  //       collections: () => []
  //     },
  //     store,
  //     localVue
  //   })

  //   expect(comicsModule.actions.getSuperheroes).toHaveBeenCalledTimes(1)
  // })
})
