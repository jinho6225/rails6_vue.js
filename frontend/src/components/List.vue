<template>
    <div>
    <h3>Todos</h3>
        <b-card
            v-for="todo in $store.state.todoList"
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
                        @click="editTodo(todo)"
                    >
                    </i>
                    </b-button>

                    <b-button pill variant="outline-success" class="m-1">
                    <i
                        class="far fa-check-circle"
                        aria-hidden="true"
                        @click="completeTodo(todo.id, todo.completed)"
                    >
                    </i>
                    </b-button>
                    <b-button pill variant="outline-danger" class="m-1">
                    <i
                        class="far fa-trash-alt"
                        aria-hidden="true"
                        @click="removeTodo(todo.id)"
                    >
                    </i>
                    </b-button>
                </div>
            </div>
        </b-card>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    completeTodo(id, completed) {
      this.$emit("completeTodo", id, completed);
    },
    removeTodo(id) {
      this.$emit("removeTodo", id);
    },
    editTodo(todo) {
      this.emitter.emit("editTodo", todo);
    },
  },
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