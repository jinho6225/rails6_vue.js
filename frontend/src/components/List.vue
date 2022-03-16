<template>
    <ul>
        <li v-for="(todo, index) in todoList">
            {{ todo.id }}: {{ todo.title }}
        </li>
    </ul>
</template>
<script>
export default {
    props: ['todoList']
}
</script>