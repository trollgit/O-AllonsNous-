import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const auth = getAuth();

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => window.location.href = "main.html")  // Redirige si succès
        .catch(() => alert("Accès refusé"));  // Message générique
});
// Gestionnaire de déconnexion
document.getElementById("logout").addEventListener("click", (e) => {
    e.preventDefault();
    signOut(getAuth()).then(() => {
        window.location.href = "login.html"; // Redirige vers la page de connexion
    });
});
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { app } from "./firebase-config.js";  // ✅ Assurez-vous que Firebase est initialisé

const auth = getAuth(app);  // Utilisez votre instance Firebase
