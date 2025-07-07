document.addEventListener('DOMContentLoaded', () => {
    // URL de la API que vamos a consumir
    const apiUrl = 'https://jsonplaceholder.typicode.com/users/2';

    // Función para consumir la API
    async function consumirAPI() {
        try {
            // Realizamos la solicitud GET a la URL de la API
            const response = await fetch(apiUrl);

            // Verificamos si la respuesta es exitosa (código de estado 2xx)
            // 'response.ok' es una propiedad booleana que es true si el estado HTTP es 200-299.
            if (response.ok) {
                // Si la respuesta es 200 (o cualquier 2xx), lanzamos el alert
                alert('¡La API respondió con éxito (código 200)!');

                // Opcional: Si quieres ver los datos de la respuesta, puedes hacer esto:
                const data = await response.json(); // Convierte la respuesta a JSON
                console.log('Datos recibidos de la API:', data);

            } else {
                // Si la respuesta no es 200 (ej. 404 Not Found, 500 Internal Server Error)
                alert(`Error al consumir la API: Código de estado ${response.status}`);
                console.error(`Error al consumir la API: Código de estado ${response.status}`);
            }
        } catch (error) {
            // Capturamos cualquier error de red (ej. no hay conexión, URL incorrecta)
            alert('Hubo un problema de red al intentar consumir la API.');
            console.error('Error de red al consumir la API:', error);
        }
    }

    // Llamamos a la función para consumir la API cuando la página carga
    consumirAPI();
});
