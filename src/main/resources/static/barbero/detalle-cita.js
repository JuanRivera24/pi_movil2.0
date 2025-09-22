document.addEventListener('DOMContentLoaded', function() {

    const API_BASE_URL = 'http://localhost:8080/api';

    // Elementos del DOM para mostrar mensajes y datos
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');
    const detailsContainer = document.getElementById('cita-details-container');

    // --- FUNCIÓN PARA OBTENER EL ID DE LA CITA DESDE LA URL ---
    function getCitaIdFromUrl() {
        // new URLSearchParams(window.location.search) crea un objeto para manejar los parámetros de la URL
        // .get('id') obtiene el valor del parámetro llamado "id"
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    // --- FUNCIÓN PARA CARGAR Y MOSTRAR LOS DETALLES DE LA CITA ---
    async function cargarDetallesCita() {
        const citaId = getCitaIdFromUrl();

        if (!citaId) {
            showError("No se ha especificado un ID de cita.");
            return;
        }

        try {
            // Llamamos a nuestro nuevo endpoint: /api/citas/{id}
            const response = await fetch(`${API_BASE_URL}/citas/${citaId}`);

            if (response.status === 404) {
                throw new Error("La cita no fue encontrada.");
            }
            if (!response.ok) {
                throw new Error("Hubo un problema al conectar con el servidor.");
            }

            const cita = await response.json();
            
            // Si todo sale bien, mostramos los datos
            displayCitaDetails(cita);

        } catch (error) {
            showError(error.message);
        }
    }

    function displayCitaDetails(cita) {
        // Ocultamos el mensaje de carga y mostramos el contenedor de detalles
        loadingMessage.style.display = 'none';
        detailsContainer.style.display = 'block';

        // Rellenamos cada campo del HTML con los datos de la cita
        document.getElementById('fecha').textContent = cita.fecha;
        const horaFormatted = new Date(`1970-01-01T${cita.hora}`).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: true });
        document.getElementById('hora').textContent = horaFormatted;
        
        document.getElementById('cliente').textContent = `${cita.cliente.nombre} ${cita.cliente.apellido}`;
        document.getElementById('cliente-telefono').textContent = cita.cliente.telefono || 'No especificado';
        document.getElementById('cliente-email').textContent = cita.cliente.email || 'No especificado';

        document.getElementById('servicio').textContent = cita.servicio.nombreServicio;
        document.getElementById('duracion').textContent = `${cita.servicio.duracionMin} minutos`;
        document.getElementById('precio').textContent = `$${cita.servicio.precio.toLocaleString('es-CO')}`;
        
        document.getElementById('barbero').textContent = `${cita.barbero.nombre} ${cita.barbero.apellido}`;
        document.getElementById('sede').textContent = cita.sede.nombreSede;
    }

    function showError(message) {
        loadingMessage.style.display = 'none';
        errorMessage.textContent = `Error: ${message}`;
        errorMessage.style.display = 'block';
    }

    // --- LLAMADA INICIAL AL CARGAR LA PÁGINA ---
    cargarDetallesCita();
});