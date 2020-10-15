import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ComicPage from '@/views/ComicPage'
import mockData from '../mocks/comicsList.json'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ComicPage', () => {
  let store
  let comicPageModule

  beforeEach(() => {
    comicPageModule = {
      namespaced: true,
      actions: {
        getComic: jest.fn()
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
      computed: { comic: () => null },
      mocks: { $route },
      store,
      localVue
    })

    expect(comicPageModule.actions.getComic).toHaveBeenCalledTimes(1)
  })

  it('uses comic data to populate the page', () => {
    const wrapper = shallowMount(ComicPage, {
      computed: { comic: () => mockData[0] },
      mocks: { $route },
      store,
      localVue
    })

    expect(wrapper.get('[data-testid="title"]').element.textContent).toEqual('Thor (2020) #9')
  })
})
