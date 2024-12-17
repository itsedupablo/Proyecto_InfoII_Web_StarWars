const parametros = new URLSearchParams(window.location.search);
const idPelicula = parametros.get('id');

if (!idPelicula) {
    document.body.innerHTML = '<p>Error: No se especificó una película.</p>';
} else {
    cargarDetallesPelicula(idPelicula);
}

// Función para cargar los detalles de una película
async function cargarDetallesPelicula(id) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<p id="loading-message">Cargando detalles de la película...</p>';

    try {
        const pelicula = await obtenerDatosSWAPI(`films/${id}`);
        if (pelicula) {
            mainContent.innerHTML = `
                <nav class="menu-pestanas">
                    <ul>
                        <li><a href="../index.html">Películas</a></li>
                        <li><a href="#personajes">Personajes</a></li>
                        <li><a href="#planetas">Planetas</a></li>
                        <li><a href="#vehiculos">Vehículos</a></li>
                        <li><a href="#naves">Naves</a></li>
                        <li><a href="#especies">Especies</a></li>
                    </ul>
                </nav>
                <h2>${pelicula.title}</h2>
                <p><strong>Director:</strong> ${pelicula.director}</p>
                <p><strong>Productores:</strong> ${pelicula.producer}</p>
                <p><strong>Fecha de lanzamiento:</strong> ${pelicula.release_date}</p>
                <p><strong>Trama:</strong> ${pelicula.opening_crawl}</p>
                <div class="contenedor-recursos">
                    <div id="personajes" class="categoria">
                        <h3>Personajes principales:</h3>
                        <div id="lista-personajes" class="grid-recursos">Cargando personajes...</div>
                    </div>
                    <div id="planetas" class="categoria">
                        <h3>Planetas:</h3>
                        <div id="lista-planetas" class="grid-recursos">Cargando planetas...</div>
                    </div>
                    <div id="vehiculos" class="categoria">
                        <h3>Vehículos:</h3>
                        <div id="lista-vehiculos" class="grid-recursos">Cargando vehículos...</div>
                    </div>
                    <div id="naves" class="categoria">
                        <h3>Naves estelares:</h3>
                        <div id="lista-naves" class="grid-recursos">Cargando naves...</div>
                    </div>
                    <div id="especies" class="categoria">
                        <h3>Especies:</h3>
                        <div id="lista-especies" class="grid-recursos">Cargando especies...</div>
                    </div>
                </div>
            `;
            await cargarRecursos(pelicula.characters, 'lista-personajes', 'personaje');
            await cargarRecursos(pelicula.planets, 'lista-planetas', 'planeta');
            await cargarRecursos(pelicula.vehicles, 'lista-vehiculos', 'vehiculo');
            await cargarRecursos(pelicula.starships, 'lista-naves', 'nave');
            await cargarRecursos(pelicula.species, 'lista-especies', 'especie');
        } else {
            mainContent.innerHTML = '<p>No se encontraron detalles para esta película.</p>';
        }
    } catch (error) {
        console.error('Error al cargar los detalles de la película:', error);
        mainContent.innerHTML = '<p>Error al cargar los datos. Por favor, intenta más tarde.</p>';
    }
}

// Función para cargar los recursos en una categoría
async function cargarRecursos(urls, contenedorId, tipo) {
    const contenedor = document.getElementById(contenedorId);
    const imagenGenerica = 'https://logos-download.com/wp-content/uploads/2016/09/Star_Wars_logo_black.png'; // Logo genérico

    try {
        const recursos = await Promise.all(
            urls.map(url => obtenerDatosSWAPI(url.replace('https://swapi.info/api/', '')))
        );

        contenedor.innerHTML = recursos.map(recurso => `
            <div class="tarjeta-recurso">
                <img src="${imagenGenerica}" alt="${tipo}" class="img-recurso">
                <h4>${recurso.name || recurso.title}</h4>
                <a href="../pages/${tipo}.html?id=${obtenerIdDesdeURL(recurso.url)}" class="btn-detalle">Ver más</a>
            </div>
        `).join('');
    } catch (error) {
        console.error(`Error al cargar los recursos de ${tipo}:`, error);
        contenedor.innerHTML = '<p>Error al cargar los recursos.</p>';
    }
}

// Función para extraer el ID desde una URL
function obtenerIdDesdeURL(url) {
    return Number(url.match(/([0-9]*)\/?$/)[1]);
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
