// Obtener el ID del planeta desde la URL
const parametros = new URLSearchParams(window.location.search);
const idPlaneta = parametros.get('id');

if (!idPlaneta) {
    document.body.innerHTML = '<p>Error: No se especificó un planeta.</p>';
} else {
    mostrarDetallesPlaneta(idPlaneta);
}

// Función para mostrar los detalles de un planeta
async function mostrarDetallesPlaneta(id) {
    const planeta = await obtenerDatosSWAPI(`planets/${id}`);

    if (planeta) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
        <h1>${planeta.name}</h1>
        <p><strong>Clima:</strong> ${planeta.climate}</p>
        <p><strong>Terreno:</strong> ${planeta.terrain}</p>
        <p><strong>Población:</strong> ${planeta.population}</p>
        <p><strong>Diámetro:</strong> ${planeta.diameter} km</p>`;
    } else {
        document.body.innerHTML = '<p>Error: No se encontraron detalles para este planeta.</p>';
    }
}

// Función para interactuar con el API
async function obtenerDatosSWAPI(endpoint) {
    const url = `https://swapi.info/api/${endpoint}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Hubo un problema con la petición:", error);
    }
}
