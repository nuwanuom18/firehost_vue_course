// Home Component
<template>
    <div>
        <h3>
            Hello Home
        </h3>
        <User v-slot:user="{user}">
            
            <div v-if="user">
                <UserProfile :user="user"/> <!-- : is the short hand syntax for v-bind , user variable passed to Userprofile as a prop --->
            </div>

            <Login v-else /> <!-- Adding login component -->

        </User>
        
    </div>
</template>

<script>
import Login from './Login' // register component here and below component code (get login to this page)
import User from './User'
import UserProfile from './UserProfile'
export default {
    components : {
        Login,
        User,
        UserProfile
    }
}
</script>
