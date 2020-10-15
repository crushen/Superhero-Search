import Nav from '@/components/nav/Nav'
import { mount } from '@vue/test-utils'

describe('Nav', () => {
  it('should be visible when button is clicked', async() => {
    const wrapper = mount(Nav, {
      stubs: ['router-link']
    })

    await wrapper.get('button').trigger('click')
    expect(wrapper.get('[data-testid="nav"]').exists()).toBe(true)
  })

  it('should hide when router-link is clicked', async() => {
    const wrapper = mount(Nav, {
      stubs: ['router-link']
    })

    await wrapper.setData({ active: true })
    await wrapper.get('[data-testid="router-link"]').trigger('click')

    expect(wrapper.find('[data-testid="nav"]').exists()).toBe(false)
  })

  it('should be hidden when active data value is false', () => {
    const wrapper = mount(Nav)
    expect(wrapper.find('[data-testid="nav"]').exists()).toBe(false)
  })
})
