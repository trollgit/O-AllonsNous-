import { auth, db } from "./firebase-config.js";
import { ref, onValue, remove } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Éléments du DOM
const ideasList = document.getElementById('ideas-list');
const totalCounter = document.getElementById('total-ideas');

// Charger les idées
function loadIdeas() {
    const ideasRef = ref(db, 'ideas/');
    
    onValue(ideasRef, (snapshot) => {
        ideasList.innerHTML = ''; // Vide la liste
        const ideas = snapshot.val() || {};
        let count = 0;

        // Parcours toutes les idées
        for (const [id, idea] of Object.entries(ideas)) {
            count++;
            const isOwner = idea.author === auth.currentUser?.uid; // Vérifie si l'utilisateur est l'auteur

            // Crée l'élément HTML
            const listItem = document.createElement('li');
            listItem.className = 'idea-item';
            listItem.innerHTML = `
                <div class="idea-content">
                    <h3>${escapeHtml(idea.title)}</h3>
                    <p>${escapeHtml(idea.description)}</p>
                    <small>${formatDate(idea.createdAt)}</small>
                </div>
                ${isOwner ? `<button class="delete-btn" data-id="${id}">
                    <i class="fas fa-trash"></i>
                </button>` : ''}
            `;
            ideasList.appendChild(listItem);
        }

        // Met à jour le compteur
        totalCounter.textContent = count;

        // Ajoute les événements de suppression
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => deleteIdea(e.target.closest('button').dataset.id));
        });

    }, (error) => {
        console.error("Erreur de chargement :", error);
        alert("Impossible de charger les idées");
    });
}

// Supprimer une idée
function deleteIdea(id) {
    if (!confirm("Supprimer cette idée définitivement ?")) return;
    
    remove(ref(db, `ideas/${id}`))
        .catch(error => {
            console.error("Erreur de suppression :", error);
            alert("Erreur lors de la suppression");
        });
}

// Helper: Échapper le HTML
function escapeHtml(unsafe) {
    return unsafe?.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;") || '';
}

// Helper: Formater la date
function formatDate(timestamp) {
    if (!timestamp) return 'Date inconnue';
    return new Date(timestamp).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Vérifie la connexion
    if (!auth.currentUser) {
        window.location.href = "login.html";
        return;
    }
    loadIdeas();
});
