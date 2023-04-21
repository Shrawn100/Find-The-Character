// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDoc, getFirestore, doc } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS-isgzwpVSTmeISq9t-3x0iDQe0A5a0g",
  authDomain: "phototagging-5a719.firebaseapp.com",
  projectId: "phototagging-5a719",
  storageBucket: "phototagging-5a719.appspot.com",
  messagingSenderId: "706196984767",
  appId: "1:706196984767:web:de874bbcdfdc617da9470a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export async function getAllLocations() {
  const Crash = doc(firestore, "location/Crash");
  const Spyro = doc(firestore, "location/Spyro");

  const crashSnap = await getDoc(Crash);
  const spyroSnap = await getDoc(Spyro);

  const crashData = crashSnap.data();
  const spyroData = spyroSnap.data();

  return {
    Crash: [crashData.X, crashData.Y],
    Spyro: [spyroData.X, spyroData.Y],
  };
}
export async function ashLocation() {
  const Ash = doc(firestore, "location/Ash");
  const ashSnap = await getDoc(Ash);
  const ashData = ashSnap.data();
  return [ashData.X, ashData.Y];
}
export async function spyroLocation() {
  const Spyro = doc(firestore, "location/Spyro");
  const spyroSnap = await getDoc(Spyro);
  const spyroData = spyroSnap.data();
  return [spyroData.X, spyroData.Y];
}

export async function crashLocation() {
  const Crash = doc(firestore, "location/Crash");
  const crashSnap = await getDoc(Crash);
  const crashData = crashSnap.data();
  return [crashData.X, crashData.Y];
}