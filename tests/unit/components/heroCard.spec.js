import { shallowMount } from '@vue/test-utils'
import HeroCard from '@/components/cards/HeroCard'
import mockData from '../mocks/heroList.json'

describe('HeroCard', () => {
  it('uses the props data to render a hero card', () => {
    const wrapper = shallowMount(HeroCard, {
      propsData: { 
        imgSrc: `${mockData[0].thumbnail.path}.${mockData[0].thumbnail.extension}`,
        description: mockData[0].description
      },
    })

    expect(wrapper.find('[data-testid="description"]').element.textContent).toEqual("Earth's Mightiest Heroes joined forces to take on threats that were too big for any one hero to tackle. With a roster that has included Captain America, Iron Man, Ant-Man, Hulk, Thor, Wasp and dozens more over the years, the Avengers have come to be regarded as Earth's No. 1 team.")
  })
})
