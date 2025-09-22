document.addEventListener('DOMContentLoaded', function() {
    
    function inicializarPagina() {
        const clienteNombre = localStorage.getItem('clienteNombre');
        const clienteApellido = localStorage.getItem('clienteApellido');
        const userRole = localStorage.getItem('userRole');

        if (userRole !== 'cliente' || !clienteNombre || !clienteApellido) {
            alert('Acceso no autorizado.');
            window.location.href = '/index.html';
            return;
        }

        const nombreInput = document.getElementById('cliente-nombre');
        const apellidoInput = document.getElementById('cliente-apellido');
        nombreInput.value = clienteNombre;
        apellidoInput.value = clienteApellido;

        const API_BASE_URL = 'http://localhost:8080/api';
        const sedeSelect = document.getElementById('sede');
        const barberoSelect = document.getElementById('barbero');
        const servicioSelect = document.getElementById('servicio');
        const citaForm = document.getElementById('cita-form');
        const mensajeRespuesta = document.getElementById('mensaje-respuesta');
        const submitButton = document.getElementById('submit-button');
        const cancelEditButton = document.getElementById('cancel-edit-button');
        const formTitle = document.getElementById('form-title');
        const citaIdInput = document.getElementById('cita-id');
        const misCitasTableBody = document.querySelector('#mis-citas-table tbody');

        // --- LÓGICA DE CARGA INICIAL ---
        async function cargarSelectsIniciales() {
            // (Esta función permanece igual a la última versión que corregimos)
             try {
                const [sedesRes, serviciosRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/sedes`),
                    fetch(`${API_BASE_URL}/servicios`)
                ]);
                const sedesOriginal = await sedesRes.json();
                const servicios = await serviciosRes.json();
                const sedesUnicas = [...new Map(sedesOriginal.map(sede => [sede.idSede, sede])).values()];
                const sedesFinales = sedesUnicas.slice(0, 6);

                sedeSelect.innerHTML = '<option value="">Seleccione una sede</option>';
                sedesFinales.forEach(sede => {
                    const option = document.createElement('option');
                    option.value = sede.idSede;
                    option.textContent = sede.nombreSede;
                    sedeSelect.appendChild(option);
                });
                
                servicioSelect.innerHTML = '<option value="">Seleccione un servicio</option>';
                servicios.forEach(servicio => {
                    const option = document.createElement('option');
                    option.value = servicio.idServicio;
                    const precioFormateado = servicio.precio.toLocaleString('es-CO');
                    option.textContent = `${servicio.nombreServicio} - ${servicio.duracionMin} min - $${precioFormateado}`;
                    servicioSelect.appendChild(option);
                });
                
                barberoSelect.disabled = true;
                barberoSelect.innerHTML = '<option value="">Primero seleccione una sede</option>';

            } catch (error) {
                console.error('Error cargando datos iniciales:', error);
            }
        }

        async function cargarBarberosPorSede(idSede) {
             if (!idSede) {
                barberoSelect.innerHTML = '<option value="">Primero seleccione una sede</option>';
                barberoSelect.disabled = true;
                return;
            }
            try {
                // Esta ruta '/barberos/por-sede/{idSede}' debe existir en tu BarberoController
                const response = await fetch(`${API_BASE_URL}/barberos/por-sede/${idSede}`);
                const barberos = await response.json();
                barberoSelect.innerHTML = '<option value="">Seleccione un barbero</option>';
                barberos.forEach(barbero => {
                    const option = document.createElement('option');
                    option.value = barbero.idBarbero;
                    option.textContent = `${barbero.nombre} ${barbero.apellido}`;
                    barberoSelect.appendChild(option);
                });
                barberoSelect.disabled = false;
            } catch (error) {
                console.error('Error al cargar barberos por sede:', error);
            }
        }
        
        sedeSelect.addEventListener('change', () => cargarBarberosPorSede(sedeSelect.value));

        // --- NUEVA LÓGICA PARA GESTIONAR CITAS ---
        async function cargarMisCitas() {
            try {
                const response = await fetch(`${API_BASE_URL}/citas?clienteNombre=${clienteNombre}&clienteApellido=${clienteApellido}`);
                const citas = await response.json();
                misCitasTableBody.innerHTML = '';

                if (citas.length === 0) {
                    misCitasTableBody.innerHTML = '<tr><td colspan="5" class="text-center">No tienes citas programadas.</td></tr>';
                    return;
                }
                
                citas.sort((a, b) => new Date(a.fecha + 'T' + a.hora) - new Date(b.fecha + 'T' + b.hora));

                citas.forEach(cita => {
                    const row = document.createElement('tr');
                    const horaFormatted = new Date(`1970-01-01T${cita.hora}`).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: true });
                    
                    row.innerHTML = `
                        <td>${cita.fecha}</td>
                        <td>${horaFormatted}</td>
                        <td>${cita.barbero.nombre} ${cita.barbero.apellido}</td>
                        <td>${cita.servicio.nombreServicio}</td>
                        <td class="acciones">
                            <button class="btn-editar" data-id="${cita.idCita}">Editar</button>
                            <button class="btn-eliminar" data-id="${cita.idCita}">Eliminar</button>
                        </td>
                    `;
                    misCitasTableBody.appendChild(row);
                });
            } catch (error) {
                console.error("Error al cargar mis citas:", error);
                misCitasTableBody.innerHTML = '<tr><td colspan="5" class="text-center">Error al cargar tus citas.</td></tr>';
            }
        }

        async function eliminarCita(id) {
            if (!confirm('¿Estás seguro de que quieres eliminar esta cita?')) return;
            
            try {
                const response = await fetch(`${API_BASE_URL}/citas/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    mensajeRespuesta.textContent = 'Cita eliminada con éxito.';
                    mensajeRespuesta.style.color = 'lightgreen';
                    cargarMisCitas(); // Recargar la lista
                } else {
                    throw new Error('No se pudo eliminar la cita.');
                }
            } catch (error) {
                mensajeRespuesta.textContent = `Error: ${error.message}`;
                mensajeRespuesta.style.color = 'red';
            }
        }

        async function modoEdicion(id) {
            try {
                const response = await fetch(`${API_BASE_URL}/citas/${id}`);
                const cita = await response.json();

                formTitle.textContent = 'Editando Cita';
                citaIdInput.value = cita.idCita;
                document.getElementById('fecha').value = cita.fecha;
                document.getElementById('hora').value = cita.hora;
                servicioSelect.value = cita.servicio.idServicio;
                
                sedeSelect.value = cita.sede.idSede;
                await cargarBarberosPorSede(cita.sede.idSede); // Cargar barberos de la sede
                barberoSelect.value = cita.barbero.idBarbero; // Seleccionar el barbero
                
                submitButton.textContent = 'Actualizar Cita';
                cancelEditButton.style.display = 'block';
                window.scrollTo(0, 0); // Subir al formulario
            } catch (error) {
                console.error("Error al cargar datos para edición:", error);
            }
        }

        function cancelarEdicion() {
            formTitle.textContent = 'Agendar una Cita';
            citaForm.reset();
            nombreInput.value = clienteNombre; // Restaurar nombre
            apellidoInput.value = clienteApellido; // Restaurar apellido
            citaIdInput.value = '';
            submitButton.textContent = 'Agendar Cita';
            cancelEditButton.style.display = 'none';
        }

        cancelEditButton.addEventListener('click', cancelarEdicion);
        misCitasTableBody.addEventListener('click', function(event) {
            if (event.target.classList.contains('btn-eliminar')) {
                eliminarCita(event.target.dataset.id);
            }
            if (event.target.classList.contains('btn-editar')) {
                modoEdicion(event.target.dataset.id);
            }
        });

        citaForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const id = citaIdInput.value;
            const esEdicion = id !== '';
            
            const citaData = {
                fecha: document.getElementById('fecha').value,
                hora: document.getElementById('hora').value,
                cliente: { nombre: clienteNombre, apellido: clienteApellido },
                sede: { idSede: sedeSelect.value },
                barbero: { idBarbero: barberoSelect.value },
                servicio: { idServicio: servicioSelect.value }
            };

            const url = esEdicion ? `${API_BASE_URL}/citas/${id}` : `${API_BASE_URL}/citas`;
            const method = esEdicion ? 'PUT' : 'POST';

            try {
                const response = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(citaData)
                });

                if (response.ok) {
                    mensajeRespuesta.textContent = `Cita ${esEdicion ? 'actualizada' : 'agendada'} con éxito.`;
                    mensajeRespuesta.style.color = 'lightgreen';
                    cancelarEdicion();
                    cargarMisCitas();
                } else {
                    const error = await response.json();
                    throw new Error(error.message || `No se pudo ${esEdicion ? 'actualizar' : 'agendar'} la cita.`);
                }
            } catch (error) {
                mensajeRespuesta.textContent = `Error: ${error.message}`;
                mensajeRespuesta.style.color = 'red';
            }
        });

        // --- LLAMADAS INICIALES ---
        inicializarPagina();
        function inicializarPagina() {
            cargarSelectsIniciales();
            cargarMisCitas();
            // cargarTablaBarberos(); // Puedes decidir si aún necesitas esta tabla
        }
    }

    inicializarPagina();
});