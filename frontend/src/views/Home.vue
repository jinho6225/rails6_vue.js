<template>
  <div id="box" class="mt-5">    
    <div v-if="isLoggedIn" class="btn-container">
      <button @click="pdf">Generate PDF</button> 
      <button @click="signOut">Sign Out</button> 
    </div>
    <div id="header">
      <h1 @click="goToLogin">Todo List</h1> 
    </div>
    <div v-if="isLoggedIn" class="container">
      <div class="w-100">
        <div class="m-3 p-1">
          <div class="p-3">
            <div class="mt-4 mb-4">
              <ListAdd/>
            </div>
            <div id="todoList" class="mt-4 mb-4">
              <List/>
            </div>
          </div>
          <Pagination/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import List from "../components/List.vue";
import ListAdd from "../components/ListAdd.vue";
import Pagination from "../components/Pagination.vue";
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: "App",
  components: {
    List,
    ListAdd,
    Pagination
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
    },
    pdf() {
      // const pdfTarget = document.getElementById('box'); //page     
      let contents = `<h2>Todo List</h2>
                        <table>
                        <tr>
                          <th>title</th>
                          <th>completed</th>                          
                        </tr>`
      for (let i = 0; i < this.todoList.length; i++) {
        let todo = this.todoList[i]
        contents += `<tr><th>${todo.title}</th><th>${todo.completed}</th></tr>`
      }
      contents += `</table>`
      // const html = htmlToPdfmake(pdfTarget.innerHTML); //page
      const html = htmlToPdfmake(contents);
      const documentDefinition = { content: html };
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      // pdfMake.createPdf(documentDefinition).open(); //open
      pdfMake.createPdf(documentDefinition).download();
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
.btn-container {
  display: flex;
  justify-content: space-around;  
}
.container {
  display: flex;
  justify-content: center;
}
.btn-container button {
    background: powderblue;
    border: 0px powderblue solid;
    cursor: pointer;
    padding: 5px;
}
.btn-container button:hover {
    background: rgb(90, 166, 176);
    color: #fff;
}
</style>
