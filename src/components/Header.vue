<template>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
        <a class="navbar-brand" href="#">Chirping</a>
        <!-- Links -->
        <ul class="navbar-nav">
            <li class="nav-item">
                <router-link to="/" class="nav-link">Timeline</router-link>
            </li>
            <li class="nav-item" v-if="!loginState">
                <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item" v-if="loginState">
                <router-link to="/logout" class="nav-link">Logout</router-link>
            </li>
        </ul>
    </nav>

</template>

<script>
    export default {
        methods:    {
            loginState: function () {
                return this.$store.getters.isLoggedIn;
            }
        }
    }
</script>

<style scoped>

</style>