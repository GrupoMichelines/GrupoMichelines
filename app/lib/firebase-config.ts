import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyBGoe-hQNhMzBDQj1xoO38vHQobZa6oh6I",
  authDomain: "grupo-michelines.firebaseapp.com",
  projectId: "grupo-michelines",
  storageBucket: "grupo-michelines.firebasestorage.app",
  messagingSenderId: "1045846661230",
  appId: "1:1045846661230:web:2f3518786082a382362e7f",
  measurementId: "G-L0L4HTH44B"
}

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]
export const db = getFirestore(app)

// Initialize Analytics only on client side
let analytics
if (typeof window !== "undefined") {
  analytics = getAnalytics(app)
}
export { analytics } 