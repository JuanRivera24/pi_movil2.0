// Usamos 'DOMContentLoaded' para asegurarnos de que el HTML esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // --> ¡NUEVO! Bloque de seguridad y carga de datos del cliente
    const clienteNombre = localStorage.getItem('clienteNombre');
    const clienteApellido = localStorage.getItem('clienteApellido');
    const userRole = localStorage.getItem('userRole');

    // 1. Verificamos si el usuario es un cliente. Si no, lo redirigimos al inicio.
    if (userRole !== 'cliente' || !clienteNombre || !clienteApellido) {
        alert('Acceso no autorizado. Por favor, identifíquese como cliente.');
        window.location.href = '/index.html'; // Lo mandamos a la página de login
        return; // Detenemos la ejecución del resto del script
    }

    // 2. Obtenemos los campos de nombre y apellido del formulario.
    const nombreInput = document.getElementById('cliente-nombre');
    const apellidoInput = document.getElementById('cliente-apellido');
    
    // 3. Rellenamos los campos y los hacemos de solo lectura.
    nombreInput.value = clienteNombre;
    nombreInput.readOnly = true;
    apellidoInput.value = clienteApellido;
    apellidoInput.readOnly = true;
    // --> FIN DEL BLOQUE NUEVO

    // URL base de nuestra API. Cambiar si es necesario.
    const API_BASE_URL = 'http://localhost:8080/api';

    // Obtenemos referencias a los elementos del formulario y la tabla
    const sedeSelect = document.getElementById('sede');
    const barberoSelect = document.getElementById('barbero');
    const servicioSelect = document.getElementById('servicio');
    const barberosTableBody = document.querySelector('#barberos-table tbody');
    const citaForm = document.getElementById('cita-form');
    const mensajeRespuesta = document.getElementById('mensaje-respuesta');
    const submitButton = document.querySelector('#cita-form button[type="submit"]');

    // --- FUNCIÓN PARA CARGAR DATOS EN LOS SELECTS (MENÚS DESPLEGABLES) ---
    // (Esta función no necesita cambios, se queda igual)
    async function cargarSelects() {
        try {
            const [sedesRes, barberosRes, serviciosRes] = await Promise.all([
                fetch(`${API_BASE_URL}/sedes`),
                fetch(`${API_BASE_URL}/barberos`),
                fetch(`${API_BASE_URL}/servicios`)
            ]);
            const sedes = await sedesRes.json();
            const barberos = await barberosRes.json();
            const servicios = await serviciosRes.json();

            sedeSelect.innerHTML = '<option value="">Seleccione una sede</option>';
            sedes.forEach(sede => {
                const option = document.createElement('option');
                option.value = sede.idSede;
                option.textContent = sede.nombreSede;
                sedeSelect.appendChild(option);
            });

            barberoSelect.innerHTML = '<option value="">Seleccione un barbero</option>';
            barberos.forEach(barbero => {
                const option = document.createElement('option');
                option.value = barbero.idBarbero;
                option.textContent = `${barbero.nombre} ${barbero.apellido}`;
                barberoSelect.appendChild(option);
            });

            servicioSelect.innerHTML = '<option value="">Seleccione un servicio</option>';
            servicios.forEach(servicio => {
                const option = document.createElement('option');
                option.value = servicio.idServicio;
                option.textContent = `${servicio.nombreServicio} - $${servicio.precio}`;
                servicioSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error cargando datos para los formularios:', error);
        }
    }

    // --- FUNCIÓN PARA CARGAR LA TABLA DE BARBEROS ---
    // (Esta función no necesita cambios, se queda igual)
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

    // --- MANEJO DEL ENVÍO DEL FORMULARIO ---
    citaForm.addEventListener('submit', async function(event) {
        event.preventDefault(); 
        submitButton.disabled = true;
        submitButton.textContent = 'Agendando...';
        mensajeRespuesta.textContent = 'Agendando tu cita...';
        mensajeRespuesta.style.color = '#d4af37';

        // Ahora los datos del cliente ya están en los campos del formulario
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
                // Volvemos a poner los datos del cliente después de limpiar el form
                nombreInput.value = clienteNombre;
                apellidoInput.value = clienteApellido;
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
    cargarSelects();
    cargarTablaBarberos();
});