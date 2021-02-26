<!-- Create user component to get current user state-->

<template>
<div>
    <slot name="user" :user="user"></slot> <!--- make user data available any other component that consumes the user component --->
</div>
    
</template>

<script>
import {ref} from '@vue/composition-api' // if this ref change then rendering obj is also changed
import {auth} from '../firebase'
export default {
    setup(){
        const user = ref(null);
        const unsubscribe = auth.onAuthStateChanged(
            firebaseUser => user.value = firebaseUser
        );
         return {
             user,
             unsubscribe
         }
    
    },

    destroyed(){
        this.unsubscribe() // unsubscribe when component is destroyed
    }
}
</script>