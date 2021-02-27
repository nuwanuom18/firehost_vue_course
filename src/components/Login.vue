<template>
  <aside>
      <div class="content">
    <!--- 
    <h3>Sign in Anonymously</h3>
    <button @click="auth.signInAnonymously()">Sign In</button>
    --->
    <div v-if="newUser">
      <h3>Sign up for new account</h3>
      <a href="#" @click="newUser = false">Returning User?</a>
    </div>  

    <div v-else>
      <h3>Sign in with email</h3>
      <a href="#" @click="newUser = true">New User?</a>
    </div>

    <hr />
    <label for="email">Email</label><br />
    <input  v-model="email" placeholder="email" class="input login" type="email" />
    <br>
    <label for="password">Password</label><br />
    
    <input
      v-model="password"
      placeholder="password"
      class="input login"
      type="password"
    />
    <!--realtime change the variable---->
    <hr>
    <button
      class="button is-info"
      :class="{ 'is-loading': loading }"
      @click="signInOrCreateUser()"
    >
      {{ newUser ? "SignUp" : "Login" }}
    </button>
    <p class="has-text-danger" v-if="errorMessage">{{errorMessage}}</p>

    </div>
  </aside>
</template>

<script>
import { auth } from "../firebase";
export default {
  data() {
    return {
      auth,
      newUser: false,
      email: "",
      password: "",
      loading: false,
      errorMessage: "",
    };
  },

  methods: {
    async signInOrCreateUser() {
      this.loading = true;
      this.errorMessage = "";
      try {
        if (this.newUser) {
          await auth.createUserWithEmailAndPassword(this.email, this.password);
        } else {
          await auth.signInWithEmailAndPassword(this.email, this.password);
        }
      } catch (error) {
          this.errorMessage = error.message;
      }

      this.loading = false;
    },
  },
};
</script>

<style scoped>
.login{
    width: 500px;
}
.content{
    max-width: 500px;
    margin: auto;
}
</style>

