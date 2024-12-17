// Obtener el ID de la especie desde la URL
const parametros = new URLSearchParams(window.location.search);
const idEspecie = parametros.get('id');

if (!idEspecie) {
    document.body.innerHTML = '<p>Error: No se especificó una especie.</p>';
} else {
    cargarDetallesEspecie(idEspecie);
}

// Función para cargar los detalles de una especie
async function cargarDetallesEspecie(id) {
    const especie = await obtenerDatosSWAPI(`species/${id}`);
    console.log(especie); // log para mostrar los detalles de la especie por consola

    const mainContent = document.getElementById('main-content');
    if (especie) {
        mainContent.innerHTML = `
        <h1>${especie.name}</h1>
        <p><strong>Clasificación:</strong> ${especie.classification}</p>
        <p><strong>Designación:</strong> ${especie.designation}</p>
        <p><strong>Altura promedio:</strong> ${especie.average_height} cm</p>
        <p><strong>Color de piel:</strong> ${especie.skin_colors}</p>
        <p><strong>Idioma:</strong> ${especie.language}</p>`;

    } else {
        mainContent.innerHTML = '<p>No se pudo encontrar la especie.</p>';
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
