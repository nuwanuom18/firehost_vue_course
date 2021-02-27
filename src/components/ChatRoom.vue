<template>
    <main>
        <h3> Welcome to ChatRoom {{chatId}}</h3>
        <User #user="{user}">
            <ul>
                <li v-for="message of messages" :key="message.id">
                    <ChatMessage :message="message"
                    :owner="user.uid === message.sender"

                    />
                </li>
            </ul>

           
            <textarea placeholder="type message here .." v-model='newMessageText'  cols="40" rows="5"></textarea>
            <hr>

            <!--- Adding new feature Picture --->

            <button v-if="!picture" @click="addPicture()">Send Photo</button>



            <button v-if="!recorder" @click="record()">Record</button>
            <button v-else @click="stop()">Stop</button>
            <h5>Record Audio</h5>
            <audio v-if="newAudio" :src="newAudioURL" controls></audio>

            <button :class="{ 'is-loading': loading }"  :disabled="!newMessageText || loading " class="button is-success" type="text" @click="addMessage(user.uid)">Send</button>
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

            await this.messagesCollection.doc(messageId).set({
                text: this.newMessageText,
                sender: uid,
                createdAt: Date.now(),
                audioURL

            })

            this.loading = false
            this.newMessageText =''
            this.newAudio = null
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
        }
    }
}
</script>

<style>
ul{
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
li{
    display: flex;
}
</style>