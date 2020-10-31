import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import HeroPage from '@/views/HeroPage'
import mockHero from '../mocks/heroList.json'
import mockComics from '../mocks/comicsList.json'
import { info } from 'node-sass'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('HeroPage', () => {
  let store
  let heroPageModule

  beforeEach(() => {
    heroPageModule = {
      namespaced: true,
      actions: {
        getHero: jest.fn(),
        getComics: jest.fn()
      }
    }
    
    store = new Vuex.Store({
      modules: { heroPage: heroPageModule }
    })
  })

  const $route = {
    path: '/comics/:id',
    params: {
      name: slugify(mockHero[0].name),
      id: mockHero[0].id
    }
  }

  function slugify(string) {
    string = string.replace(/^\s+|\s+$/g, '')
    // Make the stringing lowercase
    string = string.toLowerCase()
    // Remove accents, swap ñ for n, etc
    const from = 'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;',
          to   = 'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------';
    for (var i=0, l=from.length ; i<l ; i++) {
      string = string.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    }
    // Remove invalid chars
    string = string.replace(/[^a-z0-9 -]/g, '') 
      // Collapse whitespace and replace by -
      .replace(/\s+/g, '-') 
      // Collapse dashes
      .replace(/-+/g, '-')
    return string
  }

  it('dispatches getHero and getComics when mounted', () => {
    const hero = { info: null, comics: [] }

    const wrapper = shallowMount(HeroPage, {
      computed: { hero: () => hero },
      mocks: { $route },
      store,
      localVue
    })

    expect(heroPageModule.actions.getHero).toHaveBeenCalledTimes(1)
    expect(heroPageModule.actions.getComics).toHaveBeenCalledTimes(1)
  })

  it('uses hero data to populate the page', () => {
    const hero = { info: mockHero[0], comics: mockComics }

    const wrapper = shallowMount(HeroPage, {
      computed: { hero: () => hero },
      mocks: { $route },
      store,
      localVue
    })
    
    expect(wrapper.get('[data-testid="name"]').element.textContent).toEqual('Avengers')
  })
})
