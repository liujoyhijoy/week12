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
