import { mount, shallowMount } from '@vue/test-utils'
import List from '@/components/List'
import { store } from '@/store'
import { router } from '@/router'

describe('The List.vue component', () => {
    const global = {
        plugins: [store, router]
    }
    it('Can be mounted', () => {
        const wrapper = mount(List, { global })
        expect(wrapper.exists()).toBeTruthy()
    })
})
