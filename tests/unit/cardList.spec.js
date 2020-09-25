import { shallowMount } from '@vue/test-utils'
import CardList from '@/components/cards/CardList'
import HeroCard from '@/components/cards/HeroCard'
import mockData from '@/mocks/heroList.json'

describe('CardList', () => {
  it('uses the list prop data to render HeroCard components', async() => {
    const wrapper = shallowMount(CardList)

    await wrapper.setProps({ list: mockData })
    expect(wrapper.findAllComponents(HeroCard).length).toBe(1)
  })
})
