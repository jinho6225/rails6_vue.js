<template>
  <div id="forgot-container">
    <main class="form-signin">
      <div class="card">
        <div class="card-body">
          <form @submit="onSubmit">
            <h2 class="h3 mb-3 fw-normal text-center">Please Enter your email</h2>
            <div class="form-group">
              <label>Email address</label>
              <input type="email" class="form-control form-control-lg" placeholder="Email address" v-model="email"/>
            </div>
            <div class="mt-3 mb-1 d-flex justify-content-center">
                <label>If you know your password, please <button id="loginbtn"><router-link id="linkToLogIn" :to="{name: 'login'}">Log In</router-link></button></label>                            
            </div>
            <input class="w-100 btn btn-lg btn-primary mt-3" type="submit" value="Reset Password"/>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
        email: null
    };
  },
  methods: {
    ...mapActions(['sendResetPasswordLink']),
    onSubmit(event) {
        if (this.email === "") {          
            alert('please enter email')
        } else {
            event.preventDefault();
            const user = { "email": this.email }
            this.sendResetPasswordLink(user).then(data => {                
                alert(data.alert)
                this.email = null            
                this.goToReset()                
            })
        }
    },            
    goToReset(){            
        this.$router.push({
            name: 'reset', 
            params: {
                email: this.email,
            }
        }); 
    }
  },
};
</script>

<style scoped>
#forgot-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
}
.form-signin {
  width: 100%;
  max-width: 450px;
  margin: auto;
}
label {
  font-weight: 600;
}

    #loginbtn {
        background: powderblue;
        border: 1px solid powderblue;
        border-radius: 8px;
        padding: 5px;
        outline: 0;
    }
    #linkToLogIn {
        text-decoration: none;
        color: black
    }
</style>
