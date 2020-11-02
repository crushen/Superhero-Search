import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Comics from '@/views/Comics'
import SearchBar from '@/components/SearchBar'
import mockData from '../mocks/comicsList.json'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Comics', () => {
  let store
  let comicsModule

  beforeEach(() => {
    comicsModule = {
      namespaced: true,
      actions: {
        getComics: jest.fn(),
        searchComics: jest.fn(),
        getMoreComics: jest.fn()
      },
      mutations: {
        clearSearchResults: jest.fn()
      }
    }
    
    store = new Vuex.Store({
      modules: { comics: comicsModule }
    })
  })

  it('commits clearSearchResults when mounted', () => {
    const wrapper = shallowMount(Comics, {
      computed: {
        featuredComics: () => [],
        searchResults: () => []
      },
      store,
      localVue
    })

    expect(comicsModule.mutations.clearSearchResults).toHaveBeenCalledTimes(1)
  })

  test('if featuredComics array already contains data, do not dispatch getComics when mounted', () => {
    const wrapper = shallowMount(Comics, {
      computed: {
        featuredComics: () => [...mockData],
        searchResults: () => []
      },
      store,
      localVue
    })

    expect(comicsModule.actions.getComics).toHaveBeenCalledTimes(0)
  })

  test('if featuredComics array is empty, dispatch getComics when mounted', () => {
    const wrapper = shallowMount(Comics, {
      computed: {
        featuredComics: () => [],
        searchResults: () => []
      },
      store,
      localVue
    })

    expect(comicsModule.actions.getComics).toHaveBeenCalledTimes(6)
  })

  it('dispatches searchComics when submitSearch is emitted', async () => {
    const wrapper = mount(Comics , {
      computed: {
        featuredComics: () => [],
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

    expect(comicsModule.actions.searchComics).toHaveBeenCalled()
  })

  it('replaces featured comics with search results when submitSearch is called', () => {
    const wrapper = shallowMount(Comics , {
      computed: {
        featuredComics: () => [],
        searchResults: () => [...mockData]
      },
      store,
      localVue
    })

    expect(wrapper.get('[data-testid="search-results"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="featured-comics"]').exists()).toBe(false)
  })

  it('commits clearSearchResults again when search input has been cleared', async () => {
    const wrapper = shallowMount(Comics , {
      computed: {
        featuredComics: () => [],
        searchResults: () => []
      },
      store,
      localVue
    })

    await wrapper.setData({ search: 'search' })
    await wrapper.setData({ search: '' })

    expect(comicsModule.mutations.clearSearchResults).toHaveBeenCalledTimes(2)
  })

  // it('dispatches getMoreComics when user has searched & scrolled to bottom of page', async () => {
  //   const wrapper = shallowMount(Comics , {
  //     computed: {
  //       featuredComics: () => [],
  //       searchResults: () => [...mockData]
  //     },
  //     store,
  //     localVue
  //   })

  //   await wrapper.setData({ search: 'search' })

  //   window.pageYOffset = 5000
  //   wrapper.vm.getMoreComics()

  //   expect(comicsModule.actions.getMoreComics).toHaveBeenCalledTimes(1)
  // })
})
