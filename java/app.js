import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (!user) window.location.href = "login.html";  // Redirige si non connecté
});

// Importation des modules Firebase v9
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCxupN3mXqxaNjc1LAvDbwZ7Z3gML7vPYE",
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
const totalIdeas = document.getElementById('total-ideas');
const ideasList = document.getElementById('ideas-list');

// Fonction pour charger les idées depuis Firebase
function loadIdeas() {
    const ideasRef = ref(db, 'ideas/');
    onValue(ideasRef, (snapshot) => {
        const ideas = snapshot.val();
        ideasList.innerHTML = ''; // Vider la liste
        let count = 0;

        if (ideas) {
            Object.entries(ideas).forEach(([key, idea]) => {
                const listItem = document.createElement('li');
                listItem.classList.add('idea-item');
                listItem.innerHTML = `
                    <strong>${idea.title}</strong>
                    <p>${idea.description}</p>
                    <button class="delete-button" onclick="deleteIdea('${key}')">Supprimer</button>
                `;
                ideasList.appendChild(listItem);
                count++;
            });
        }
        totalIdeas.textContent = count; // Mettre à jour le compteur
    }, (error) => {
        console.error("Erreur lors de la récupération des données :", error);
    });
}

// Fonction pour supprimer une idée
function deleteIdea(ideaId) {
    if (!confirm("Voulez-vous vraiment supprimer cette idée ?")) return;

    const ideaRef = ref(db, `ideas/${ideaId}`);
    remove(ideaRef)
        .then(() => console.log("Idée supprimée avec succès"))
        .catch((error) => console.error("Erreur lors de la suppression de l'idée :", error));
}

// Charger les idées au démarrage
loadIdeas();

// Attacher `deleteIdea` à l'objet global pour qu'il soit accessible
window.deleteIdea = deleteIdea;

// Gestionnaire de déconnexion
document.getElementById("logout").addEventListener("click", (e) => {
    e.preventDefault();
    signOut(getAuth()).then(() => {
        window.location.href = "login.html"; // Redirige vers la page de connexion
    });
});
