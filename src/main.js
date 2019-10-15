import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import firebase from "firebase";
Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyD4tLHZvQHHzLam6XD62zyn9PKW7_4o9Mo",
  authDomain: "taller-dependencias.firebaseapp.com",
  databaseURL: "https://taller-dependencias.firebaseio.com",
  projectId: "taller-dependencias",
  storageBucket: "taller-dependencias.appspot.com",
  messagingSenderId: "199689635752",
  appId: "1:199689635752:web:fd6493712b7d232d9cbf9d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
