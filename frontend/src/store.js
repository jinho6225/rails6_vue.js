import { createStore } from 'vuex'
// Create a new store instance.
export const store = createStore({
    state () {
      return {
        todoList: [],
      }
    },
    getters: {//computed
    
    },
    mutations: {},
    actions: {}
})
  
  
  // Install the store instance as a plugin
