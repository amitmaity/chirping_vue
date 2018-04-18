import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        login: false,
        user: {},
        chirps: [],
        lastChirpId: 0,
    },
    mutations: {
        setValue:   function (state,value) {
            if (value.hasOwnProperty('login')){
                state.login = value.login;
            }
            if (value.hasOwnProperty('user')){
                state.user = value.user;
            }
            if (value.hasOwnProperty('chirps')){
                state.chirps = value.chirps;
            }
            if (value.hasOwnProperty('lastChirpId')){
                state.lastChirpId = value.lastChirpId;
            }
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
        removeLocalStorageValue:    function (state) {
            localStorage.removeItem("store");
        }
    },
    getters:    {
        isLoggedIn: function (state) {
            return state.login;
        }
    }
})
