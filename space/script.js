// Fonction pour récupérer les données depuis l'API SWAPI
async function fetchDataAndDisplay(url, elementId, label) {
  try {
      const data = await fetchData(url);
      document.getElementById(elementId).textContent = `${label} : ${data.count}`;
  } catch (error) {
      console.error(`Une erreur s'est produite lors de la récupération des données pour ${label} :`, error);
  }
}
// Fonction pour récuperer la data
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
// Fonction pour afficher la data choisis
async function displayData() {
  try {
      await fetchDataAndDisplay('https://swapi.dev/api/people/', 'peopleCount', 'Nombre d\'êtres vivants recensés');
      await fetchDataAndDisplay('https://swapi.dev/api/vehicles/', 'vehiclesCount', 'Nombre de véhicules recensés');
      await fetchDataAndDisplay('https://swapi.dev/api/planets/', 'planetsCount', 'Nombre de planètes recensées');
  } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'affichage des données :', error);
  }
}

window.onload = displayData;