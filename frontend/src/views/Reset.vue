<template>
  <div id="reset-container">
    <main class="form-signin">
      <div class="card">
        <div class="card-body">
          <form @submit="onSubmit">
            <h2 class="h3 mb-3 fw-normal text-center">Please Reset your Password</h2>
            <div class="form-group">
              <label>Token</label>
              <input type="token" class="form-control form-control-lg" placeholder="Password Reset Token" v-model="token"/>
            </div>
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
        token: null,
        email: null,
        password: null,
        password_confirmation: null
    };
  },
  methods: {
    ...mapActions(['ResetPassword']),
    onSubmit(event) {
        if (this.token === '') {
            alert('please check your email. we sent password reset token')
        } else if (this.password.length < 6) {
            alert('Password is too short (minimum is 6 characters)')
        } else if (this.password !== null && this.password_confirmation !== null && this.password !== this.password_confirmation) {
            alert('please match your password and password_confirmation')
        } else if (this.email === "" || this.password === "" || this.password_confirmation === "") {          
            alert('please enter reset password info')
        } else if (this.email === null || this.password === null || this.password_confirmation === null) {
            alert('please enter reset password info')
        } else {
            event.preventDefault();
            const user = { "token": this.token, "email": this.email, "password": this.password }
            this.ResetPassword(user).then(data => {
                this.goToLogin()
                this.token = null
                this.email = null
                this.password = null
                this.password_confirmation = null
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
#reset-container {
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
