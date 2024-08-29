  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
<!-- <template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home (Week 5)</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
      </ul>
    </header>
  </div>
</template> -->

<template>
  <div class="container">
    <header class="py-3">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Library</a>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <!-- 只有在用户认证时显示 About 链接 -->
              <li class="nav-item">
                <router-link to="/about" class="nav-link" active-class="active">AboutPage</router-link>
              </li>
            </ul>
            <ul class="navbar-nav">
              <!-- 登录按钮，当用户未认证时显示 -->
              <li class="nav-item" v-if="!isAuthenticated">
                <router-link to="/" class="nav-link" active-class="active">Login</router-link>
              </li>
              <!-- 登出按钮，当用户认证时显示 -->
              <li class="nav-item" v-if="isAuthenticated">
                <button @click="logout" class="nav-link btn btn-link">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const isAuthenticated = inject('isAuthenticated'); // 正确使用 inject
const router = useRouter();

// 在组件加载时输出当前的 isAuthenticated 状态
console.log('Header loaded, isAuthenticated:', isAuthenticated.value);

const logout = () => {
  isAuthenticated.value = false; // 更新全局状态
  router.push('/'); // 重定向到登录页面
};
</script>





<style>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>
