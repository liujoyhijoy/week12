<template>
    <div class="admin-dashboard">
      <h1>Welcome to Admin Dashboard</h1>
      <p>You are logged in as an admin.</p>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script setup>
  import { getAuth, signOut } from "firebase/auth";
  import { useRouter } from "vue-router";
  import { onMounted } from "vue";
  
  const auth = getAuth();
  const router = useRouter();

   // print admin
   onMounted(() => {
    console.log("Current Admin: ", auth.currentUser);
  });
  
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("Admin logged out successfully!");
        router.push("/adminfiresignin"); 
      })
      .catch((error) => {
        console.log("Error logging out: ", error);
      });
  };
  </script>
  
  <style>
  .admin-dashboard {
    text-align: center;
  }
  </style>
  
  
  <style>
  .admin-dashboard {
    text-align: center;
  }
  </style>
  
  