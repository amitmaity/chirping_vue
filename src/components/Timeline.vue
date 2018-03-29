<template>
    <div class="row">
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
    export default {
        data(){
            return{
                chirps: [],
            }
        },
        mounted() {
            this.getChirps()
        },
        methods: {
            getChirps:  function () {
                let backend_url = 'http://chirping.lndo.site/get-chirps?_format=json';
                let local = this;
                axios({
                    method: 'get',
                    responseType: 'json',
                    url: backend_url,
                    data: {},
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/hal+json'
                    }
                }).then(function (response) {
                    if (response.status === 200) {
                        //console.log(response.data);
                        for(let i=0; i ,i < response.data.length; i++) {
                            //console.log(response.data[i]);
                            local.chirps.push(response.data[i])
                        }
                        //console.log(local.chirps);
                    }
                }).catch(function (error) {
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>

</style>