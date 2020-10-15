import { mount } from '@vue/test-utils'
import SearchBar from '@/components/SearchBar'

describe('SearchBar', () => {
  it('emits the event.target value on input', () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.get('[data-testid="search-input"]')

    input.setValue('input')
    expect(wrapper.emitted().input[0]).toEqual(['input'])
  })
})
