import { store } from '@/store.js'

describe('The store.js - Vuex', () => {
    beforeEach(() => {
        store._state.data.todoList = []
    });

    it('can be empty list', () => {
        const list = store._state.data.todoList
        expect(list.length).toBe(0)
    })

    it('can not be empty list', () => {        
        store._mutations.addTodo[0]({ title: 'study', id: 1})
        store._mutations.addTodo[0]({ title: 'study', id: 2})
        const list = store._state.data.todoList
        expect(list.length).toBe(2)
    })

    it('delete and empty list', () => {        
        store._mutations.addTodo[0]({ title: 'study', id: 1})        
        store._mutations.removeTodo[0](1)
        const list = store._state.data.todoList
        expect(list.length).toBe(0)
        
    })
})

