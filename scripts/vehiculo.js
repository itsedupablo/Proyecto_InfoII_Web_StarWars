// Obtener el ID del vehículo desde la URL vehiculo
const parametros = new URLSearchParams(window.location.search);
const idVehiculo = parametros.get('id');

if (!idVehiculo) {
    document.body.innerHTML = '<p>Error: No se especificó un vehículo.</p>';
} else {
    mostrarDetallesVehiculo(idVehiculo);
}

// Función para mostrar los detalles de un vehículo
async function mostrarDetallesVehiculo(id) {
    const vehiculo = await obtenerDatosSWAPI(`vehicles/${id}`);

    if (vehiculo) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
        <h1>${vehiculo.name}</h1>
        <p><strong>Modelo:</strong> ${vehiculo.model}</p>
        <p><strong>Fabricante:</strong> ${vehiculo.manufacturer}</p>
        <p><strong>Coste:</strong> ${vehiculo.cost_in_credits} créditos</p>
        <p><strong>Velocidad máxima:</strong> ${vehiculo.max_atmosphering_speed}</p>
        <p><strong>Capacidad de carga:</strong> ${vehiculo.cargo_capacity}</p>`;
    } else {
        document.body.innerHTML = '<p>Error: No se encontraron detalles para este vehículo.</p>';
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
