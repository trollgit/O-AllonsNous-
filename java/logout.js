import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

document.getElementById("logout").addEventListener("click", (e) => {
    e.preventDefault();
    signOut(getAuth()).then(() => {
        window.location.href = "login.html";
    });
});
