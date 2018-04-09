import Vue from 'vue';
import Router from 'vue-router';
import Timeline from '../components/Timeline';
import Login from '../components/Login';
import Logout from '../components/Logout';

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/', component: Timeline},
        {path: '/login', component:  Login},
        {path:  '/logout', component:   Logout}
    ]
});