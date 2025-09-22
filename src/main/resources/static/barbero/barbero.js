document.addEventListener('DOMContentLoaded', function() {

    const API_BASE_URL = 'http://localhost:8080/api';
    const citasTableBody = document.querySelector('#citas-table tbody');

    async function cargarCitas() {
        try {
            const response = await fetch(`${API_BASE_URL}/citas`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const citas = await response.json();

            citasTableBody.innerHTML = ''; // Limpiamos la tabla

            if (citas.length === 0) {
                citasTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No hay citas agendadas por el momento.</td></tr>';
                return;
            }

            citas.sort((a, b) => new Date(a.fecha + 'T' + a.hora) - new Date(b.fecha + 'T' + b.hora));

            citas.forEach(cita => {
                const row = document.createElement('tr');

                // --- INICIO DE LA MODIFICACIÓN ---

                // 1. Añadimos un estilo para que el cursor cambie a una "manito" al pasar por encima.
                row.style.cursor = 'pointer';

                // 2. Añadimos un evento 'click' a toda la fila.
                row.addEventListener('click', function() {
                    // 3. Redirigimos al usuario a la nueva página de detalles.
                    //    Pasamos el ID de la cita como un "parámetro de búsqueda" en la URL.
                    window.location.href = `/barbero/detalle-cita.html?id=${cita.idCita}`;
                });

                // --- FIN DE LA MODIFICACIÓN ---

                const horaFormatted = new Date(`1970-01-01T${cita.hora}`).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: true });

                row.innerHTML = `
                    <td>${cita.fecha}</td>
                    <td>${horaFormatted}</td>
                    <td>${cita.cliente.nombre} ${cita.cliente.apellido}</td>
                    <td>${cita.servicio.nombreServicio}</td>
                    <td>${cita.barbero.nombre} ${cita.barbero.apellido}</td>
                    <td>${cita.sede.nombreSede}</td>
                `;
                citasTableBody.appendChild(row);
            });

        } catch (error) {
            console.error('Error al cargar las citas:', error);
            citasTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Error al cargar los datos de las citas.</td></tr>';
        }
    }

    cargarCitas();
});