import { mount } from '@vue/test-utils'
import SignUp from '../../../src/views/Signup.vue'
import { store } from '@/store'
import { router } from '@/router'

describe('SignUp', () => {
    it('render sign up page', () => {
        const wrapper = mount(SignUp, {
            global: {
                plugins: [store, router]
            }
        })
        expect(wrapper.html()).toContain('Please Sign Up')
    })

})