import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7kH0PyuL6AhbzX5szPA1m8teP7ibr0tg",
  authDomain: "spaceappsproject.firebaseapp.com",
  projectId: "spaceappsproject",
  storageBucket: "spaceappsproject.appspot.com",
  messagingSenderId: "633291663150",
  appId: "1:633291663150:web:7322607b4e32699b57bcbf",
  measurementId: "G-NEQCP0HV2Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
