import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCxupN3mXqxaNjc1LAvDbwZ7Z3gML7vPYE",
    authDomain: "randomidee-e6cdc.firebaseapp.com",
    databaseURL: "https://randomidee-e6cdc-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "randomidee-e6cdc",
    storageBucket: "randomidee-e6cdc.appspot.com",
    messagingSenderId: "920175592676",
    appId: "1:920175592676:web:f24b964cbf8ec624fa58f1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };  // On exporte ces 3 éléments
