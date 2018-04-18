import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store/store'
import infiniteScroll from 'vue-infinite-scroll'
export const eventBus = new Vue();

Vue.use(infiniteScroll);

//Filters
Vue.filter('to-uppercase', function (value) {
    return value.toUpperCase();
});
new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store: store,
    beforeMount() {
        this.$store.commit('getLocalStorageValue')
    }
});
