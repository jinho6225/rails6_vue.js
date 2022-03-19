import { createStore } from 'vuex'
// Create a new store instance.
const url = "http://localhost:3000/api/v1/todos"
const headersFN = (body) => {
    return {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }    
}

export const store = createStore({
    state () {
      return {
        todoList: [],
      }
    },
    getters: {//computed
    
    },
    mutations: {
        setTodos: (state, todos) => (state.todoList = todos),
        addTodo: (state, todo) => (state.todoList = [{title:todo.title}, ...state.todoList]),
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
        getList: async ({ commit }) => {
            const data = await(await fetch(url)).json();
            commit('setTodos', data)
        },
        deleteTodo: async ({ commit }, id) => {
            await fetch(`${url}/${id}`, { method: "DELETE" });
            commit('removeTodo', id)
        },
        completeTodo: async ({ commit }, { id, completed }) => {
            const headers = headersFN({ todo: {completed: !completed}})
            const data = await (await fetch(`${url}/${id}`, headers)).json();
            commit('setCompleteTodo', data)
        },
        addList: async ({ commit }, title) => {
            const headers = headersFN({ todo: {title, completed: false}})
            const data = await (await fetch(`${url}/${id}`, headers)).json();
            commit('addTodo', data)
        }, 
        updateTodo: async ( { commit }, { title, id }) => {
            const headers = headersFN({ todo: { title }})
            const data = await (await fetch(`${url}/${id}`, headers)).json();
            commit('setUpdateTodo', data)
        },         
    },
})
  
  
  // Install the store instance as a plugin
