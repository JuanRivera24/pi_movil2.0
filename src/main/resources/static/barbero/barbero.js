document.addEventListener('DOMContentLoaded', function() {

    // --> ¡NUEVO! Bloque de seguridad
    const userRole = localStorage.getItem('userRole');

    // 1. Verificamos si el usuario es un barbero. Si no, lo redirigimos al inicio.
    if (userRole !== 'barbero') {
        alert('Acceso denegado. Esta página es solo para personal autorizado.');
        window.location.href = '/index.html'; // Lo mandamos a la página de login
        return; // Detenemos la ejecución del resto del script
    }
    // --> FIN DEL BLOQUE NUEVO

    const API_BASE_URL = 'http://localhost:8080/api';
    const citasTableBody = document.querySelector('#citas-table tbody');

    async function cargarCitas() {
        try {
            const response = await fetch(`${API_BASE_URL}/citas`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const citas = await response.json();

            citasTableBody.innerHTML = ''; 

            if (citas.length === 0) {
                citasTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No hay citas agendadas por el momento.</td></tr>';
                return;
            }

            // Ordenamos las citas por fecha y hora
            citas.sort((a, b) => new Date(a.fecha + 'T' + a.hora) - new Date(b.fecha + 'T' + b.hora));

            citas.forEach(cita => {
                const row = document.createElement('tr');
                row.style.cursor = 'pointer';
                row.addEventListener('click', function() {
                    window.location.href = `/barbero/detalle-cita.html?id=${cita.idCita}`;
                });
                
                // Formateamos la hora para mejor visualización
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