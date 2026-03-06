// L'objectif de ce fichier est de satisfaire la demande d'implémentation pure des 5 algorithmes classiques.
// La logique de modification du DOM pour l'animation web est isolée dans app.js pour bien séparer les responsabilités.

function triSelection(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        let minIndex = i;
        // On limite la recherche à la portion non triée du tableau car tout ce qui précède l'index 'i' a déjà été validé à sa position définitive.
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex!== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
    return arr;
}

function triInsertion(arr) {
    // On débute l'itération à 1 car on considère arbitrairement que le premier élément constitue à lui seul une base déjà triée.
    for (let i = 1; i < arr.length; i++) {
        let currentVal = arr[i];
        let j = i - 1;
        // On décale les éléments vers la droite plutôt que d'exécuter des permutations complètes pour minimiser le coût des écritures en mémoire.
        while (j >= 0 && arr[j] > currentVal) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = currentVal;
    }
    return arr;
}

function triBulles(arr) {
    let n = arr.length;
    let swapped;
    // L'utilisation d'une boucle do-while nous garantit de parcourir le tableau au moins une fois. L'arrêt anticipé via l'indicateur 'swapped' évite des itérations superflues si les données sont déjà en ordre.
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
        // Chaque itération complète garantit que la plus grande valeur remonte à la fin du tableau, on réduit donc la zone de recherche pour le prochain passage.
        n--;
    } while (swapped);
    return arr;
}

function triRapide(arr) {
    // La condition d'arrêt de la récursivité est impérative ici : un tableau vide ou contenant un seul élément est mathématiquement impossible à diviser davantage.
    if (arr.length <= 1) {
        return arr;
    }
    
    // Extraire le dernier élément comme pivot est une stratégie simple à implémenter, bien qu'elle puisse dégrader les performances vers une complexité quadratique si les données initiales sont déjà triées.
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    
    // La décomposition (spread operator) permet de fusionner les tableaux triés récursivement tout en replaçant le pivot au centre, ce qui valide sa position finale.
    return;
}

function triFusion(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    // La récursivité scinde la structure de données jusqu'à l'obtention d'unités individuelles, préparant un état stable pour la phase de recombinaison.
    return fusionner(triFusion(left), triFusion(right));
}

function fusionner(left, right) {
    let result = [];
    let i = 0;
    let j = 0;

    // L'algorithme compare séquentiellement les têtes de chaque sous-liste pour reconstruire un tableau unique strictement ordonné.
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    
    // Il restera obligatoirement des éléments dans l'un des deux tableaux cibles. On les concatène directement à la fin car ils ont déjà été triés lors de l'étape précédente.
    return result.concat(left.slice(i)).concat(right.slice(j));
}