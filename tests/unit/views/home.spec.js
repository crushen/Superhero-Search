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
        searchHeroes: jest.fn(),
        getMoreHeroes: jest.fn()
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
  })

  test('if featuredHeroes array already contains data, do not dispatch getHero when mounted', () => {
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

  it('dispatches searchHeroes when submitSearch is emitted', async () => {
    const wrapper = mount(Home , {
      computed: {
        featuredHeroes: () => [],
        searchResults: () => []
      },
      store,
      localVue
    })

    const searchBar = wrapper.get(SearchBar),
          input = searchBar.get('[data-testid="search-input"]');

    await input.setValue('Avengers')
    await searchBar.trigger('submit')

    wrapper.vm.submitSearch()

    expect(homeModule.actions.searchHeroes).toHaveBeenCalled()
  })

  it('replaces featured heroes with search results when submitSearch is called', () => {
    const wrapper = shallowMount(Home , {
      computed: {
        featuredHeroes: () => [],
        searchResults: () => [...mockData]
      },
      store,
      localVue
    })

    expect(wrapper.get('[data-testid="search-results"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="featured-heroes"]').exists()).toBe(false)
  })

  it('commits clearSearchResults again when search input has been cleared', async () => {
    const wrapper = shallowMount(Home , {
      computed: {
        featuredHeroes: () => [],
        searchResults: () => []
      },
      store,
      localVue
    })

    await wrapper.setData({ search: 'search' })
    await wrapper.setData({ search: '' })

    expect(homeModule.mutations.clearSearchResults).toHaveBeenCalledTimes(2)
  })

  it('dispatches getMoreHeroes when user has searched & scrolled to bottom of page', () => {
    const wrapper = shallowMount(Home , {
      computed: {
        featuredHeroes: () => [],
        searchResults: () => [...mockData]
      },
      store,
      localVue
    })

    window.pageYOffset = 5000
    wrapper.vm.getMoreHeroes()

    expect(homeModule.actions.getMoreHeroes).toHaveBeenCalled()
  })
})
