<template>
  <div id="app">
    <header>
      <h1 >Vue Chat App</h1>
      <p class="message1">- Realtime Voice Chat -</p>
    </header>

    <router-view></router-view> 
  </div>
</template>

<script>

import {auth} from './firebase'
console.log(auth)
// check auth is correct or not

export default {
  name: 'App',
  components: {
  
  }
}
</script>

<style>
  .message1{
    font-family: 'Courier New', Courier, monospace;
  }
  .message{
    font-family: 'Courier New', Courier, monospace;
  }
  button{
    font-family: cursive;
  }
</style>
