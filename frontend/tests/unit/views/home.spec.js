import { mount } from '@vue/test-utils'
import { store } from '@/store'
import { router } from '@/router'
import Home from '../../../src/views/Home.vue'


describe('Home', () => {
    it('render sign up page', () => {
        const wrapper = mount(Home, {
            global: {
                plugins: [store, router]
            }
        })
        expect(wrapper.html()).toMatch('Todo List')
    })
    it('has components', () => {
        expect(typeof Home.components).toBe('object')
        const totalComponents = Object.keys(Home.components).length
        expect(totalComponents).toBe(3)
    })
})