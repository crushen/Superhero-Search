import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Home from '@/views/Home'
import mockData from '@/mocks/heroList.json'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Home', () => {
  let store
  let homeModule

  beforeEach(() => {
    homeModule = {
      namespaced: true,
      actions: { getHero: jest.fn() },
      mutations: { clearSearchResults: jest.fn() }
    }
    
    store = new Vuex.Store({
      modules: { home: homeModule }
    })
  })

  it('commits clearSearchResults when mounted', () => {
    const wrapper = shallowMount(Home, {
      computed: {
        featuredHeroes: () => [],
        searchResults: () => []
      },
      store,
      localVue
    })

    expect(homeModule.mutations.clearSearchResults).toHaveBeenCalledTimes(1)
    expect(wrapper.find('[data-testid="search-results"]').exists()).toBe(false)
  })

  test('if featuredHeroes array contains data, do not dispatch getHero when mounted', () => {
    const wrapper = shallowMount(Home, {
      computed: {
        featuredHeroes: () => [...mockData],
        searchResults: () => []
      },
      store,
      localVue
    })

    expect(homeModule.actions.getHero).toHaveBeenCalledTimes(0)
  })

  test('if featuredHeroes array is empty, dispatch getHero when mounted', () => {
    const wrapper = shallowMount(Home, {
      computed: {
        featuredHeroes: () => [],
        searchResults: () => []
      },
      store,
      localVue
    })

    expect(homeModule.actions.getHero).toHaveBeenCalled()
  })
})
