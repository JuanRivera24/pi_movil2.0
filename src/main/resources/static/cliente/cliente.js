document.addEventListener('DOMContentLoaded', function() {
    
    // Función única que se ejecuta al cargar la página
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
        
        // Contenedor para la nueva lista de barberos
        const barberosContainer = document.getElementById('barberos-por-sede-container');

        // --- LÓGICA DE CARGA INICIAL (Selects del formulario) ---
        async function cargarSelectsIniciales() {
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
                const response = await fetch(`${API_BASE_URL}/barberos/por-sede/${idSede}`);
                if (!response.ok) throw new Error('Respuesta de red no fue ok.');
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

        // --- NUEVA FUNCIÓN PARA MOSTRAR BARBEROS AGRUPADOS POR SEDE ---
        async function cargarBarberosAgrupadosPorSede() {
            try {
                const [sedesRes, barberosRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/sedes`),
                    fetch(`${API_BASE_URL}/barberos`)
                ]);
                
                if (!sedesRes.ok || !barberosRes.ok) {
                   throw new Error("No se pudo obtener la lista de sedes o barberos.");
                }

                const sedesOriginal = await sedesRes.json();
                const barberos = await barberosRes.json();
                
                // Aseguramos sedes únicas
                const sedesUnicas = [...new Map(sedesOriginal.map(sede => [sede.nombreSede, sede])).values()];
                
                barberosContainer.innerHTML = ''; // Limpiamos el mensaje "Cargando..."

                sedesUnicas.forEach(sede => {
                    // Creamos el contenedor para cada sede (el desplegable)
                    const sedeWrapper = document.createElement('div');
                    sedeWrapper.className = 'sede-acordeon';
                    
                    // Creamos el botón que muestra el nombre de la sede
                    const sedeBoton = document.createElement('button');
                    sedeBoton.className = 'sede-acordeon-boton';
                    sedeBoton.textContent = sede.nombreSede;
                    
                    // Creamos el panel que contendrá la lista de barberos (inicialmente oculto)
                    const panelBarberos = document.createElement('div');
                    panelBarberos.className = 'sede-acordeon-panel';
                    
                    // Filtramos los barberos que pertenecen a esta sede
                    const barberosDeSede = barberos.filter(b => b.sede.nombreSede === sede.nombreSede);

                    if (barberosDeSede.length > 0) {
                        const lista = document.createElement('ul');
                        barberosDeSede.forEach(barbero => {
                            const item = document.createElement('li');
                            item.textContent = `${barbero.nombre} ${barbero.apellido}`;
                            lista.appendChild(item);
                        });
                        panelBarberos.appendChild(lista);
                    } else {
                        panelBarberos.innerHTML = '<p>No hay barberos asignados a esta sede.</p>';
                    }
                    
                    sedeWrapper.appendChild(sedeBoton);
                    sedeWrapper.appendChild(panelBarberos);
                    barberosContainer.appendChild(sedeWrapper);
                    
                    // Lógica para mostrar/ocultar el panel
                    sedeBoton.addEventListener('click', function() {
                        this.classList.toggle('active');
                        const panel = this.nextElementSibling;
                        if (panel.style.maxHeight) {
                            panel.style.maxHeight = null;
                        } else {
                            panel.style.maxHeight = panel.scrollHeight + "px";
                        }
                    });
                });
                
                // Añadimos los estilos para el acordeón directamente
                const style = document.createElement('style');
                style.textContent = `
                    .sede-acordeon-boton { background-color: #1f2a40; color: #a4915a; cursor: pointer; padding: 18px; width: 100%; border: none; text-align: left; outline: none; font-size: 1.1em; transition: 0.4s; margin-top: 5px; font-family: 'Cinzel', serif; }
                    .sede-acordeon-boton.active, .sede-acordeon-boton:hover { background-color: #2a3a5a; }
                    .sede-acordeon-panel { padding: 0 18px; background-color: #1c2639; max-height: 0; overflow: hidden; transition: max-height 0.2s ease-out; }
                    .sede-acordeon-panel ul { list-style-type: none; padding: 15px 0; }
                    .sede-acordeon-panel li { padding: 8px 0; border-bottom: 1px solid #2a3a5a; color: #ccc; }
                    .sede-acordeon-panel li:last-child { border-bottom: none; }
                `;
                document.head.appendChild(style);

            } catch(error) {
                console.error("Error al cargar barberos por sede:", error);
                barberosContainer.innerHTML = '<p class="text-center" style="color: red;">Error al cargar la lista de barberos.</p>';
            }
        }
        
        // --- LÓGICA PARA GESTIONAR CITAS (Editar, Eliminar) ---
        // (Todo el código de cargarMisCitas, eliminarCita, modoEdicion, etc., permanece aquí sin cambios)
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
                    cargarMisCitas();
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
                await cargarBarberosPorSede(cita.sede.idSede);
                barberoSelect.value = cita.barbero.idBarbero;
                
                submitButton.textContent = 'Actualizar Cita';
                cancelEditButton.style.display = 'block';
                window.scrollTo(0, 0);
            } catch (error) {
                console.error("Error al cargar datos para edición:", error);
            }
        }

        function cancelarEdicion() {
            formTitle.textContent = 'Agendar una Cita';
            citaForm.reset();
            nombreInput.value = clienteNombre;
            apellidoInput.value = clienteApellido;
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
        
        // --- LLAMADAS INICIALES CORREGIDAS ---
        cargarSelectsIniciales();
        cargarMisCitas();
        cargarBarberosAgrupadosPorSede(); // <- ¡Llamamos a la nueva función aquí!
    }

    // --- PUNTO DE ENTRADA ---
    inicializarPagina();
});