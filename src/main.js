import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import firebase from "firebase/app";
require("firebase/auth");

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app")

var firebaseConfig = {
    apiKey: "AIzaSyAbynD2aV-eAsxpNHW5lg9cEJPokbLDxKo",
    authDomain: "food-hub-42121.firebaseapp.com",
    databaseURL: "https://food-hub-42121.firebaseio.com",
    projectId: "food-hub-42121",
    storageBucket: "food-hub-42121.appspot.com",
    messagingSenderId: "966735208289",
    appId: "1:966735208289:web:2b5e36db136dbd0b806f20",
    measurementId: "G-LVNZKDKRCB"
};

firebase.initializeApp(firebaseConfig);