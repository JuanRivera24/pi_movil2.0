document.addEventListener('DOMContentLoaded', function() {
    const API_BASE_URL = 'http://localhost:8080/api';
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');
    const detailsContainer = document.getElementById('cita-details-container');

    function getCitaIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    async function cargarDetallesCita() {
        const citaId = getCitaIdFromUrl();
        if (!citaId) {
            showError("No se ha especificado un ID de cita.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/citas/${citaId}`);
            if (response.status === 404) throw new Error("La cita no fue encontrada.");
            if (!response.ok) throw new Error("Hubo un problema al conectar con el servidor.");
            
            const cita = await response.json();
            displayCitaDetails(cita);
        } catch (error) {
            showError(error.message);
        }
    }

    function displayCitaDetails(cita) {
        loadingMessage.style.display = 'none';
        detailsContainer.style.display = 'block';

        document.getElementById('fecha').textContent = cita.fecha;
        const horaFormatted = new Date(`1970-01-01T${cita.hora}`).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: true });
        document.getElementById('hora').textContent = horaFormatted;
        
        document.getElementById('cliente').textContent = `${cita.cliente.nombre} ${cita.cliente.apellido}`;
        document.getElementById('cliente-telefono').textContent = cita.cliente.telefono || 'No especificado';
        document.getElementById('cliente-email').textContent = cita.cliente.email || 'No especificado';

        document.getElementById('servicio').textContent = cita.servicio.nombreServicio;
        // Esta sección ya está perfecta:
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

    cargarDetallesCita();
});