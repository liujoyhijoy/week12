<template>
    <div class="form-container">
      <h1>Admin Sign In</h1>
      <p><input type="text" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p>
      <p><button @click="signin">Sign in as Admin</button></p>
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
    // check email format
    if (!email.value.endsWith("@admin.gmail.com")) {
      alert("Admin email must end with @admin.gmail.com");
      return;
    }
  
    try {
      const data = await signInWithEmailAndPassword(auth, email.value, password.value);
      console.log("Firebase Admin Sign In Successful!");
  
      // print user 
      console.log(auth.currentUser);
  
      // check from firebase
      const userRef = doc(db, "users", data.user.uid);
      const userDoc = await getDoc(userRef);
  
      if (userDoc.exists() && userDoc.data().role === "admin") {
        console.log("Admin signed in");
        // console.log(auth.currentUser);
        router.push("/admindashboard"); 
      } else {
        alert("You are not authorized as an admin!");
        await auth.signOut();
      }
    } catch (error) {
      console.log(error.code);
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