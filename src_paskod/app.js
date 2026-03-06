const barsContainer = document.getElementById('bars-container');
const generateBtn = document.getElementById('generate-btn');
const sortBtn = document.getElementById('sort-btn');

let array = [];
const ARRAY_SIZE = 25;

function generateArray() {
    array = [];
    barsContainer.innerHTML = '';
    
    // L'injection de valeurs aléatoires force l'algorithme à traiter une distribution de données imprévisible, prouvant ainsi la fiabilité du tri peu importe le contexte.
    for (let i = 0; i < ARRAY_SIZE; i++) {
        const value = Math.floor(Math.random() * 350) + 20;
        array.push(value);
        
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value}px`;
        barsContainer.appendChild(bar);
    }
}

// L'encapsulation de setTimeout dans une Promise est fondamentale ici. Elle contraint le moteur JavaScript (qui est synchrone par nature) à céder brièvement le contrôle, laissant le temps à l'API de rendu du navigateur de dessiner l'animation des barres.
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function visualBubbleSort() {
    const bars = document.querySelectorAll('.bar');
    let n = array.length;
    let swapped;
    
    // La désactivation des contrôles prévient les interactions concurrentes de l'utilisateur qui corrompraient l'état du tableau en pleine exécution.
    generateBtn.disabled = true;
    sortBtn.disabled = true;

    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            // L'ajout de classes CSS transitoires traduit visuellement l'opération de comparaison en cours pour la compréhension de l'utilisateur.
            bars[i].classList.add('active');
            bars[i + 1].classList.add('active');
            
            await sleep(60);

            if (array[i] > array[i + 1]) {
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                
                bars[i].style.height = `${array[i]}px`;
                bars[i + 1].style.height = `${array[i + 1]}px`;
                swapped = true;
            }
            
            bars[i].classList.remove('active');
            bars[i + 1].classList.remove('active');
        }
        // L'élément ciblé par n-1 a achevé sa migration vers la droite, il reçoit une classe distincte car sa position mathématique est confirmée.
        bars[n - 1].classList.add('sorted');
        n--;
    } while (swapped);

    // Un filet de sécurité visuel pour s'assurer que les premiers éléments du tableau, qui n'auraient pas été touchés par la dernière boucle interne, affichent bien l'état validé.
    for(let i = 0; i < bars.length; i++) {
        bars[i].classList.add('sorted');
    }

    generateBtn.disabled = false;
    sortBtn.disabled = false;
}

generateBtn.addEventListener('click', generateArray);
sortBtn.addEventListener('click', visualBubbleSort);

generateArray();