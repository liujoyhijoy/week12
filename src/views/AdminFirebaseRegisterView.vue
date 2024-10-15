<template>
    <div class="form-container">
      <h1>Admin Registration</h1>
      <p><input type="text" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p>
      <p><button @click="register">Register as Admin</button></p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  import { doc, setDoc } from "firebase/firestore";
  import db from "../firebase/init";
  
  const email = ref("");
  const password = ref("");
  const router = useRouter();
  const auth = getAuth();
  
  const register = () => {
    // check emil with admin format
    if (!email.value.endsWith("@admin.gmail.com")) {
      alert("Admin email must end with @admin.gmail.com");
      return;
    }
  
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(async (data) => {
        console.log("Firebase Admin Register Successful!");
  
        // save admin to Firestore
        const userRef = doc(db, "users", data.user.uid);
        await setDoc(userRef, { role: "admin", email: email.value });
  
        router.push("/adminfiresignin");
      })
      .catch((error) => {
        console.log(error.code);
      });
  };
  </script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; 
}
</style>
  