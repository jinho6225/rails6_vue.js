<template>
  <div id="signup-container">
    <main class="form-signin">
      <div class="card">
        <div class="card-body">
          <form @submit="onSubmit">
            <h2 class="h3 mb-3 fw-normal text-center">Please Sign Up</h2>
            <div class="form-group">
              <label>Email address</label>
              <input type="email" class="form-control form-control-lg" placeholder="Email address" v-model="email"/>
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control form-control-lg" placeholder="Password" v-model="password"/>
            </div>
            <div class="form-group">
              <label>Confirmation Password</label>
              <input type="password" class="form-control form-control-lg" placeholder="Password" v-model="password_confirmation"/>
            </div>
            <div class="mt-3 mb-1 d-flex justify-content-center">
                <label>If you have account, please <button id="loginbtn"><router-link id="linkToLogIn" :to="{name: 'login'}">Log In</router-link></button></label>                            
            </div>
            <input class="w-100 btn btn-lg btn-primary mt-3" type="submit" value="SignUp"/>
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
        email: null,
        password: null,
        password_confirmation: null
    };
  },
  methods: {
    ...mapActions(['postUserInfo']),
    onSubmit(event) {
        if (this.email === "" || this.password === "" || this.password_confirmation === "") {          
            alert('please enter login info')
        } else if (this.email === null || this.password === null || this.password_confirmation === null) {
            alert('please enter login info')
        } else if (this.password !== null && this.password_confirmation !== null && this.password !== this.password_confirmation) {
            alert('please match your password and password_confirmation')
        } else {
            event.preventDefault();
            const user = { "user": { "email": this.email, "password": this.password, "password_confirmation": this.password_confirmation }}
            this.postUserInfo(user).then(data => {
                if (data.email[0] === 'has already been taken') {
                  alert('has already been taken')
                  this.email = null
                  this.password = null
                  this.password_confirmation = null
                } else {
                  this.goToLogin()
                }
            })
        }
    },            
    goToLogin(){            
        this.$router.push({
          name: 'login', 
          params: {
            email: this.email,
            password: this.password
          }
        }); 
    }
  },
};
</script>

<style scoped>
#signup-container {
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
