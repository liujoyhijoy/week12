import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';

import LoginView from '../views/LoginView.vue';
import AccessDenied from '../views/AccessDenied.vue';

import { ref } from 'vue'
const isAuthenticated = ref(false); 

import { inject } from 'vue'; 
import FirebaseSigninView from '@/views/FirebaseSigninView.vue';
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue';
import AddBookView from '@/views/AddBookView.vue';
import AdminFirebaseSigninView from '@/views/AdminFirebaseSigninView.vue';
import AdminFirebaseRegisterView from '@/views/AdminFirebaseRegisterView.vue';
import AdminDashboardView from '@/views/AdminDashboardView.vue';
import UserDashboard from '@/views/UserDashboard.vue';
import GetBookCountView from '@/views/GetBookCountView.vue';
import WeatherView from '@/views/WeatherView.vue';
import CountBookAPI from '@/views/CountBookAPI.vue';
import SearchWeatherView from '@/views/SearchWeatherView.vue';
import GetAllBookAPI from '@/views/GetAllBookAPI.vue';



const routes = [
  {
    path: '/login',  
    name: 'Login',
    component: LoginView
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true } 
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDenied
  },
  {
    path: '/firesignin',
    name: 'firesignin',
    component:  FirebaseSigninView
  },
  {
    path: '/fireregister',
    name: 'fireregister',
    component:  FirebaseRegisterView
  },
  {
    path: '/userdashboard',
    name: 'faddbookuserdashboard',
    component:  UserDashboard
  },
  {
    path: '/adminfiresignin',
    name: 'adminfiresignin',
    component:  AdminFirebaseSigninView
  },
  {
    path: '/adminfireregister',
    name: 'adminfireregister',
    component:  AdminFirebaseRegisterView
  },
  {
    path: '/admindashboard',
    name: 'admindashboard',
    component:  AdminDashboardView
  },
  {
    path: '/addbook',
    name: 'faddbook',
    component:  AddBookView
  },
  {
    path: '/getbookcount',
    name: 'GetBookCount',
    component:  GetBookCountView
  },
  {
    path: '/weather',
    name: 'WeatherView',
    component:  WeatherView
  },
  {
    path: '/countbookapi',
    name: 'CountBookView',
    component:  CountBookAPI
  },
  {
    path: '/searchweather',
    name: 'SearchWeatherView',
    component:  SearchWeatherView
  },
  {
    path: '/getallbookapi',
    name: 'GetAllBookAPI',
    component:  GetAllBookAPI
  },

];

const router = createRouter({
    history: createWebHistory(),
    routes
  });
  

/// 导航守卫
router.beforeEach((to, from, next) => {
    const isAuthenticated = inject('isAuthenticated'); // 使用 inject 引入共享状态
  
    console.log('Navigating from:', from.path, 'to:', to.path, 'Authenticated:', isAuthenticated.value);
  
    if (to.meta.requiresAuth && !isAuthenticated.value) {
      next('/access-denied'); // 如果用户未认证且尝试访问受限制页面
    } else if (to.path === '/' && isAuthenticated.value) {
      next('/weather'); // 如果用户已认证并试图访问登录页
    } else {
      next(); // 继续导航
    }
  });

export default router;