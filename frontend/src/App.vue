<template>
  <div id="box" class="mt-5">
    <div id="header">
      <h1>Todo List</h1>
    </div>
    <b-container>
      <b-row class="m-3 p-1">
        <b-col class="p-3">
          <div class="mt-4 mb-4">
            <ListAdd 
              @listAdd="listAdd" 
              @todoUpdate="onTodoUpdate" 
            />
          </div>
          <div class="mt-4 mb-4">
            <List
              :todoList="todoList"
              @completeTodo="onCompleteTodo"
              @removeTodo="onRemoveTodo"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import List from "./components/List.vue";
import ListAdd from "./components/ListAdd.vue";
import { api } from "./api"

export default {
  name: "App",
  components: {
    List,
    ListAdd,
  },
  data() {
    return {
      todoList: [],
    };
  },
  created() {
    api.getList().then((data) => {
      this.todoList = data;
    });
  },
  watch: {
    todoList: function (newVal, old) {
      if (newVal.length !== old.length) {
        api.getList().then((data) => {
          this.todoList = data;              
        });
      }
    }
  },
  methods: {
    listAdd(todo) {
      api.addList(todo).then((data) => {        
        this.todoList = this.todoList.concat({title: data.title, completed: false})
      })   
    },
    onTodoUpdate(title, id) {
      api.updateTodo(title, id).then(data => {
        this.todoList.forEach((cur) => {
          if (cur.id === id) {
            cur.title = title
          }
        })
      })
    },
    onCompleteTodo(id, completed) {
      api.completeTodo(id, completed).then(data => {
        this.todoList.forEach((cur) => {
          if (cur.id === id) {
            cur.completed = !cur.completed
          }
        })
      })
    },
    onRemoveTodo(id) {
      api.removeTodo(id).then((data) => {
        this.todoList = this.todoList.filter(todo => todo.id !== id)        
      })
    },
  },
};
</script>
<style scoped>
#box {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#header {
  display: flex;
  justify-content: center;
}
</style>
