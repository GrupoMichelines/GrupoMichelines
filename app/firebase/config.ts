// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getDatabase } from "firebase/database"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbSWQ3fQ3-mZPqIC-e9xjAYuY4gAO97sQ",
  authDomain: "painel-admin-5d49b.firebaseapp.com",
  databaseURL: "https://painel-admin-5d49b-default-rtdb.firebaseio.com",
  projectId: "painel-admin-5d49b",
  storageBucket: "painel-admin-5d49b.appspot.com",
  messagingSenderId: "872159210397",
  appId: "1:872159210397:web:a30ac7dd521a298cbd1d74",
  measurementId: "G-H7R27PF6HG",
}

// Initialize Firebase
// Verificar se já existe uma instância do Firebase inicializada
let app
if (!getApps().length) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApps()[0] // Se já existe, use a primeira instância
}

// Inicializar serviços do Firebase
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
const database = getDatabase(app)

export { auth, db, storage, database }
