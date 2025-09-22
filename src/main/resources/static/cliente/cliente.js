// Usamos 'DOMContentLoaded' para asegurarnos de que el HTML esté completamente cargado
// antes de intentar manipularlo con JavaScript.
document.addEventListener('DOMContentLoaded', function() {

    // URL base de nuestra API. Cambiar si es necesario.
    const API_BASE_URL = 'http://localhost:8080/api';

    // Obtenemos referencias a los elementos del formulario y la tabla
    const sedeSelect = document.getElementById('sede');
    const barberoSelect = document.getElementById('barbero');
    const servicioSelect = document.getElementById('servicio');
    const barberosTableBody = document.querySelector('#barberos-table tbody');
    const citaForm = document.getElementById('cita-form');
    const mensajeRespuesta = document.getElementById('mensaje-respuesta');

    // --- FUNCIÓN PARA CARGAR DATOS EN LOS SELECTS (MENÚS DESPLEGABLES) ---
    async function cargarSelects() {
        try {
            // Hacemos las 3 peticiones a la API en paralelo para más eficiencia
            const [sedesRes, barberosRes, serviciosRes] = await Promise.all([
                fetch(`${API_BASE_URL}/sedes`),
                fetch(`${API_BASE_URL}/barberos`),
                fetch(`${API_BASE_URL}/servicios`)
            ]);

            const sedes = await sedesRes.json();
            const barberos = await barberosRes.json();
            const servicios = await serviciosRes.json();

            // Llenamos el select de sedes
            sedeSelect.innerHTML = '<option value="">Seleccione una sede</option>'; // Opción por defecto
            sedes.forEach(sede => {
                const option = document.createElement('option');
                option.value = sede.idSede;
                option.textContent = sede.nombreSede;
                sedeSelect.appendChild(option);
            });

            // Llenamos el select de barberos
            barberoSelect.innerHTML = '<option value="">Seleccione un barbero</option>';
            barberos.forEach(barbero => {
                const option = document.createElement('option');
                option.value = barbero.idBarbero;
                option.textContent = `${barbero.nombre} ${barbero.apellido}`;
                barberoSelect.appendChild(option);
            });

            // Llenamos el select de servicios
            servicioSelect.innerHTML = '<option value="">Seleccione un servicio</option>';
            servicios.forEach(servicio => {
                const option = document.createElement('option');
                option.value = servicio.idServicio;
                option.textContent = `${servicio.nombreServicio} - $${servicio.precio}`;
                servicioSelect.appendChild(option);
            });

        } catch (error) {
            console.error('Error cargando datos para los formularios:', error);
            // Podrías mostrar un mensaje de error al usuario aquí
        }
    }

    // --- FUNCIÓN PARA CARGAR LA TABLA DE BARBEROS ---
    async function cargarTablaBarberos() {
        try {
            const response = await fetch(`${API_BASE_URL}/barberos`);
            const barberos = await response.json();

            barberosTableBody.innerHTML = ''; // Limpiamos el mensaje de "Cargando..."

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
        event.preventDefault(); // Evita que la página se recargue al enviar el formulario

        // Mostramos un mensaje de espera
        mensajeRespuesta.textContent = 'Agendando tu cita...';
        mensajeRespuesta.style.color = '#d4af37';

        // Creamos un objeto "cliente" temporal con los datos del formulario.
        // En una app real, esto vendría de un login.
        const clienteData = {
            nombre: document.getElementById('cliente-nombre').value,
            apellido: document.getElementById('cliente-apellido').value,
            // Podríamos añadir teléfono y email si quisiéramos
        };

        // Construimos el objeto CITA que nuestra API espera recibir
        const nuevaCita = {
            fecha: document.getElementById('fecha').value,
            hora: document.getElementById('hora').value,
            cliente: clienteData, // Temporalmente enviamos el objeto cliente
            sede: { idSede: sedeSelect.value },
            barbero: { idBarbero: barberoSelect.value },
            servicio: { idServicio: servicioSelect.value }
        };

        try {
            const response = await fetch(`${API_BASE_URL}/citas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaCita), // Convertimos el objeto a un string JSON
            });

            if (response.status === 201) { // 201 Created
                const citaCreada = await response.json();
                mensajeRespuesta.textContent = `¡Cita agendada con éxito para el ${citaCreada.fecha} a las ${citaCreada.hora}!`;
                mensajeRespuesta.style.color = 'lightgreen';
                citaForm.reset(); // Limpia el formulario
            } else {
                throw new Error('El servidor respondió con un error.');
            }

        } catch (error) {
            console.error('Error al crear la cita:', error);
            mensajeRespuesta.textContent = 'Hubo un error al agendar la cita. Por favor, inténtalo de nuevo.';
            mensajeRespuesta.style.color = 'red';
        }
    });


    // --- LLAMADAS INICIALES AL CARGAR LA PÁGINA ---
    cargarSelects();
    cargarTablaBarberos();

});
