// Función para obtener datos de la API de Star Wars
async function obtenerDatosSWAPI(endpoint) {
    const url = `https://swapi.info/api/${endpoint}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Hubo un problema con la petición:", error);
    }
}


// Función para mostrar las películas en el HTML
async function mostrarPeliculas() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<h2>Películas de Star Wars</h2><div id="contenedor-peliculas"></div>';

    // Objeto con imágenes específicas para cada película (URLs de ejemplo)
    const imagenesPeliculas = {
        1: 'https://th.bing.com/th/id/R.af02a2a4a45f29f51b18af67eb13681a?rik=H0pONOxfywCqiA&pid=ImgRaw&r=0', // The Phantom Menace
        2: 'https://images8.alphacoders.com/111/thumb-1920-1115517.jpg', // Attack of the Clones
        3: 'https://images6.alphacoders.com/111/1115518.jpg',  // Revenge of the Sith
        4: 'https://images3.alphacoders.com/111/1115520.jpg', // A New Hope
        5: 'https://wallpaperaccess.com/full/4971210.jpg', // Empire Strikes Back
        6:  'https://images3.alphacoders.com/111/1115523.jpg', // Return of the Jedi
    };


    try {
        const peliculas = await obtenerDatosSWAPI('films');
        const contenedorPeliculas = document.getElementById('contenedor-peliculas');

        if (peliculas && Array.isArray(peliculas)) {
            peliculas.forEach(pelicula => {
                // Crear un contenedor para cada película
                const tarjeta = document.createElement('div');
                tarjeta.className = 'tarjeta-pelicula';

                // Usar la imagen específica según el episode_id
                const imagenURL = imagenesPeliculas[pelicula.episode_id] || 'https://via.placeholder.com/300x150?text=Imagen+no+disponible';

                tarjeta.innerHTML = `
                    <img src="${imagenURL}" alt="${pelicula.title}" class="img-tarjeta">
                    <h3>${pelicula.title}</h3>
                    <a href="pages/pelicula.html?id=${pelicula.episode_id}" class="btn-detalle">Ver detalles</a>
                `;

                contenedorPeliculas.appendChild(tarjeta);
            });
        } else {
            mainContent.innerHTML += '<p>No se encontraron películas.</p>';
        }
    } catch (error) {
        console.error('Error al cargar las películas:', error);
        mainContent.innerHTML = '<p>Error al cargar los datos. Por favor, intenta más tarde.</p>';
    }
}


// Mostrar la lista de películas al cargar la página principal
mostrarPeliculas();
