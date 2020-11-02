import { shallowMount } from '@vue/test-utils'
import ComicCard from '@/components/cards/ComicCard'
import mockData from '../mocks/comicsList.json'

describe('ComicCard', () => {
  it('uses the props data to render a hero card', () => {
    const wrapper = shallowMount(ComicCard, {
      propsData: { 
        comic: mockData[0]
      }
    })

    const creator = wrapper.findAll('[data-testid="creators"]').at(0)

    expect(creator.element.textContent.trim()).toEqual('writer: Donny Cates')
  })
})
