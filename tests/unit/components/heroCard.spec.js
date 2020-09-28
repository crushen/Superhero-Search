import { mount } from '@vue/test-utils'
import HeroCard from '@/components/cards/HeroCard'
import mockData from '../mocks/heroList.json'

describe('HeroCard', () => {
  it('uses the hero prop data to populate card elements', () => {
    const wrapper = mount(HeroCard, {
      stubs: ['router-link'],
      propsData: { hero: mockData[0] }
    })

    const link = wrapper.find('[data-testid="link"]').element.textContent.trim()
    expect(link).toEqual('Avengers')
  })
})
