document.addEventListener('DOMContentLoaded', function() {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'barbero') {
        alert('Acceso denegado.');
        window.location.href = '/index.html';
        return;
    }

    const API_BASE_URL = 'http://localhost:8080/api';
    const citasTableBody = document.querySelector('#citas-table tbody');
    const barberoSelector = document.getElementById('barbero-selector');

    async function cargarBarberosEnSelector() {
        try {
            // Asumimos que tienes un endpoint /api/barberos que devuelve todos los barberos
            const response = await fetch(`${API_BASE_URL}/barberos`);
            const barberos = await response.json();
            
            barberoSelector.innerHTML = '<option value="">Seleccione su nombre</option>';
            barberos.forEach(barbero => {
                const option = document.createElement('option');
                option.value = barbero.idBarbero;
                option.textContent = `${barbero.nombre} ${barbero.apellido}`;
                barberoSelector.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar la lista de barberos:', error);
        }
    }

    async function cargarCitasPorBarbero(barberoId) {
        if (!barberoId) {
            citasTableBody.innerHTML = '<tr><td colspan="6" class="text-center">Selecciona un barbero...</td></tr>';
            return;
        }
        
        try {
            const response = await fetch(`${API_BASE_URL}/citas/barbero/${barberoId}`);
            const citas = await response.json();
            citasTableBody.innerHTML = ''; 

            if (citas.length === 0) {
                citasTableBody.innerHTML = '<tr><td colspan="6" class="text-center">No hay citas agendadas.</td></tr>';
                return;
            }

            citas.sort((a, b) => new Date(a.fecha + 'T' + a.hora) - new Date(b.fecha + 'T' + b.hora));

            citas.forEach(cita => {
                const row = document.createElement('tr');
                const horaFormatted = new Date(`1970-01-01T${cita.hora}`).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: true });
                
                row.innerHTML = `
                    <td>${cita.fecha}</td>
                    <td>${horaFormatted}</td>
                    <td>${cita.cliente.nombre} ${cita.cliente.apellido}</td>
                    <td>${cita.servicio.nombreServicio}</td>
                    <td>${cita.sede.nombreSede}</td>
                    <td class="acciones">
                        <button class="btn-eliminar" data-id="${cita.idCita}">Cancelar</button>
                    </td>
                `;
                citasTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error al cargar las citas:', error);
            citasTableBody.innerHTML = '<tr><td colspan="6" class="text-center">Error al cargar las citas.</td></tr>';
        }
    }

    async function eliminarCita(id) {
        if (!confirm('¿Seguro que deseas cancelar esta cita?')) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/citas/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Cita cancelada con éxito.');
                cargarCitasPorBarbero(barberoSelector.value); // Recargar la lista
            } else {
                throw new Error('No se pudo cancelar la cita.');
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }
    
    barberoSelector.addEventListener('change', () => {
        cargarCitasPorBarbero(barberoSelector.value);
    });

    citasTableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-eliminar')) {
            eliminarCita(event.target.dataset.id);
        }
    });

    // Carga inicial
    cargarBarberosEnSelector();
});