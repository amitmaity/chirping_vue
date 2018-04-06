import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        login: false,
        user: {}
    },
    mutations: {
        setValue:   function (state,value) {
            state.login = value.login;
            state.user = value.user;
        },
        setLocalStorageValue: function (state) {
            localStorage.setItem('store', JSON.stringify(state));
        },
        getLocalStorageValue: function (state) {
            if(localStorage.getItem('store')) {
                this.replaceState(
                    Object.assign(state, JSON.parse(localStorage.getItem('store')))
                );
            }
        },
    }
})
