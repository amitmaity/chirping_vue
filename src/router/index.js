import Vue from 'vue';
import Router from 'vue-router';
import Timeline from '../components/Timeline';
import Login from '../components/Login';
import Logout from '../components/Logout';
import {store} from '../store/store';
Vue.use(Router);

export default new Router({
    routes: [
        {path: '/', component: Timeline, beforeEnter(to,from,next){
            if (!store.getters.isLoggedIn){
                next('/login')
            }
            else {
                next();
            }
            }},
        {path: '/login', component: Login},
        {path: '/logout', component: Logout}
    ]
});