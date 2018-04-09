import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store/store'


//Filters
Vue.filter('to-uppercase', function (value) {
    return value.toUpperCase();
});
new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store: store,
    mounted() {
        this.$store.commit('getLocalStorageValue')
    }
});
