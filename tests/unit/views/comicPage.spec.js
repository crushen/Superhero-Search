import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ComicPage from '@/views/ComicPage'
import HeroList from '@/components/lists/HeroList'
import mockData from '../mocks/comicsList.json'
import mockCharacters from '../mocks/heroList.json'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ComicPage', () => {
  let store
  let comicPageModule

  beforeEach(() => {
    comicPageModule = {
      namespaced: true,
      actions: {
        getComic: jest.fn(),
        getCharacters: jest.fn()
      }
    }
    
    store = new Vuex.Store({
      modules: { comicPage: comicPageModule }
    })
  })

  const $route = {
    path: '/comics/:id',
    params: { id: mockData[0].id }
  }

  it('dispatches getComic when mounted', () => {
    const wrapper = shallowMount(ComicPage, {
      computed: {
        comic: () => null,
        characters: () => []
      },
      mocks: { $route },
      store,
      localVue
    })

    expect(comicPageModule.actions.getComic).toHaveBeenCalledTimes(1)
  })

  it('dispatches getCharacters when mounted', () => {
    const wrapper = shallowMount(ComicPage, {
      computed: {
        comic: () => null,
        characters: () => []
      },
      mocks: { $route },
      store,
      localVue
    })

    expect(comicPageModule.actions.getCharacters).toHaveBeenCalledTimes(1)
  })

  it('uses comic data to populate the page', () => {
    const wrapper = shallowMount(ComicPage, {
      computed: {
        comic: () => mockData[0],
        characters: () => []
      },
      mocks: { $route },
      store,
      localVue
    })

    expect(wrapper.get('[data-testid="title"]').element.textContent).toEqual('Thor (2020) #9')
  })

  it('uses character data to render a heroList component', () => {
    const wrapper = shallowMount(ComicPage, {
      computed: {
        comic: () => mockData[0],
        characters: () => mockCharacters
      },
      mocks: { $route },
      store,
      localVue
    })

    const heroList = wrapper.findComponent(HeroList)
    
    expect(heroList.exists()).toBe(true)
  })
})
