<template>
    <div v-if="totalPages > 0" class="pagination-wrapper">
        <span class="pagination-btn" v-if="showPreviouseLink()" @click="updatePage(currentPage - 1)">⬅️</span>
        <span class="mx-3">{{ currentPage + 1}} of {{ totalPages }}</span>
        <span class="pagination-btn" v-if="showNextLink()" @click="updatePage(currentPage + 1)">➡️</span>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
    computed: {
        ...mapState(['todoList', 'isLoggedIn', 'pageSize', 'currentPage', 'totalPages']),
    },
    methods: {
        ...mapMutations(['updatePage']),
        showPreviouseLink() {
            return this.currentPage === 0 ? false : true
        },
        showNextLink() {
            return this.currentPage === (this.totalPages - 1) ? false : true
        }
    }
}
</script>
<style scoped>
.pagination-wrapper {
    display: flex;
    justify-content: center;
}
.pagination-btn {
    cursor: pointer;
}
</style>