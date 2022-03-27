<template>
    <div v-if="isLoggedIn">
        <h3>Todos</h3>
        <div id="todo-card"
            data-testid="todos"
            v-for="todo in visibleTodos"
            :key="todo.id"
            class=""
        >
            <div 
            class="d-flex justify-content-between" 
            >
                <div class="m-0 d-flex align-items-center"
                :class="{'completed' : todo.completed === true}">
                    {{ todo.title }}
                </div>
                <div>
                    <button class="m-1">
                    <i
                        class="far fa-edit"
                        aria-hidden="true"
                        @click="todo.completed === false ? editTodo(todo) : null"
                    >
                    </i>
                    </button>

                    <button class="m-1">
                    <i
                        class="far fa-check-circle"
                        aria-hidden="true"
                        @click="completeTodo({ id: todo.id, completed: todo.completed })"
                    >
                    </i>
                    </button>
                    <button class="m-1">
                    <i
                        class="far fa-trash-alt"
                        aria-hidden="true"
                        @click="deleteTodo(todo.id)"
                    >
                    </i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div v-else></div>
</template>
<script>
import { mapState , mapActions, mapMutations } from 'vuex'

export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapState(['todoList', 'isLoggedIn', 'visibleTodos']),
    },
    methods: {
        ...mapMutations(['editTodo']),
        ...mapActions(['deleteTodo', 'completeTodo']),
    }
};
</script>
<style scoped>
.completed {
    text-decoration: line-through;
    color: darkgrey;
}
.card-text {
    font-size: 20px;
}
#todo-card {
    width: 100%;
    border: 1px solid black;
    padding: 10px;
    margin-bottom: 10px;
}
button {
    background: powderblue;
    border: 0px powderblue solid;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
    width: 50px;
    height: 50px;
}
</style>