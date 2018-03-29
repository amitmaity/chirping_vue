import Vue from 'vue'
import App from './App.vue'

//Filters
Vue.filter('to-uppercase', function (value) {
   return value.toUpperCase();
});
new Vue({
  el: '#app',
  render: h => h(App)
})
