import Vue from 'vue'
import App from './App.vue'
//import VueRouter from 'vue-router'
import router from './router'
import {store} from './store/store'

/*Vue.use(VueRouter);

const router = new VueRouter({
    routes: Routes
});*/


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
