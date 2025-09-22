// Usamos 'DOMContentLoaded' para asegurarnos de que el HTML esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Bloque de seguridad y carga de datos del cliente (sin cambios)
    const clienteNombre = localStorage.getItem('clienteNombre');
    const clienteApellido = localStorage.getItem('clienteApellido');
    const userRole = localStorage.getItem('userRole');

    if (userRole !== 'cliente' || !clienteNombre || !clienteApellido) {
        alert('Acceso no autorizado. Por favor, identifíquese como cliente.');
        window.location.href = '/index.html';
        return;
    }

    const nombreInput = document.getElementById('cliente-nombre');
    const apellidoInput = document.getElementById('cliente-apellido');
    
    nombreInput.value = clienteNombre;
    nombreInput.readOnly = true;
    apellidoInput.value = clienteApellido;
    apellidoInput.readOnly = true;

    // URL base de nuestra API
    const API_BASE_URL = 'http://localhost:8080/api';

    // Referencias a elementos del formulario y la tabla
    const sedeSelect = document.getElementById('sede');
    const barberoSelect = document.getElementById('barbero');
    const servicioSelect = document.getElementById('servicio');
    const barberosTableBody = document.querySelector('#barberos-table tbody');
    const citaForm = document.getElementById('cita-form');
    const mensajeRespuesta = document.getElementById('mensaje-respuesta');
    const submitButton = document.querySelector('#cita-form button[type="submit"]');

    // --- FUNCIÓN PARA CARGAR DATOS EN LOS SELECTS (MENÚS DESPLEGABLES) ---
    // --> MODIFICADO: Ya no cargamos todos los barberos al inicio.
    async function cargarSelectsIniciales() {
        try {
            // Solo cargamos sedes y servicios al principio.
            const [sedesRes, serviciosRes] = await Promise.all([
                fetch(`${API_BASE_URL}/sedes`),
                fetch(`${API_BASE_URL}/servicios`)
            ]);
            const sedes = await sedesRes.json();
            const servicios = await serviciosRes.json();

            // Llenado de sedes
            sedeSelect.innerHTML = '<option value="">Seleccione una sede</option>';
            sedes.forEach(sede => {
                const option = document.createElement('option');
                option.value = sede.idSede;
                option.textContent = sede.nombreSede;
                sedeSelect.appendChild(option);
            });
            
            // Llenado de servicios (con el formato mejorado que ya tenías)
            servicioSelect.innerHTML = '<option value="">Seleccione un servicio</option>';
            servicios.forEach(servicio => {
                const option = document.createElement('option');
                option.value = servicio.idServicio;
                const precioFormateado = servicio.precio.toLocaleString('es-CO');
                option.textContent = `${servicio.nombreServicio} - ${servicio.duracionMin} min - $${precioFormateado}`;
                servicioSelect.appendChild(option);
            });
            
            // --> NUEVO: Deshabilitamos el selector de barberos al inicio
            barberoSelect.disabled = true;
            barberoSelect.innerHTML = '<option value="">Primero seleccione una sede</option>';

        } catch (error) {
            console.error('Error cargando datos iniciales para los formularios:', error);
        }
    }

    // --- NUEVA FUNCIÓN PARA CARGAR BARBEROS BASADO EN LA SEDE ---
    async function cargarBarberosPorSede(idSede) {
        // Si no se selecciona una sede, vaciamos y deshabilitamos el select de barberos
        if (!idSede) {
            barberoSelect.innerHTML = '<option value="">Primero seleccione una sede</option>';
            barberoSelect.disabled = true;
            return;
        }

        try {
            // Hacemos la llamada al nuevo endpoint que creamos
            const response = await fetch(`${API_BASE_URL}/barberos/por-sede/${idSede}`);
            if (!response.ok) {
                throw new Error('No se pudieron cargar los barberos para la sede seleccionada.');
            }
            const barberos = await response.json();

            // Llenamos el select de barberos con los datos recibidos
            barberoSelect.innerHTML = '<option value="">Seleccione un barbero</option>';
            barberos.forEach(barbero => {
                const option = document.createElement('option');
                option.value = barbero.idBarbero;
                option.textContent = `${barbero.nombre} ${barbero.apellido}`;
                barberoSelect.appendChild(option);
            });

            // Habilitamos el selector para que el usuario pueda elegir
            barberoSelect.disabled = false;

        } catch (error) {
            console.error('Error al cargar barberos por sede:', error);
            barberoSelect.innerHTML = '<option value="">Error al cargar barberos</option>';
            barberoSelect.disabled = true;
        }
    }
    
    // --- FUNCIÓN PARA CARGAR LA TABLA DE BARBEROS (sin cambios) ---
    async function cargarTablaBarberos() {
        try {
            const response = await fetch(`${API_BASE_URL}/barberos`);
            const barberos = await response.json();
            barberosTableBody.innerHTML = ''; 

            if (barberos.length === 0) {
                barberosTableBody.innerHTML = '<tr><td colspan="3">No hay barberos disponibles.</td></tr>';
                return;
            }

            barberos.forEach(barbero => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${barbero.nombre}</td>
                    <td>${barbero.apellido}</td>
                    <td>${barbero.sede.nombreSede}</td>
                `;
                barberosTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error cargando la tabla de barberos:', error);
            barberosTableBody.innerHTML = '<tr><td colspan="3">Error al cargar los datos.</td></tr>';
        }
    }
    
    // --- NUEVO EVENT LISTENER PARA EL CAMBIO DE SEDE ---
    // Este es el "pegamento" que une todo.
    sedeSelect.addEventListener('change', function() {
        const idSedeSeleccionada = this.value; // Obtenemos el ID de la sede del <option>
        cargarBarberosPorSede(idSedeSeleccionada);
    });

    // --- MANEJO DEL ENVÍO DEL FORMULARIO (sin cambios) ---
    citaForm.addEventListener('submit', async function(event) {
        event.preventDefault(); 
        submitButton.disabled = true;
        submitButton.textContent = 'Agendando...';
        mensajeRespuesta.textContent = 'Agendando tu cita...';
        mensajeRespuesta.style.color = '#d4af37';

        const clienteData = {
            nombre: nombreInput.value,
            apellido: apellidoInput.value,
        };
        const nuevaCita = {
            fecha: document.getElementById('fecha').value,
            hora: document.getElementById('hora').value,
            cliente: clienteData,
            sede: { idSede: sedeSelect.value },
            barbero: { idBarbero: barberoSelect.value },
            servicio: { idServicio: servicioSelect.value }
        };

        try {
            const response = await fetch(`${API_BASE_URL}/citas`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevaCita),
            });

            if (response.status === 201) {
                const citaCreada = await response.json();
                mensajeRespuesta.textContent = `¡Cita agendada con éxito para el ${citaCreada.fecha} a las ${citaCreada.hora}!`;
                mensajeRespuesta.style.color = 'lightgreen';
                citaForm.reset();
                nombreInput.value = clienteNombre;
                apellidoInput.value = clienteApellido;
                // --> MODIFICADO: Reseteamos el select de barberos
                barberoSelect.innerHTML = '<option value="">Primero seleccione una sede</option>';
                barberoSelect.disabled = true;
            } else {
                 const errorData = await response.json();
                 mensajeRespuesta.textContent = `Error: ${errorData.message || 'No se pudo agendar la cita.'}`;
                 mensajeRespuesta.style.color = 'red';
            }
        } catch (error) {
            console.error('Error al crear la cita:', error);
            mensajeRespuesta.textContent = 'Hubo un error de conexión al agendar la cita. Por favor, inténtalo de nuevo.';
            mensajeRespuesta.style.color = 'red';
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Agendar Cita';
        }
    });

    // --- LLAMADAS INICIALES AL CARGAR LA PÁGINA ---
    cargarSelectsIniciales(); // --> MODIFICADO: Llamamos a la nueva función
    cargarTablaBarberos();
});