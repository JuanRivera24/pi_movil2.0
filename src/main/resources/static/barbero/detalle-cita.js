document.addEventListener('DOMContentLoaded', function() {
    // --- CONSTANTES Y SELECTORES ---
    const API_BASE_URL = 'http://localhost:8080/api';
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');
    const detailsContainer = document.getElementById('cita-details-container');

    // --- FUNCIONES ---

    // 1. Obtiene el ID de la cita de los parámetros de la URL (ej: ?id=123)
    function getCitaIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    // 2. Muestra un mensaje de error en la página
    function showError(message) {
        loadingMessage.style.display = 'none';
        errorMessage.textContent = `Error: ${message}`;
        errorMessage.style.display = 'block';
    }

    // 3. Muestra los detalles de la cita en el HTML
    function displayCitaDetails(cita) {
        // Oculta mensajes de carga/error y muestra el contenedor de detalles
        loadingMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        detailsContainer.style.display = 'block';

        // Rellena los campos con la información de la cita
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

    // 4. Función principal que se ejecuta al cargar la página
    async function cargarDetallesCita() {
        const citaId = getCitaIdFromUrl();
        if (!citaId) {
            showError("No se ha especificado un ID de cita en la URL.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/citas/${citaId}`);
            if (response.status === 404) throw new Error("La cita no fue encontrada (ID no existe).");
            if (!response.ok) throw new Error("No se pudo conectar con el servidor.");
            
            const cita = await response.json();
            displayCitaDetails(cita);

        } catch (error) {
            showError(error.message);
        }
    }

    // --- INICIO ---
    // Llama a la función principal para empezar el proceso
    cargarDetallesCita();
});