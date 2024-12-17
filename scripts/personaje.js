// Obtener el ID del personaje desde la URL
const parametros = new URLSearchParams(window.location.search);
const idPersonaje = parametros.get('id');

if (!idPersonaje) {
    document.body.innerHTML = '<p>Error: No se especificó un personaje.</p>';
} else {
    mostrarDetallesPersonaje(idPersonaje);
}

// Función para mostrar los detalles de un personaje
async function mostrarDetallesPersonaje(id) {
    const personaje = await obtenerDatosSWAPI(`people/${id}`);

    if (personaje) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <h1>${personaje.name}</h1>
            <p><strong>Altura:</strong> ${personaje.height} cm</p>
            <p><strong>Peso:</strong> ${personaje.mass} kg</p>
            <p><strong>Color de cabello:</strong> ${personaje.hair_color}</p>
            <p><strong>Color de ojos:</strong> ${personaje.eye_color}</p>
            <p><strong>Género:</strong> ${personaje.gender}</p>
        `;
    } else {
        document.body.innerHTML = '<p>Error: No se encontraron detalles para este personaje.</p>';
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
