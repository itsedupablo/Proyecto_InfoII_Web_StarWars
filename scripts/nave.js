// Obtener el ID del nave desde la URL
const parametros = new URLSearchParams(window.location.search);
const idNave = parametros.get('id');

if (!idNave) {
    document.body.innerHTML = '<p>Error: No se especificó una nave.</p>';
} else {
    mostrarDetallesNave(idNave);
}

// Función para mostrar los detalles de un nave
async function mostrarDetallesNave(id) {
    const nave = await obtenerDatosSWAPI(`starships/${id}`);

    if (nave) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
    <h1>${nave.name}</h1>
    <p><strong>Modelo:</strong> ${nave.model}</p>
    <p><strong>Fabricante:</strong> ${nave.manufacturer}</p>
    <p><strong>Coste:</strong> ${nave.cost_in_credits} créditos</p>
    <p><strong>Velocidad máxima:</strong> ${nave.max_atmosphering_speed}</p>
    <p><strong>Capacidad de carga:</strong> ${nave.cargo_capacity}</p>`;

    } else {
        document.body.innerHTML = '<p>Error: No se encontraron detalles para esta nave.</p>';
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
