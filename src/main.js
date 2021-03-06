import Vue from 'vue'
import Vuelidate from "vuelidate";
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from "./filters/date.filter";
import currencyFilter from "./filters/currencyFilter";
import localizeFilter from "./filters/localize.filter";
import tooltipDirective from "./directives/tooltip.directive"
import messagePlugin from "./utils/message.plugin"
import Loader from "./components/app/Loader"
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('paginate', Paginate)


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


