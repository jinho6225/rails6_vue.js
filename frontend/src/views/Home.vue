<template>
  <div id="box" class="mt-5">
    <div v-if="isLoggedIn" id="signoutbtn" class="container">
      <button @click="signOut">Sign Out</button> 
    </div>
    <div id="header">
      <h1 @click="goToLogin">Todo List</h1> 
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
import List from "../components/List.vue";
import ListAdd from "../components/ListAdd.vue";
import { mapState, mapActions, mapMutations } from 'vuex'

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
    ...mapState(['todoList', 'isLoggedIn'])
  },
  created() {
    this.getList()
    if (window.localStorage.getItem('token')) {
      this.loginUser()
      this.setTodos()
    }
  },
  methods: {
    ...mapActions(['getList']),
    ...mapMutations(['loginUser', 'logoutUser', 'setTodos']),
    goToLogin(){            
        this.$router.push('/'); 
    },
    signOut() {
      this.logoutUser()
      this.goToLogin()
    }
  }
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
#signoutbtn {
  display: flex;
  justify-content: flex-end;
}
#signoutbtn button {
    background: powderblue;
    border: 0px powderblue solid;
    cursor: pointer;
    padding: 5px;
}
#signoutbtn button:hover {
    background: rgb(90, 166, 176);
    color: #fff;
}
</style>
