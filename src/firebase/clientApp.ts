import { FirebaseOptions, initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

let clientCredentials: FirebaseOptions = {
  apiKey: "AIzaSyD08XRD-gb5ce5LPlf95bGki4mqa0vJCxA",
  authDomain: "serverlessepitech.firebaseapp.com",
  projectId: "serverlessepitech",
  storageBucket: "serverlessepitech.appspot.com",
  messagingSenderId: "152587331784",
  appId: "1:152587331784:web:6052fc859ddfc464895dfd",
};

// Initialize Firebase
const app = initializeApp(clientCredentials);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// const emulatorConfig: EmulatorConfig = {
//   host: "localhost",
//   port: 4500,
//   options: { disableWarnings: false },
//   protocol: "http",
// };

// if (location.hostname == "localhost") {
//   auth.emulatorConfig(emulatorConfig);
// }

// Initialize Firebase Authentication and get a reference to the service
export default app;
