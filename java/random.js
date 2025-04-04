import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (!user) window.location.href = "login.html";  // Redirige si non connecté
});

// Importation des modules Firebase v9
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCxupN3mXqxaNjc1LAvDbL7Z3gML7vPYE",
    authDomain: "randomidee-e6cdc.firebaseapp.com",
    databaseURL: "https://randomidee-e6cdc-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "randomidee-e6cdc",
    storageBucket: "randomidee-e6cdc.appspot.com",
    messagingSenderId: "920175592676",
    appId: "1:920175592676:web:f24b964cbf8ec624fa58f1"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Sélectionner les éléments du DOM
const randomButton = document.getElementById('draw-button');
const randomIdeaContainer = document.getElementById('random-idea');
const totalIdeas = document.getElementById('total-ideas');

// Fonction pour tirer une idée au sort
async function drawRandomIdea() {
    try {
        const ideasRef = ref(db, 'ideas/');
        const snapshot = await get(ideasRef);
        const ideas = snapshot.val();
        let ideasArray = [];

        if (ideas) {
            Object.entries(ideas).forEach(([key, idea]) => {
                ideasArray.push({ id: key, ...idea });
            });
        }

        if (randomIdeaContainer) {
            if (ideasArray.length > 0) {
                const randomIndex = Math.floor(Math.random() * ideasArray.length);
                const randomIdea = ideasArray[randomIndex];
                randomIdeaContainer.innerHTML = `
                    <strong>${randomIdea.title}</strong>
                    <p>${randomIdea.description}</p>
                `;
            } else {
                randomIdeaContainer.innerHTML = `<p>Aucune idée disponible.</p>`;
            }
        }

        if (totalIdeas) {
            totalIdeas.textContent = ideasArray.length;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des idées :", error);
    }
}

// Attacher l'événement au bouton
randomButton.addEventListener('click', drawRandomIdea);

// Gestionnaire de déconnexion
document.getElementById("logout").addEventListener("click", (e) => {
    e.preventDefault();
    signOut(getAuth()).then(() => {
        window.location.href = "login.html"; // Redirige vers la page de connexion
    });
});
