import Vue from 'vue'
import ClientApp from './clientApp.vue'
import VueCookies from 'vue-cookies'

import  '../node_modules/@fortawesome/fontawesome-free/css/all.css'
 
Vue.use(VueCookies)

new Vue({
    el: '#clientApp',
    render: h => h(ClientApp)
});
