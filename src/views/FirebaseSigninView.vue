<template>
    <div class="form-container">
      <h1>User Sign In</h1>
      <p><input type="text" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p>
      <p><button @click="signin">Sign in as User</button></p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  import { doc, getDoc } from "firebase/firestore";
  import db from "../firebase/init";
  
  const email = ref("");
  const password = ref("");
  const router = useRouter();
  const auth = getAuth();
  
  const signin = async () => {
    try {
      const data = await signInWithEmailAndPassword(auth, email.value, password.value);
  
  
      // check from Firestore
      const userRef = doc(db, "users", data.user.uid);
      const userDoc = await getDoc(userRef);
  
      if (userDoc.exists() && userDoc.data().role === "user") {
        console.log("Firebase User Sign In Successful!");
        // console.log(auth.currentUser); 
        router.push("/userdashboard"); 
      } else {
        alert("You are not authorized as a user!");
        await auth.signOut(); 
      }
    } catch (error) {
      console.log("Error code: ", error.code);
      console.log("Error message: ", error.message);
    }
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
    <h1>Sign in</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="signin">Sign in via Firebase</button></p>
  </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  
  const email = ref("");
  const password = ref("");
  const router = useRouter();
  const auth = getAuth();
  
  const signin = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((data) => {
        console.log("Firebase Sign In Successful!");
        router.push("/");
        console.log(auth.currentUser); // To check the current user signed in
      })
      .catch((error) => {
        console.log(error.code);
      });
  };
  </script> -->

     <!-- <template>
  <div class="form-container">
    <h1>Sign in</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="signin">Sign in via Firebase</button></p>
  </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  
  const email = ref("");
  const password = ref("");
  const router = useRouter();
  const auth = getAuth();
  
  const signin = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((data) => {
        console.log("Firebase Sign In Successful!");
        router.push("/");
        console.log(auth.currentUser); // To check the current user signed in
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