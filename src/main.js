import Vue from 'vue'
import Vuelidate from "vuelidate";
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from "./filters/date.filter";
import messagePlugin from "./utils/message.plugin"
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)


firebase.initializeApp({
  apiKey: "AIzaSyDCd5_WU6_aRy4U-bArIIMR57Ku3_ZVQUo",
  authDomain: "test-crm-e3f92.firebaseapp.com",
  databaseURL: "https://test-crm-e3f92.firebaseio.com",
  projectId: "test-crm-e3f92",
  storageBucket: "test-crm-e3f92.appspot.com",
  messagingSenderId: "765488619301",
  appId: "1:765488619301:web:ed287969e71279eac984cc"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


