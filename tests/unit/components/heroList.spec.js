import { shallowMount } from '@vue/test-utils'
import HeroList from '@/components/lists/HeroList'
import mockData from '../mocks/heroList.json'

describe('HeroList', () => {
  it('uses the heroes prop data to render a list of heroes', () => {
    const wrapper = shallowMount(HeroList, {
      propsData: { heroes: mockData },
      stubs: ['router-link']
    })

    const names = wrapper.findAll('[data-testid="hero-name"]')
    const name = names.at(0)

    expect(name.element.textContent.trim()).toEqual('Avengers')
  })

  it('turns hero name strings into slugs', () => {
    const wrapper = shallowMount(HeroList, {
      propsData: { heroes: mockData },
      stubs: ['router-link']
    })

    const name = 'Charlotte Rushen'

    expect(wrapper.vm.slugify(name)).toEqual('charlotte-rushen')
  })
})
