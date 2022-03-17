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

const getList = async () => {
  const res = await fetch("http://localhost:3000/api/v1/todos");
  const data = await res.json();
  return data;
};
const addList = async (title) => {
  const res = await fetch("http://localhost:3000/api/v1/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ todo: {title, completed: false}})
  });
  const data = await res.json();
  return data;
};
const removeTodo = async (id) => {
  console.log(id, 'id')
  const res = await fetch(`http://localhost:3000/api/v1/todos/${id}`, {
      method: "DELETE"
  });
  return res;
};
const completeTodo = async (id, completed) => {
  const res = await fetch(`http://localhost:3000/api/v1/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ todo: {completed: !completed}})
  });
  const data = await res.json();
  return data;
};
const updateTodo = async (title, id) => {
  const res = await fetch(`http://localhost:3000/api/v1/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ todo: { title }})
  });
  const data = await res.json();
  return data;
};

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
    getList().then((data) => {
      this.todoList = data;
    });
  },
  watch: {
    todoList: function (newVal, old) {
      if (newVal.length !== old.length) {
        getList().then((data) => {
          this.todoList = data;              
        });
      }
    }
  },
  methods: {
    listAdd(todo) {
      addList(todo).then((data) => {        
        this.todoList = this.todoList.concat({title: data.title, completed: false})
      })   
    },
    onTodoUpdate(title, id) {
      updateTodo(title, id).then(data => {
        this.todoList.forEach((cur) => {
          if (cur.id === id) {
            cur.title = title
          }
        })
      })
    },
    onCompleteTodo(id, completed) {
      completeTodo(id, completed).then(data => {
        this.todoList.forEach((cur) => {
          if (cur.id === id) {
            cur.completed = !cur.completed
          }
        })
      })
    },
    onRemoveTodo(id) {
      removeTodo(id).then((data) => {
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
