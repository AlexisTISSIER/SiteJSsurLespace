// Fonction pour récupérer les données depuis l'API SWAPI
async function fetchDataAndDisplay(url, elementId, label) {
  try {
      const data = await fetchData(url);
      document.getElementById(elementId).textContent = `${label} : ${data.count}`;
  } catch (error) {
      console.error(`Une erreur s'est produite lors de la récupération des données pour ${label} :`, error);
  }
}

// Fonction pour récupérer les données depuis une URL
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Fonction pour afficher les données
async function displayData() {
  try {
      await fetchDataAndDisplay('https://swapi.dev/api/people/', 'peopleCount', 'Nombre d\'êtres vivants recensés');
      await fetchDataAndDisplay('https://swapi.dev/api/vehicles/', 'vehiclesCount', 'Nombre de véhicules recensés');
      await fetchDataAndDisplay('https://swapi.dev/api/planets/', 'planetsCount', 'Nombre de planètes recensées');
  } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'affichage des données :', error);
  }
}

// Appel de la fonction pour afficher les données au chargement de la page
window.onload = () => {
  displayData();
  displayImageFromAPI();
};

// Fonction pour récupérer et afficher une image de l'API NASA APOD
async function displayImageFromAPI() {
  try {
      const maCleAPI = "bjCirviyEKCageagswN9SsdlsSfW8gdckzxaEfNZ";
      const urlAPI = `https://api.nasa.gov/planetary/apod?api_key=${maCleAPI}`;

      // Fetch de l'image depuis l'API
      const response = await fetch(urlAPI);
      const imageData = await response.json();

      // Sélection de l'élément avec la classe "nasa"
      const imageNASA = document.querySelector('.nasa');

      // Mise à jour de l'attribut src de l'image avec l'URL de l'image de l'API
      imageNASA.src = imageData.url;
      imageNASA.alt = imageData.title;
  } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération de l\'image depuis l\'API :', error);
  }
}