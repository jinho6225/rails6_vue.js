<template>
<div id="login-container">
    <main class="form-signin">
        <div class="card">
               <div class="card-body">
                    <form @submit="onSubmit">
                        <h2 class="h3 mb-3 fw-normal text-center">Please Log in</h2>
                        <div class="form-group">
                            <label>Email address</label>
                            <input type="email" v-model="email" class="form-control form-control-lg" placeholder="Email address" />
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" v-model="password" class="form-control form-control-lg" placeholder="Password"/>
                        </div>
                        <div class="mt-3 mb-1 d-flex justify-content-center">
                            <label>If you don't have account, please <button id="signupbtn"><router-link id="linkToSignUp" :to="{name: 'signup'}">Sign Up</router-link></button></label>                            
                        </div>
                        <input class="w-100 btn btn-lg btn-primary mt-3" type="submit" value="LogIn"/>
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
                password: null
            }
        },
        methods: {
            ...mapActions(['getUserInfo']),
            onSubmit(event) {
                if (this.email === "" || this.password === "") {
                    alert('please enter login info')
                } else if (this.email === null || this.password === null) {
                    alert('please enter login info')
                } else {
                    event.preventDefault();
                    this.getUserInfo({ email: this.email, password: this.password })                    
                    this.email = null
                    this.password = null
                    this.goToHome()
                }
            },            
            goToHome(){            
                this.$router.push('/home'); 
            }
        },
        created() {            
            if (this.$route.params.email && this.$route.params.password) {                
                this.email = this.$route.params.email
                this.password = this.$route.params.password
            }
            if (window.localStorage.getItem('token')) this.goToHome()
        },
    }
</script>

<style scoped>
#login-container {
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
    #signupbtn {
        background: powderblue;
        border: 1px solid powderblue;
        border-radius: 8px;
        padding: 5px;
        outline: 0;
    }
    #linkToSignUp {
        text-decoration: none;
        color: black
    }
</style>