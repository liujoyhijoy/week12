<template>
  <div class="form-container">
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Save to Firebase</button></p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Firebase Register Successful!");
      router.push("/firesignin");
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



<!-- <template>
    <div class="form-container">
      <h1>User Registration</h1>
      <p><input type="text" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p>
      <p><button @click="register">Register as User</button></p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  import { doc, setDoc } from "firebase/firestore"; // To add user role
  import db from "../firebase/init"; // Firestore initialization
  
  const email = ref("");
  const password = ref("");
  const router = useRouter();
  const auth = getAuth();
  
  const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(async (data) => {
        console.log("Firebase User Register Successful!");
  
        // After registration, store the role in Firestore
        const userRef = doc(db, "users", data.user.uid);
        await setDoc(userRef, { role: "user", email: email.value });
  
        router.push("/firesignin");
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
  </style> -->
  

