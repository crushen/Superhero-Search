import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Superheroes from '@/views/Superheroes'
import mockData from '../mocks/superheroesCollection.json'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Superheroes', () => {
  let store
  let superheroesModule

  beforeEach(() => {
    superheroesModule = {
      namespaced: true,
      actions: {
        getSuperheroes: jest.fn(),
        getMoreHeroes: jest.fn()
      }
    }
    
    store = new Vuex.Store({
      modules: { superheroes: superheroesModule }
    })
  })

  it('dispatches getSuperheroes when mounted & collections.length is 0', () => {
    const wrapper = shallowMount(Superheroes, {
      computed: {
        collections: () => []
      },
      store,
      localVue
    })

    expect(superheroesModule.actions.getSuperheroes).toHaveBeenCalledTimes(1)
  })

  it('does not dispatch getSuperheroes when mounted & collections.length is more than 0', () => {
    const wrapper = shallowMount(Superheroes, {
      stubs: ['router-link'],
      computed: {
        collections: () => [...mockData]
      },
      store,
      localVue
    })

    expect(superheroesModule.actions.getSuperheroes).toHaveBeenCalledTimes(0)
  })

  it('dispatches getMoreHeroes when user has scrolled to bottom of page', () => {
    const wrapper = shallowMount(Superheroes, {
      stubs: ['router-link'],
      computed: {
        collections: () => [...mockData]
      },
      store,
      localVue
    })

    window.pageYOffset = 5000
    wrapper.vm.getMoreHeroes()

    expect(superheroesModule.actions.getMoreHeroes).toHaveBeenCalledTimes(1)
  })

  it('turns hero name strings into slugs', () => {
    const wrapper = shallowMount(Superheroes, {
      stubs: ['router-link'],
      computed: {
        collections: () => []
      },
      store,
      localVue
    })

    const name = 'Charlotte Rushen'

    expect(wrapper.vm.slugify(name)).toEqual('charlotte-rushen')
  })
})
