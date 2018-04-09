<template>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
        <a class="navbar-brand" href="#">Chirping</a>
        <!-- Links -->
        <ul class="navbar-nav">
            <li class="nav-item">
                <router-link to="/" class="nav-link">Timeline</router-link>
            </li>
            <li class="nav-item" v-if="!loggedIn">
                <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item" v-if="loggedIn">
                <router-link to="/logout" class="nav-link">Logout</router-link>
            </li>
        </ul>
    </nav>

</template>

<script>
    export default {
        data(){
            return {
                loggedIn: this.$store.getters.isLoggedIn,
            }
        },
        beforeUpdate()  {
            this.loggedIn = this.$store.getters.isLoggedIn;
        }
    }
</script>

<style scoped>

</style>