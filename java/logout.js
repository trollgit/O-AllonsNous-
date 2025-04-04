import { auth } from "./firebase-config.js";
import { signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

document.getElementById("logout").addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
        window.location.href = "login.html";
    });
});
