import { mount } from '@vue/test-utils'
import Login from '../../../src/views/Login.vue'
import { store } from '@/store'
import { router } from '@/router'

describe('LogIn', () => {
    it('render login page', () => {
        const wrapper = mount(Login, {
            global: {
                plugins: [store, router]
            }
        })
        expect(wrapper.html()).toMatch('Please Log in')
    })
})