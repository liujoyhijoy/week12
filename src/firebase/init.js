// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq7TMQ9yWPvGyHZ6fXCjcqwrl3O1MHRw8",
  authDomain: "week9-jiayin-39c5a.firebaseapp.com",
  projectId: "week9-jiayin-39c5a",
  storageBucket: "week9-jiayin-39c5a.appspot.com",
  messagingSenderId: "504251106315",
  appId: "1:504251106315:web:6d7460c109c0a3d598b30e"
};

initializeApp(firebaseConfig);

const db = getFirestore();
export default db