import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkpkbKJIz5cPBanf34wTPgqAwUa6UTyVA",
  authDomain: "ai-tax-prep.firebaseapp.com",
  projectId: "ai-tax-prep",
  storageBucket: "ai-tax-prep.firebasestorage.app",
  messagingSenderId: "474155913186",
  appId: "1:474155913186:web:56ba5b1b08e7a197e073bb"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

async function getToken() {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, "chloelee0403@gmail.com", "AITaxPrep");

    const token = await userCredential.user.getIdToken();
    
    console.log("Firebase ID Token:", token);
  } catch (error) {
    console.error("Error fetching ID Token:", error.message);
  }
}

getToken();