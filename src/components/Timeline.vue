<template>
    <div class="row">
        <app-chirp></app-chirp>
        <div v-for="chirp in chirps" class="col-md-8 offset-md-2 mt-4">
            <div class="card">
                <div class="card-header bg-info">
                    <h5 class="card-title">{{chirp.title | to-uppercase}}</h5>
                </div>
                <div class="card-body">
                    <p class="card-text">{{chirp.text}}</p>
                </div>
                <div class="card-footer">
                    <p class="card-text">By {{chirp.name}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Chirp from './Chirp';
    export default {
        components:{
            'app-chirp':  Chirp,
        },
        data(){
            return{
                chirps: [],
            }
        },
        mounted() {
            this.copyChirpFromStore();
            this.fetchChirps();
            this.refreshChirps();
        },
        methods: {
            csrf: function () {
                return this.$store.state.user.csrf_token
            },
            fetchChirps:  function () {
                let backend_url = 'http://chirping.lndo.site/get-chirps?_format=json';
                let local = this;
                axios({
                    method: 'get',
                    withCredentials: true,
                    responseType: 'json',
                    url: backend_url,
                    data: {},
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/hal+json',
                        'X-CSRF-Token': this.csrf()
                    }
                }).then(function (response) {
                    if (response.status === 200) {
                        local.chirps = [];
                        for(let i=0; i ,i < response.data.length; i++) {
                            local.chirps.push(response.data[i])
                        }
                        let values = {
                            'chirps':   local.chirps,
                        };
                        local.$store.commit('setValue', values);
                        local.$store.commit('setLocalStorageValue', values);
                    }
                }).catch(function (error) {
                    console.log(error)
                })
            },
            copyChirpFromStore: function () {
                for(let i=0; i ,i < this.$store.state.chirps.length; i++) {
                    this.chirps.push(this.$store.state.chirps[i])
                }
            },
            refreshChirps:  function () {
                let local = this;
                setInterval(function () {
                    local.fetchChirps();
                },60000)
            },

        }
    }
</script>

<style scoped>

</style>