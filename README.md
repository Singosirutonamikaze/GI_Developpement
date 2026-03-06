# Visualiseur d'Algorithmes de Tri

Soumission individuelle dans le cadre du projet de développement logiciel de groupe.

---

## Technologies

- Vanilla JavaScript (ES6+)
- HTML5
- CSS3

Aucune dépendance externe. Aucun gestionnaire de paquets requis.

---

## Utilisation

1. Cloner le dépôt sur votre machine.
2. Ouvrir le dossier du projet.
3. Ouvrir le fichier `index.html` directement dans un navigateur.

Aucun serveur local n'est nécessaire.

---

## Architecture

### Structure des fichiers

```
/
├── index.html
└── src_paskod/
    ├── algorithmes.js
    ├── app.js
    └── style.css
```

### Pourquoi l'asynchronisme dans `app.js`

JavaScript s'exécute sur un fil unique (Main Thread). Sans asynchronisme, une boucle de tri s'exécute du début à la fin sans interruption. Le DOM ne peut pas se mettre à jour pendant ce temps. Le résultat : l'animation ne s'affiche pas étape par étape, elle saute directement à l'état final.

Pour corriger ce comportement, chaque étape de tri appelle une promesse construite autour de `setTimeout(resolve, délai)`. Le mot-clé `await` suspend l'exécution de la fonction de tri jusqu'à ce que la promesse soit résolue. Cette suspension libère temporairement le Main Thread. Le moteur de rendu du navigateur en profite pour repeindre le DOM et afficher l'état courant du tableau. L'algorithme reprend ensuite à l'étape suivante.

C'est le seul moyen de produire une animation fluide sans recourir à un Web Worker ou à une bibliothèque tierce.

---

## Algorithmes

| Algorithme | Complexité temporelle (pire cas) | Complexité spatiale |
|---|---|---|
| Tri à bulles | O(n^2) | O(1) |
| Tri par sélection | O(n^2) | O(1) |
| Tri par insertion | O(n^2) | O(1) |
| Tri rapide | O(n^2) | O(log n) |
| Tri fusion | O(n log n) | O(n) |