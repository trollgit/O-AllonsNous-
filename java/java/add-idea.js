import { auth, db } from "./firebase-config.js";
import { ref, push } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

document.getElementById('add-idea-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('idea-title').value;
    const description = document.getElementById('idea-description').value;

    try {
        // Ajoute l'idée avec l'UID de l'utilisateur
        await push(ref(db, 'ideas/'), {
            title: title,
            description: description,
            createdAt: Date.now(),
            author: auth.currentUser.uid  // Stocke l'identifiant de l'auteur
        });
        
        // Affiche la confirmation
        document.getElementById('confirmation-message').style.display = 'block';
        e.target.reset();
        
        // Cache le message après 3s
        setTimeout(() => {
            document.getElementById('confirmation-message').style.display = 'none';
        }, 3000);
        
    } catch (error) {
        console.error("Erreur Firebase :", error);
        alert("Erreur : Vérifiez votre connexion et réessayez.");
    }
});
