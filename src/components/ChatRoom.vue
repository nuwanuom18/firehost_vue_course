<template>
  <main>
    <h3>Welcome to ChatRoom {{ chatId }}</h3>
    <User #user="{ user }">
      <ul>
        <li v-for="message of messages" :key="message.id">
          <ChatMessage
            :message="message"
            :owner="user.uid === message.sender"
          />
        </li>
      </ul>

    <div class="chatroomuser">
      <textarea
        placeholder="type message here .."
        v-model="newMessageText"
        cols="40"
        rows="5"
      ></textarea>
      <hr />

      <!--- Adding new feature Picture --->

      <div>
        <button @click="choose">Add picture</button>
        <input
          type="file"
          ref="input1"
          style="display: none"
          @change="previewImage"
          accept="image/*"
        />
      </div>

      <div v-if="picture != null">
        <img class="preview" height="268" width="356" :src="newPictureURL" />
        <br />
      </div>

      <button v-if="!recorder" @click="record()">Record</button>
      <button v-else @click="stop()">Stop</button>
      
      <audio v-if="newAudio" :src="newAudioURL" controls></audio>

      <button
        :class="{ 'is-loading': loading }"
        :disabled="!newMessageText || loading"
        class="button is-success"
        type="text"
        @click="addMessage(user.uid)"
      >
        Send
      </button>
      </div>
    </User>
  </main>
</template>

<script>
import User from './User'
import {db, storage} from '../firebase'
import ChatMessage from './ChatMessage'
export default {

    components:{
        User,
        ChatMessage,
    },
    data(){
        return {
            newMessageText : '',
            loading: false,
            messages: [],
            newAudio: null,
            recorder: null,
            picture: null,
            imageURL : '',
            uploadValue : 0

        }
    },
    computed: {
        chatId(){
            return this.$route.params.id; // current url properties
        },
        messagesCollection(){
            return db.doc(`chats/${this.chatId}`).collection('messages')
        },
        newAudioURL(){
            return URL.createObjectURL(this.newAudio);
        },
        newPictureURL(){
            return URL.createObjectURL(this.picture);
        }

    },
    firestore(){
        return {
            messages: this.messagesCollection.orderBy('createdAt').limitToLast(10)
        }
    },
    methods: {
        async addMessage(uid){
            this.loading = true

            let audioURL = null
            const {id: messageId} = this.messagesCollection.doc();

            if(this.newAudio){
                const storageRef = storage.ref('chats').child(this.chatId).child(`${messageId}.wav`)
                await storageRef.put(this.newAudio)
                audioURL = await storageRef.getDownloadURL();
            }

            // Upload photo method //

            let imageURL=null;
            const storageRef = storage.ref('chats').child(this.chatId).child(`${messageId}.jpg`);
            await storageRef.put(this.picture)
            imageURL = await storageRef.getDownloadURL();
            
            await this.messagesCollection.doc(messageId).set({
                text: this.newMessageText,
                sender: uid,
                createdAt: Date.now(),
                audioURL,
                imageURL

            })

            
            

            this.loading = false
            this.newMessageText =''
            this.newAudio = null
            this.picture = null
        },

        async record(){
            this.newAudio = null
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false,

            })

            const options = {mimeType: "audio/webm"}
            const recordedChunks = []
            this.recorder = new MediaRecorder(stream, options)

            this.recorder.addEventListener('dataavailable' , e=>{
                if(e.data.size >0){
                    recordedChunks.push(e.data)
                }
            })

            this.recorder.addEventListener('stop', ()=>{
                this.newAudio = new Blob(recordedChunks)
                console.log(this.newAudio)
            })

            this.recorder.start()
            
        },
        async stop(){
            this.recorder.stop()
            this.recorder = null
        },
        choose() {
        this.$refs.input1.click()   
        },

        previewImage(event) {
        this.uploadValue=0;
        this.imageURL=null;
        this.picture = event.target.files[0];
        },

    }
}
    

</script>

<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-width: 500px;
  background: #efefef;
  padding: 10px;
  border-radius: 0;
}
li {
  display: flex;
}
textarea{
    min-width: 500px;
    min-height: 40px;
    text-align: center;
    align-items: center;
    padding-top: 10px;
    margin-left: auto;
    margin-right: auto;
}

</style>