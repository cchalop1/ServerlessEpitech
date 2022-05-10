import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const clientCredentials = {
  apiKey: "AIzaSyD08XRD-gb5ce5LPlf95bGki4mqa0vJCxA",
  authDomain: "serverlessepitech.firebaseapp.com",
  projectId: "serverlessepitech",
  storageBucket: "serverlessepitech.appspot.com",
  messagingSenderId: "152587331784",
  appId: "1:152587331784:web:6052fc859ddfc464895dfd",
};

// Initialize Firebase
const app = initializeApp(clientCredentials);

// Initialize Firebase Authentication and get a reference to the service
export default app;
