// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

import router from './router'
import { ref } from 'vue'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })

// app.component('DataTable', DataTable)
// app.component('Column', Column)

// 定义全局认证状态
const isAuthenticated = ref(false)
app.provide('isAuthenticated', isAuthenticated) // 使用 provide/inject 共享状态

app.use(router)

app.mount('#app')

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq7TMQ9yWPvGyHZ6fXCjcqwrl3O1MHRw8",
  authDomain: "week9-jiayin-39c5a.firebaseapp.com",
  projectId: "week9-jiayin-39c5a",
  storageBucket: "week9-jiayin-39c5a.appspot.com",
  messagingSenderId: "504251106315",
  appId: "1:504251106315:web:6d7460c109c0a3d598b30e"
};

// Initialize Firebase
initializeApp(firebaseConfig);

