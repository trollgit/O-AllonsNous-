import { auth, db } from "./firebase-config.js";
import { ref, onValue, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Éléments du DOM
const drawButton = document.getElementById('draw-button');
const randomIdeaContainer = document.getElementById('random-idea');
const totalCounter = document.getElementById('total-ideas');
let ideasCache = [];

// Charger le cache d'idées
function loadIdeasCache() {
    const ideasRef = ref(db, 'ideas/');
    
    onValue(ideasRef, (snapshot) => {
        ideasCache = [];
        const ideas = snapshot.val() || {};
        
        for (const [id, idea] of Object.entries(ideas)) {
            ideasCache.push({
                id: id,
                title: idea.title,
                description: idea.description
            });
        }
        
        totalCounter.textContent = ideasCache.length;
        updateButtonState();
    });
}

// Tirer une idée aléatoire
function drawRandomIdea() {
    if (ideasCache.length === 0) {
        randomIdeaContainer.innerHTML = `
            <p class="error-msg">Aucune idée disponible</p>
            <a href="adideas.html" class="cta-button-small">
                <i class="fas fa-plus"></i> Ajouter une idée
            </a>
        `;
        return;
    }

    const randomIndex = Math.floor(Math.random() * ideasCache.length);
    const selectedIdea = ideasCache[randomIndex];
    
    randomIdeaContainer.innerHTML = `
        <div class="idea-header">
            <h3>${escapeHtml(selectedIdea.title)}</h3>
        </div>
        <div class="idea-body">
            <p>${escapeHtml(selectedIdea.description)}</p>
        </div>
        <div class="idea-actions">
            <button id="draw-again" class="cta-button-small">
                <i class="fas fa-sync-alt"></i> Re-tirer
            </button>
        </div>
    `;

    // Gestion du re-tirage
    document.getElementById('draw-again').addEventListener('click', drawRandomIdea);
}

// Helper: Échappement HTML
function escapeHtml(unsafe) {
    return unsafe?.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;") || '';
}

// Désactive le bouton si aucune idée
function updateButtonState() {
    drawButton.disabled = ideasCache.length === 0;
    if (ideasCache.length === 0) {
        drawButton.innerHTML = '<i class="fas fa-exclamation-circle"></i> Aucune idée';
    } else {
        drawButton.innerHTML = '<i class="fas fa-random"></i> Tirer une idée';
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    if (!auth.currentUser) {
        window.location.href = "login.html";
        return;
    }
    
    loadIdeasCache();
    drawButton.addEventListener('click', drawRandomIdea);
});
