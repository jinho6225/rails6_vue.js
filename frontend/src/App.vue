<template>
  <div id="box" class="mt-5">
    <div id="header">
      <h1>Todo List</h1>
    </div>
    <b-container>
      <b-row class="m-3 p-1">
        <b-col class="p-3">
          <div class="mt-4 mb-4">
            <ListAdd/>
          </div>
          <div class="mt-4 mb-4">
            <List/>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import List from "./components/List.vue";
import ListAdd from "./components/ListAdd.vue";
import { mapState, mapActions } from 'vuex'

export default {
  name: "App",
  components: {
    List,
    ListAdd,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['todoList'])
  },
  created() {
    this.getList()
  },
  methods: {
    ...mapActions(['getList']),
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
