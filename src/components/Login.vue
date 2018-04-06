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
    //import router from 'router'
    export default {
        data() {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            login: function () {
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
                    alert("Success");
                    console.log(result.data);
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
                    //console.log(values)
                    this.$store.commit('setValue', values);
                    this.$store.commit('setLocalStorageValue');
                    //router.push('/');
                }).catch(error => {
                    alert("Error");
                    console.log(error);
                })
            }
        },
    }
</script>

<style scoped>

</style>