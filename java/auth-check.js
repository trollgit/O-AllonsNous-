import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Redirige vers login.html si non connecté
onAuthStateChanged(auth, (user) => {
    if (!user) window.location.href = "login.html";
});
