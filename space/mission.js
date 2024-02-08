//  récupérer les données depuis l'API SWAPI
async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}

// récupérer toutes les planètes
async function getAllPlanets() {
    const allPlanets = [];
    let nextPage = 'https://swapi.dev/api/planets/';
    while (nextPage) {
        const planetsData = await fetchData(nextPage);
        allPlanets.push(...planetsData.results);
        nextPage = planetsData.next;
    }
    return allPlanets;
}

// afficher les planètes
function displayPlanets(planets, title) {
    const planetsListElement = document.getElementById('planetsList');
    planetsListElement.innerHTML = `<h2>${title}</h2>`;
    const ul = document.createElement('ul');
    planets.forEach(planet => {
        const li = document.createElement('li');
        li.textContent = planet.name;
        li.addEventListener('click', function() {
            displayPlanetDetails(planet);
        });
        ul.appendChild(li);
    });
    planetsListElement.appendChild(ul);
}

// afficher les détails d'une planète
function displayPlanetDetails(planet) {
    const planetsListElement = document.getElementById('planetsList');
    planetsListElement.innerHTML = `<h2>Détails de la planète : ${planet.name}</h2>`;
    const ul = document.createElement('ul');
    for (const property in planet) {
        if (planet.hasOwnProperty(property)) {
            const li = document.createElement('li');
            li.textContent = `${property}: ${planet[property]}`;
            ul.appendChild(li);
        }
    }
    planetsListElement.appendChild(ul);
}

//afficher toutes les planètes 
async function displayAllPlanets() {
    try {
        const allPlanets = await getAllPlanets();
        displayPlanets(allPlanets, 'Liste des Planètes');
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
}

// rechercher une planète
async function searchPlanet(query) {
    try {
        const allPlanets = await getAllPlanets();
        const filteredPlanets = allPlanets.filter(planet => planet.name.toLowerCase().includes(query.toLowerCase()));
        displayPlanets(filteredPlanets, 'Résultats de la Recherche');
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
}

//récupérer les planètes et remplir les options de sélection de terrain
async function fetchPlanets() {
    try {
        const response = await fetch('https://swapi.dev/api/planets/');
        const data = await response.json();
        const planets = data.results;

        const selectElements = document.querySelectorAll('.terrainSelect');
        selectElements.forEach(selectElement => {
            const terrainSet = new Set();
            planets.forEach(planet => {
                planet.terrain.split(',').forEach(terrain => {
                    terrainSet.add(terrain.trim());
                });
            });

            terrainSet.forEach(terrain => {
                const option = document.createElement('option');
                option.textContent = terrain;
                selectElement.appendChild(option);
            });

            // Ajout d'un gestionnaire d'événements pour actualiser la recherche lorsque l'option de terrain est modifiée
            selectElement.addEventListener('change', async function() {
                const selectedTerrain = selectElement.value;
                if (selectedTerrain) {
                    try {
                        const allPlanets = await getAllPlanets();
                        const filteredPlanets = allPlanets.filter(planet => planet.terrain.toLowerCase().includes(selectedTerrain.toLowerCase()));
                        displayPlanets(filteredPlanets, `Planètes avec Terrain "${selectedTerrain}"`);
                    } catch (error) {
                        console.error('Une erreur s\'est produite :', error);
                    }
                } else {
                    displayAllPlanets();
                }
            });
        });
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
}

// Appels des fonctions au chargement de la page merci chat gpt rien ne fonctiones sans cette commande 
window.onload = () => {
    displayAllPlanets();
    fetchPlanets();
};

// Gestionnaire d'événements pour le formulaire de recherche
document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput) {
        searchPlanet(searchInput);
    } else {
        displayAllPlanets();
    }
});

// Appel initial pour récupérer les planètes et remplir les options de sélection de terrain
fetchPlanets();

