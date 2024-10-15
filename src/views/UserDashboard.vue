<template>
    <div class="user-dashboard">
      <h1>Welcome to User Dashboard</h1>
      <p>You are logged in as a user.</p>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script setup>
  import { getAuth, signOut } from "firebase/auth";
  import { onMounted } from "vue";
  import { useRouter } from "vue-router";
  
  const auth = getAuth();
  const router = useRouter();
  
  // print user
  onMounted(() => {
    console.log("Current User: ", auth.currentUser);
  });
  
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out successfully!");
        router.push("/firesignin"); 
      })
      .catch((error) => {
        console.log("Error logging out: ", error);
      });
  };
  </script>
  
  <style>
  .user-dashboard {
    text-align: center;
  }
  </style>
  
  