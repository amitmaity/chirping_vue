<template>
    <div>
        <h1>Login Page</h1>
        <form>
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" class="form-control" id="username" v-model="username">
            </div>
            <div class="form-group">
                <label for="pwd">Password:</label>
                <input type="password" class="form-control" id="pwd" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary" v-on:click="login">Submit</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    import router from '../router'
    export default {
        data() {
            return {
                username: '',
                password: '',
                loggedIn: false,
            }
        },
        mounted()  {
            this.loggedIn = this.$store.getters.isLoggedIn;
            this.checkLogin();
        },
        methods: {
            login: function () {
                let local = this;
                let server_url = 'http://chirping.lndo.site/user/login?_format=json';
                let cred = {};
                cred.name = this.username;
                cred.pass = this.password;
                axios({
                    method: 'post',
                    withCredentials: true,
                    url: server_url,
                    data: JSON.stringify(cred),
                    returnType: 'json',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    cookies: true,
                }).then(result => {
                    console.log('Logged in');
                    let values = {
                        'user': {
                            uid: result.data.current_user.uid,
                            roles: result.data.current_user.roles,
                            name: result.data.current_user.name,
                            csrf_token: result.data.csrf_token,
                            logout_token: result.data.logout_token
                        },
                        'login': true
                    };
                    local.$store.commit('setValue', values);
                    local.$store.commit('setLocalStorageValue');
                    local.getUser();
                    router.push('/');
                }).catch(error => {
                    //alert("Error");
                })
            },
            checkLogin: function () {
                if (this.loggedIn){
                    router.push('/');
                }
            },
            getUser: function () {
                let local = this;
                let server_url = 'http://chirping.lndo.site/user/'+ this.$store.state.user.uid +'?_format=json';
                console.log(server_url);
                axios({
                    method: 'get',
                    withCredentials: true,
                    url: server_url,
                    returnType: 'json',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "X-CSRF-Token": local.$store.state.user.csrf_token,
                    },
                    cookies: true,
                }).then(result => {
                    console.log('Fetched User');
                    let user = local.$store.state.user;
                    let name = result.data.field_name[0];
                    user.name = name.value;
                    let values = {
                        'user': user,
                    };
                    local.$store.commit('setValue', values);
                    local.$store.commit('setLocalStorageValue');
                }).catch(error => {
                    console.log(error);
                    alert("Error");
                })
            }
        },
    }
</script>

<style scoped>

</style>