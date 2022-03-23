import { createStore } from 'vuex'
import { url, headersFN } from './lib.js'

export const store = createStore({
    state () {
        return {
            todoList: [],
            todo: null,            
            isLoggedIn: false,
            currentPage: 0,
            pageSize: 5,
            visibleTodos: [],
            totalPages: 0
        }
    },
    getters: {//computed        
    },
    mutations: {
        updatePage: function (state, pageNumber) {
            state.currentPage = pageNumber
            this._mutations.updateVisibleTodos[0]()
        },
        updateVisibleTodos: function(state) {
            state.visibleTodos = state.todoList.slice(state.currentPage * state.pageSize, (state.currentPage * state.pageSize) + state.pageSize)
            if (state.visibleTodos.length === 0 && state.currentPage > 0) {            
                this._mutations.updatePage[0](state.currentPage - 1)                
            }        
        },
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
        setTotalPages: (state) => state.totalPages = Math.ceil(state.todoList.length / state.pageSize),
        addTodo: function (state, todo) {
            (state.todoList = [todo, ...state.todoList])
            this._mutations.updateVisibleTodos[0]()
        },
        setUpdateTodo: (state, { title, id }) => {
            state.todoList.forEach((todo) => {
                if (todo.id === id) {
                    todo.title = title
                }
            })
        },
        removeTodo: function(state, id){
            (state.todoList = state.todoList.filter(todo => todo.id !== id))
            this._mutations.updateVisibleTodos[0]()
        },
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
        postUserInfo: async ({ commit }, userInfo) => {
            const headers = headersFN(userInfo, 'POST')
            const data = await (await fetch(`${url}/users`, headers)).json();            
            return data
        },
        getList: async ({ commit }) => {               
            const data = await(await fetch(`${url}/todos`)).json();            
            commit('setTodos', data)
            commit('updateVisibleTodos')
            commit('setTotalPages', data)
        },
        deleteTodo: async ({ commit }, id) => {
            await fetch(`${url}/todos/${id}`, { method: "DELETE" });
            commit('removeTodo', id)
            commit('setTotalPages')
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
            commit('setTotalPages')
        }, 
        updateTodo: async ( { commit }, { title, id }) => {
            const headers = headersFN({ todo: { title }}, 'PUT')
            const data = await (await fetch(`${url}/todos/${id}`, headers)).json();
            commit('setUpdateTodo', data)
        },         
    },
})
