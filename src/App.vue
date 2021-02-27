<template>
  <div id="app" class="appvue">
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
header{
  text-align: center;
  margin: 50px;
}
.appvue{
  text-align: center;
}
  .message1{
    font-family: 'Courier New', Courier, monospace;
  }
  .message{
    font-family: 'Courier New', Courier, monospace;
  }
  button{
    margin: 10px;
    min-width: 100px;
    min-height: 50px;
    background: cornflowerblue;
    font-family: cursive;
  }
</style>
