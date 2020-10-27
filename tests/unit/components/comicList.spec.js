import { shallowMount } from '@vue/test-utils'
import ComicList from '@/components/lists/ComicList'
import mockData from '../mocks/comicsList.json'

describe('ComicList', () => {
  it('uses the comics prop data to render a list of comics', () => {
    const wrapper = shallowMount(ComicList, {
      propsData: { comics: mockData },
      stubs: ['router-link']
    })

    const names = wrapper.findAll('[data-testid="comic-name"]')
    const name = names.at(0)

    expect(name.element.textContent.trim()).toEqual('Thor (2020) #9')
  })
})
