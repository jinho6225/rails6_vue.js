<template>
    <div v-if="isLoggedIn">
        <h3>Todos</h3>    
        <b-card            
            v-for="todo in visibleTodos"
            :key="todo.id"
            class="mb-2 d-flex justify-content-between"
        >
            <div class="d-flex justify-content-between">
                <b-card-text class="m-0 d-flex align-items-center"
                :class="{'completed' : todo.completed === true}">
                    {{ todo.title }}
                </b-card-text>
                <div>
                    <b-button pill variant="outline-secondary" class="m-1">
                    <i
                        class="far fa-edit"
                        aria-hidden="true"
                        @click="todo.completed === false ? editTodo(todo) : null"
                    >
                    </i>
                    </b-button>

                    <b-button pill variant="outline-success" class="m-1">
                    <i
                        class="far fa-check-circle"
                        aria-hidden="true"
                        @click="completeTodo({ id: todo.id, completed: todo.completed })"
                    >
                    </i>
                    </b-button>
                    <b-button pill variant="outline-danger" class="m-1">
                    <i
                        class="far fa-trash-alt"
                        aria-hidden="true"
                        @click="deleteTodo(todo.id)"
                    >
                    </i>
                    </b-button>
                </div>
            </div>
        </b-card>
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
</style>