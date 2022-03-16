<template>
  <div id="box">
    <b-container class="m-3">
        <b-row class="p-3">
          <b-col class="p-3">
            <List :todoList="todoList" />
          </b-col>
          <b-col class="p-3">
            <ListAdd 
              @listAdd="listAdd"
            />
          </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import List from './components/List.vue'
import ListAdd from './components/ListAdd.vue'

const getList = async() => {
  const res = await fetch('http://localhost:3000/api/v1/todos')
  const data = await res.json()
  return data
}

export default {
  name: 'App',
  components: {
    List, ListAdd
  },
  data() {
    return {
      todoList: []
    }
  },
  mounted() {
    getList().then(data => {      
      this.todoList = [...this.todoList, ...data]
    })
  },
  methods: {
    listAdd(memo) {
      console.log('rcvd')
    }
  }
}
</script>
<style scoped>
  #box {
    display: flex;
    justify-content: center;
  }
</style>