import { createStore } from 'vuex'
import { url, headersFN } from './lib.js'

export const store = createStore({
    state () {
        return {
            todoList: [],
            todo: null,            
            isLoggedIn: false
        }
    },
    getters: {//computed        
    },
    mutations: {
        logoutUser: state => {
            state.isLoggedIn = false
            window.localStorage.removeItem('token')
        },
        loginUser: (state, user) => {
            if (window.localStorage.getItem('token')) {
                state.isLoggedIn = true
            } else {
                window.localStorage.setItem('token', user.api_token)
                state.isLoggedIn = true
            }    
        },
        editTodo: (state, todo) => {
            state.todo = todo
        },
        setTodos: (state, todos) => (state.todoList = todos),
        addTodo: (state, todo) => (state.todoList = [...state.todoList, todo]),
        setUpdateTodo: (state, { title, id }) => {
            state.todoList.forEach((todo) => {
                if (todo.id === id) {
                    todo.title = title
                }
            })
        },
        removeTodo: (state, id) => (state.todoList = state.todoList.filter(todo => todo.id !== id)),
        setCompleteTodo: (state, {id, completed}) => {
            state.todoList.forEach(todo => {
                if (todo.id === id) {
                    todo.completed = completed
                };
            })
        }
    },
    actions: {
        getUserInfo: async ({ commit }, loginInfo) => {
            const headers = headersFN(loginInfo, 'POST')
            const data = await (await fetch(`${url}/sessions`, headers)).json();
            commit('loginUser', data)
        }, 
        getList: async ({ commit }) => {               
            const data = await(await fetch(`${url}/todos`)).json();            
            commit('setTodos', data)
        },
        deleteTodo: async ({ commit }, id) => {
            await fetch(`${url}/todos/${id}`, { method: "DELETE" });
            commit('removeTodo', id)
        },
        completeTodo: async ({ commit }, { id, completed }) => {
            const headers = headersFN({ todo: {completed: !completed}}, 'PUT')
            const data = await (await fetch(`${url}/todos/${id}`, headers)).json();
            commit('setCompleteTodo', data)
        },
        addList: async ({ commit }, title) => {
            const headers = headersFN({ todo: {title, completed: false}}, 'POST')
            const data = await (await fetch(`${url}/todos`, headers)).json();
            commit('addTodo', data)
        }, 
        updateTodo: async ( { commit }, { title, id }) => {
            const headers = headersFN({ todo: { title }}, 'PUT')
            const data = await (await fetch(`${url}/todos/${id}`, headers)).json();
            commit('setUpdateTodo', data)
        },         
    },
})
