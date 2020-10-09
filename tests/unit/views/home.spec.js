import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Home from '@/views/Home'
import SearchBar from '@/components/SearchBar'
import mockData from '../mocks/heroList.json'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Home', () => {
  let store
  let homeModule

  beforeEach(() => {
    homeModule = {
      namespaced: true,
      actions: {
        getHero: jest.fn(),
        searchHeroes: jest.fn()
      },
      mutations: {
        clearSearchResults: jest.fn()
      }
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
    //expect(wrapper.find('[data-testid="search-results"]').exists()).toBe(false)
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

  it('dispatches searchHeroes when submitSearch is emitted', () => {
    const wrapper = mount(Home , {
      computed: {
        featuredHeroes: () => [],
        searchResults: () => []
      },
      store,
      localVue
    })

    const searchBar = wrapper.find(SearchBar),
          input = searchBar.find('[data-testid="search-input"]');

    input.setValue('Avengers')
    searchBar.trigger('submit')

    expect(homeModule.actions.searchHeroes).toHaveBeenCalled()
  })
})
