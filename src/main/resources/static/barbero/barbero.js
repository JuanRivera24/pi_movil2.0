document.addEventListener('DOMContentLoaded', function() {
    // --- VERIFICACIÓN DE ROL ---
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'barbero') {
        alert('Acceso denegado.');
        window.location.href = '/index.html'; // Redirige si no es barbero
        return;
    }

    // --- CONSTANTES Y SELECTORES ---
    const API_BASE_URL = 'http://localhost:8080/api';
    const sedeSelector = document.getElementById('sede-selector');
    const barberoSelector = document.getElementById('barbero-selector');
    const barberoContainer = document.getElementById('barbero-selector-container');
    const citasContainer = document.getElementById('citas-container');
    const citasTableBody = document.querySelector('#citas-table tbody');
    const mensajeInicial = document.getElementById('mensaje-inicial');

    let todosLosBarberos = []; // Caché para no recargar barberos

    // --- FUNCIONES ---

    // 1. Carga los datos iniciales (sedes y todos los barberos)
    async function cargarDatosIniciales() {
        try {
            const [sedesRes, barberosRes] = await Promise.all([
                fetch(`${API_BASE_URL}/sedes`),
                fetch(`${API_BASE_URL}/barberos`)
            ]);

            const sedesOriginal = await sedesRes.json();
            todosLosBarberos = await barberosRes.json();
            
            const sedesUnicas = [...new Map(sedesOriginal.map(sede => [sede.idSede, sede])).values()];
            
            sedeSelector.innerHTML = '<option value="">Seleccione una sede</option>';
            sedesUnicas.forEach(sede => {
                const option = document.createElement('option');
                option.value = sede.idSede;
                option.textContent = sede.nombreSede;
                sedeSelector.appendChild(option);
            });

        } catch (error) {
            console.error('Error cargando datos iniciales:', error);
            sedeSelector.innerHTML = '<option value="">Error al cargar</option>';
        }
    }

    // 2. Filtra y muestra los barberos según la sede seleccionada
    function filtrarBarberosPorSede(idSede) {
        barberoSelector.innerHTML = '<option value="">Seleccione su nombre</option>';
        
        if (!idSede) {
            barberoContainer.style.display = 'none';
            citasContainer.style.display = 'none';
            mensajeInicial.style.display = 'block';
            return;
        }

        const barberosFiltrados = todosLosBarberos.filter(b => b.sede.idSede == idSede);
        
        barberosFiltrados.forEach(barbero => {
            const option = document.createElement('option');
            option.value = barbero.idBarbero;
            option.textContent = `${barbero.nombre} ${barbero.apellido}`;
            barberoSelector.appendChild(option);
        });

        barberoContainer.style.display = 'block';
    }

    // 3. Carga y muestra la agenda de citas para el barbero seleccionado
    async function cargarCitasPorBarbero(barberoId) {
        if (!barberoId) {
            citasContainer.style.display = 'none';
            mensajeInicial.style.display = 'block';
            return;
        }
        
        citasContainer.style.display = 'block';
        mensajeInicial.style.display = 'none';
        citasTableBody.innerHTML = `<tr><td colspan="6" class="text-center">Cargando citas...</td></tr>`;

        try {
            const response = await fetch(`${API_BASE_URL}/citas/barbero/${barberoId}`);
            const citas = await response.json();
            citasTableBody.innerHTML = ''; 

            if (citas.length === 0) {
                citasTableBody.innerHTML = '<tr><td colspan="6" class="text-center">No tienes citas agendadas.</td></tr>';
                return;
            }

            citas.sort((a, b) => new Date(a.fecha + 'T' + a.hora) - new Date(b.fecha + 'T' + b.hora));

            citas.forEach(cita => {
                const row = document.createElement('tr');
                const horaFormatted = new Date(`1970-01-01T${cita.hora}`).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: true });
                
                row.style.cursor = 'pointer';
                row.addEventListener('click', () => {
                    // Acción de click: redirige a la página de detalles
                    window.location.href = `/barbero/detalles-cita.html?id=${cita.idCita}`;
                });
                
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

                // Evento para el botón "Cancelar" para que no interfiera con el click de la fila
                const cancelarBtn = row.querySelector('.btn-eliminar');
                if(cancelarBtn) {
                    cancelarBtn.addEventListener('click', function(event) {
                        event.stopPropagation(); // MUY IMPORTANTE: evita que el click se propague a la fila
                        eliminarCita(this.dataset.id);
                    });
                }
                
                citasTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error al cargar las citas:', error);
            citasTableBody.innerHTML = '<tr><td colspan="6" class="text-center">Error al cargar las citas.</td></tr>';
        }
    }

    // 4. Cancela una cita
    async function eliminarCita(id) {
        if (!confirm('¿Seguro que deseas cancelar esta cita?')) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/citas/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Cita cancelada con éxito.');
                cargarCitasPorBarbero(barberoSelector.value); // Recarga la agenda
            } else {
                throw new Error('No se pudo cancelar la cita.');
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }
    
    // --- EVENTOS ---
    sedeSelector.addEventListener('change', () => {
        filtrarBarberosPorSede(sedeSelector.value);
        citasContainer.style.display = 'none';
        mensajeInicial.style.display = 'block';
    });

    barberoSelector.addEventListener('change', () => {
        cargarCitasPorBarbero(barberoSelector.value);
    });

    // --- INICIO ---
    cargarDatosIniciales();
});