<!--- chat ui --->
<template>
    <div class="message" :class="{'from-user' : owner}">
        {{message.text}}
        <br>
        <audio v-if="message.audioURL" :src="message.audioURL" controls></audio><br>
        <img v-if="message.imageURL" class="preview" height="268" width="356" :src="message.imageURL" />
        <span class="sender">from UID {{message.sender}}</span>
    </div>
</template>

<script>
export default {
    props : ['message' , 'owner']
}
</script>

<style scope>

.message {
  background: #dddddd;
  color: black;
  margin: 10px;
  
  border-radius: 5px;
  padding: 12px;
  display: inline-block;
}
.from-user {
  margin-right: 10px;
  margin-left: auto;
  background: #91bbff;
}
.sender {
  font-size: 0.7rem;
}
</style>