<template>
  <div id="signup-container">
    <main class="form-signin">
      <div class="card">
        <div class="card-body">
          <form>
            <h2 class="h3 mb-3 fw-normal text-center">Please Sign Up</h2>

            <div class="form-group">
              <label>Email address</label>
              <input
                type="email"
                class="form-control form-control-lg"
                placeholder="Email address"
              />
            </div>

            <div class="form-group">
              <label>Password</label>
              <input
                type="password"
                class="form-control form-control-lg"
                placeholder="Password"
              />
            </div>

            <div class="form-group">
              <label>Confirmation Password</label>
              <input
                type="password"
                class="form-control form-control-lg"
                placeholder="Password"
              />
            </div>

            <div class="mt-3 mb-1 d-flex justify-content-center">
                <label>If you have account, please <button id="loginbtn"><router-link id="linkToLogIn" :to="{name: 'login'}">Log In</router-link></button></label>                            
            </div>

            <input
              class="w-100 btn btn-lg btn-primary mt-3"
              type="submit"
              value="Sign Up"
            />
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
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
