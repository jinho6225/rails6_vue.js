<template>
    <div class="add">
        <h3>Add Todo</h3>
        <form @submit="onSubmit" v-if="mode === 'add'">
            <input 
            type="text" 
            v-model="text"
            placeholder="Enter todo..."
            data-testid="todo-input"
            :disabled="!isLoggedIn"
            >
            <input 
            type="submit" 
            data-testid="todo-submit"
            value="Submit" 
            :disabled="!isLoggedIn">
        </form>
        <form @submit="todoUpdate" v-else>
            <input 
            type="text" 
            v-model="text"
            data-testid="todo-input"
            placeholder="Enter todo..."
            :disabled="!isLoggedIn"
            >
            <input 
            type="submit" 
            data-testid="todo-submit"
            value="Update" 
            :disabled="!isLoggedIn">
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

  export default {
    data() {
        return {
            text: null,
            id: null,
            mode: 'add'
        }
    },
    computed: {
        ...mapState(['todo', 'isLoggedIn'])
    },
    methods: {
        ...mapActions(['updateTodo', 'addList']),
        onSubmit(event) {
            if (this.text === null) {
                alert('please enter todo')
            } 
            else {
                event.preventDefault();
                this.addList(this.text)
                this.text = null
            }
        },
        todoUpdate(event) {
            if (this.text === null) {
                alert('please enter todo')
            } 
            else {
                event.preventDefault();                
                this.updateTodo({ title: this.text, id: this.id })
                this.text = null
                this.mode = 'add'
            }
        }
    },
    watch: {
        todo: function(newVal, old) {
            this.text = newVal.title
            this.id = newVal.id
            this.mode = 'edit'
        }        
    }
  }
</script>
<style scoped>
form {
    display: flex;
}
input[type="text"] {
    flex: 10;
    padding: 10px;
    border: 1px solid powderblue;
    outline: 0;
}
input[type="text"]:hover, input[type="text"]:focus {
    border: 1px solid blue;
}
input[type="submit"] {
    flex: 2;
    background: powderblue;
    border: 0px powderblue solid;
    cursor: pointer;
}
input[type="submit"]:hover {
    background: rgb(90, 166, 176);
    color: #fff;
}
</style>