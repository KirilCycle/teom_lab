<template>
  <div class="wrap">
    <router-view></router-view>
  </div>
</template>

<script setup>
import router, { routes } from "./router/router";
import store from "./store/store";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// v9 compat packages are API compatible with v8 code
import firebase from "firebase/compat/app";
import { doc, getDoc } from "firebase/firestore";
import "firebase/compat/auth";
// import { ref } from "firebase/storage";
import { ref, set } from "firebase/database";
import { useDark } from "@vueuse/core";

import "firebase/compat/firestore";

import { initializeAuth, browserLocalPersistence } from "firebase/auth";
import { onMounted } from "vue";
import { getFirestore } from "firebase/firestore";

import { setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// setTimeout(() => {
//  document.documentElement.classList.add('dark');
// },8000)

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvHKL-VuejWaJoRvmhOPOvIeOpSk0frOA",
  authDomain: "vue-chat-dd5cd.firebaseapp.com",
  projectId: "vue-chat-dd5cd",
  storageBucket: "vue-chat-dd5cd.appspot.com",
  messagingSenderId: "261289183633",
  appId: "1:261289183633:web:a4ec3e3621cf0deecf7230",
  measurementId: "G-FCV2NMR8XK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
  // No popupRedirectResolver defined
});

const db = getFirestore(app);

const firestore = firebase.firestore();

const storage = getStorage(app);

onMounted(() => {
  store.commit("user/setFirestore", firestore);
  store.commit("user/setStorage", storage);
  store.commit("user/setCustomStorageRef", ref);

  if ( window.localStorage.getItem('theme')) {
    console.log(window.localStorage.getItem('theme'));
    document.documentElement.classList.add('dark');
  } 
  // console.log(auth.currentUser,store.state.user.isAuth, 'APPP')
});

store.commit("user/setFireBase", firebase);

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

window.addEventListener("resize", () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
</script>

<style lang="scss">
@import "@/styles/colors.scss";

.profile {
  position: absolute;
  top: 0%;
  right: 0%;
}

.bloor {
  position: fixed;
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  background-color: #15151500;
  width: 100%;
  height: 100%;
  display: flex;
}
.profile-container-hidden {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  min-width: 500px;
  transform: translateX(-100%);
  background-color: rgba(0, 0, 0, 0);
}
.profile-container {
  min-width: 500px;
  transform: translateX(0%);
  background-color: black;
}

p {
  margin: 0px;
}

.wrap {
  padding: 0px;
  border: 0px;
  margin: 0px;
}
* {
  margin: 0px;
  bottom: 0px;
  padding: 0px;
}
input {
  outline: none;
  border: none;
  background-image: none;
  background-color: transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

*:focus {
  outline: none;
}

textarea:focus,
input:focus {
  outline: none;
}

button {
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;

  background: transparent;
  /* inherit font & color from ancestor */
  color: inherit;
  font: inherit;
  /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */
  line-height: normal;

  /* Corrects font smoothing for webkit */
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;

  /* Corrects inability to style clickable `input` types in iOS */
  -webkit-appearance: none;
}

.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
}

#app {
  padding: 0px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}

body {
  background-color: $body-color;
  overflow-anchor: none;
  min-height: 100vh;
  /* mobile viewport bug fix */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: -webkit-fill-available;
}

.dark body {
  transition: background-color 0.5s ease;
  background-color: $body-color-l;
}

html,
body {
  -webkit-overflow-scrolling: touch !important;
  overflow: auto !important;
}
</style>
