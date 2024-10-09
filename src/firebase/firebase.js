import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzDz0MQOVDiRS0pLcQs6AB5sZkPKmBBSE",
  authDomain: "admin-dashboard-20cbe.firebaseapp.com",
  projectId: "admin-dashboard-20cbe",
  storageBucket: "admin-dashboard-20cbe.appspot.com",
  messagingSenderId: "115878971407",
  appId: "1:115878971407:web:c9bf1d09bccf146b023b7a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//gooogle auth provider
const gooogleProvider = new GithubAuthProvider();

export { auth, gooogleProvider, db };
