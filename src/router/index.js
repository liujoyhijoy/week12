import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';

import LoginView from '../views/LoginView.vue';
import AccessDenied from '../views/AccessDenied.vue';

import { ref } from 'vue'
const isAuthenticated = ref(false); // 全局认证状态

import { inject } from 'vue'; // 添加 inject 函数



const routes = [
  {
    path: '/',  // 设置根路径显示 LoginView
    name: 'Login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true } // 标记需要认证的路由
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDenied
  }
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
      next('/access-denied'); // 如果用户未认证且尝试访问受限制页面，则重定向到 AccessDenied 页面
    } else if (to.path === '/' && isAuthenticated.value) {
      next('/about'); // 如果用户已认证并试图访问登录页，重定向到 About
    } else {
      next(); // 继续导航
    }
  });

export default router;