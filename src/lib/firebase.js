import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAy16r_mgPt39-O5ol2CWShH-Zl_v13OoU",
  authDomain: "loopfire-studio.firebaseapp.com",
  databaseURL: "https://loopfire-studio-default-rtdb.firebaseio.com",
  projectId: "loopfire-studio",
  storageBucket: "loopfire-studio.firebasestorage.app",
  messagingSenderId: "671968406115",
  appId: "1:671968406115:web:d5250c8fb2d43034b26656",
};

const app = initializeApp(firebaseConfig);

// Wichtig: Wir sprechen explizit die Firestore-Datenbank "marketing" an
// (nicht die "(default)"-Datenbank). Das ist der zweite Parameter von getFirestore.
export const db = getFirestore(app, "marketing");
export default app;
