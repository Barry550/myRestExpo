import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5qyR5Yd6Wp7E21bxQb3BGrp2bwZK86MM",
  authDomain: "boutique-restaurant.firebaseapp.com",
  databaseURL: "https://boutique-restaurant.firebaseio.com",
  projectId: "boutique-restaurant",
  storageBucket: "boutique-restaurant.appspot.com",
  messagingSenderId: "693443572046",
  appId: "1:693443572046:web:0387c52d42daa40a316e1f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};