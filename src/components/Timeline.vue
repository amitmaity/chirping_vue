<template>
    <div class="row" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <div class="col-md-2 offset-md-5 mt-4" v-if="newChirpAvailable"><button v-on:click="getNewChirps" class="btn btn-info">Fetch New</button></div>
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
    import router from '../router';
    import {eventBus} from "../main";

    export default {
        components: {
            'app-chirp': Chirp,
        },
        data() {
            return {
                chirps: [],
                busy: false,
                page: 0,
                newChirpAvailable:  false,
                lastChirpId: 0,
            }
        },
        mounted() {
            this.redirectIfNotLoggedIn();
            this.copyChirpFromStore();
            if (this.chirps.length === 0){
                this.fetchChirps(0, true);
            }
            if (this.$store.state.lastChirpId !== 0){
                this.lastChirpId = this.$store.state.lastChirpId;
            }
            this.refreshChirps();
        },
        methods: {
            csrf: function () {
                return this.$store.state.user.csrf_token
            },
            fetchChirps: function (page, commit) {
                let backend_url = 'http://chirping.lndo.site/get-chirps?_format=json&page=' + page;
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
                    let lastChirpId = 0;
                    if (response.status === 200) {
                        if (commit) {
                            local.chirps = [];
                        }
                        for (let i = 0; i , i < response.data.length; i++) {
                            if (i === 0){
                                lastChirpId = response.data[i].id;
                            }
                            local.chirps.push(response.data[i])
                        }
                        if (commit) {
                            let values = {
                                'chirps': local.chirps,
                                'lastChirpId': lastChirpId,
                            };
                            local.$store.commit('setValue', values);
                            local.$store.commit('setLocalStorageValue', values);
                        }
                    }
                }).catch(function (error) {
                    console.log(error)
                })
            },
            copyChirpFromStore: function () {
                for (let i = 0; i , i < this.$store.state.chirps.length; i++) {
                    this.chirps.push(this.$store.state.chirps[i])
                }
            },
            refreshChirps: function () {
                let local = this;
                setInterval(function () {
                    if (local.$store.getters.isLoggedIn) {
                        local.getLastChirpId(false);
                    }
                }, 60000)
            },
            redirectIfNotLoggedIn: function () {
                if (!this.$store.getters.isLoggedIn) {
                    console.log('Redirect to login');
                    router.push('/login');
                }
            },
            loadMore: function () {
                this.page++;
                this.busy = true;
                console.log('fetching page' + this.page);
                this.fetchChirps(this.page, false);
                this.busy = false;
            },
            getLastChirpId: function () {
                let backend_url = 'http://chirping.lndo.site/get-last-chirp?_format=json';
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
                        if (response.data[0].id !== local.$store.state.lastChirpId){
                            local.newChirpAvailable = true;
                            local.lastChirpId = response.data[0].id;
                        }
                    }
                }).catch(function (error) {
                    console.log(error)
                })
            },
            getNewChirps:   function () {
                this.fetchChirps(0,true);
                this.newChirpAvailable = false;
                let values = {
                    'lastChirpId': this.lastChirpId,
                };
                this.$store.commit('setValue', values);
                this.$store.commit('setLocalStorageValue', values);
            }
        },
        created() {
            let local = this;
            eventBus.$on('chirpAdded', function (data) {
                console.log('bus caught');
                local.chirps = [];
                local.copyChirpFromStore();
                /*local.$nextTick(function () {
                    console.log(local.chirps);
                })*/
            })
        },
    }
</script>

<style scoped>

</style>