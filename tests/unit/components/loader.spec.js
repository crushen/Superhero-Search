import Loader from '@/components/loaders/Dots'
import { mount } from '@vue/test-utils'

describe('Loader', () => {
  it('should render when loading prop is true', async() => {
    const wrapper = mount(Loader)

    await wrapper.setProps({ loading: true })
    expect(wrapper.get('[data-testid="loader"]').isVisible()).toBe(true)
  })

  it('should not render when loading prop is false', () => {
    const wrapper = mount(Loader)
    expect(wrapper.get('[data-testid="loader"]').isVisible()).toBe(false)
  })
})
