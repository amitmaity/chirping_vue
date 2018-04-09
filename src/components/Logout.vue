<template>
    
</template>

<script>
    import axios from 'axios'
    import router from '../router'
    export default {
        mounted() {
            this.logout();
        },
        methods: {
            csrf: function () {
                return this.$store.state.user.csrf_token
            },
            logout: function () {
                let local = this;
                let server_url = 'http://chirping.lndo.site/user/logout?csrf_token='+this.csrf();
                axios({
                    method: 'post',
                    withCredentials: true,
                    responseType: 'json',
                    url: server_url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/hal+json',
                        'X-CSRF-Token': this.csrf()
                    }
                }).then(function (response) {
                    let values = {
                        'user': {},
                        'login': false
                    };
                    local.$store.commit('setValue', values);
                    local.$store.commit('setLocalStorageValue');
                }).catch(function (error) {
                    console.log(error)
                })
                router.push('/');
            }
        }
    }
</script>

<style scoped>

</style>