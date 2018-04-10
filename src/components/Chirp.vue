<template>
    <div class="col-md-8 offset-md-2 mt-4">
        <div class="card">
            <div class="card-body">
                <div class="form-group">
                    <label for="title">Title of your chirp</label>
                    <input type="text" class="form-control" id="title" v-model="chirpTitle"/>
                </div>
                <div class="form-group">
                    <label for="desc">Description your chirp</label>
                    <textarea id="desc" v-model="chirpText" class="form-control"></textarea>
                </div>
            </div>
            <div class="card-footer">
                <button class="btn btn-primary" v-on:click="postChirp">Chirp</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data()  {
            return {
                chirpTitle: '',
                chirpText: '',
            }
        },
        methods: {
            csrf: function () {
                return this.$store.state.user.csrf_token
            },
            postChirp:  function () {
                let node = {
                    "type": [{"target_id": "chirp"}],
                    "title": [{"value": this.chirpTitle}],
                    "field_chirp_text": [{"value": this.chirpText}],
                };
                console.log(node);
                axios({
                    method: 'post',
                    withCredentials: true,
                    url: "http://chirping.lndo.site/node?_format=json",
                    data: node,
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-Token": this.csrf()
                    },
                }).then(result=>{
                    console.log(result)
                }).catch(error => {
                    alert("error")
                    console.log(error);
                })
            }
        }
    }
</script>

<style scoped>
    /*textarea{
        height: auto;
        overflow: auto;
        width: 100%;
    }*/
</style>