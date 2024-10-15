<template>
    <div class="container mt-5">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input type="text" id="username" v-model="username" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" id="password" v-model="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router'
  
  // 管理用户输入和认证状态
  const username = ref('');
  const password = ref('');
  const errorMessage = ref('');
  const isAuthenticated = inject('isAuthenticated'); // 注入全局认证状态
  
  const router = useRouter();
  
  const handleLogin = () => {
  // 简单的硬编码验证
  if (username.value === 'admin' && password.value === 'password') {
    isAuthenticated.value = true; // 更新全局状态
    console.log('Authenticated:', isAuthenticated.value); // 输出当前认证状态
    router.push('/about'); // 成功登录后重定向到 About 页面
  } else {
    errorMessage.value = 'Invalid username or password';
  }
};
  </script>



  
  <style scoped>
  .container {
    max-width: 400px;
  }
  </style>




  