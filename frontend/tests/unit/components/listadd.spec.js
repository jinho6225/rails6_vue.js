import { shallowMount } from '@vue/test-utils'
import ListAdd from '@/components/ListAdd'
import { store } from '@/store'
import { router } from '@/router'

describe('The ListAdd.vue component', () => {
    it('allows for adding one todo item', async () => {
        const wrapper = shallowMount(ListAdd, {
            global: {
                plugins: [store, router]
            }
        })
        wrapper.find('[data-testid="todo-input"]').setValue('My first todo item')
        await wrapper.find('[data-testid="todo-submit"]').trigger('click')
        expect(wrapper.find('[data-testid="todo-input"]').text()).toContain('')
    })
})