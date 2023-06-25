import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdrX69g6mSSdntRP6sXJTYITgdoCjmom4",
  authDomain: "todo-app-cf50b.firebaseapp.com",
  projectId: "todo-app-cf50b",
  storageBucket: "todo-app-cf50b.appspot.com",
  messagingSenderId: "742035740235",
  appId: "1:742035740235:web:c403a6ce5d8b66fedadfce",
  measurementId: "G-TYTSSYW745",
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
export default app;
