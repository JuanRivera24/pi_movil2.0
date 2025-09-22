document.addEventListener('DOMContentLoaded', function() {
    // --- REFERENCIAS A ELEMENTOS DEL DOM ---
    const btnCliente = document.getElementById('btn-cliente');
    const btnBarbero = document.getElementById('btn-barbero');
    const modal = document.getElementById('cliente-login-modal');
    const closeModal = document.querySelector('.modal-cerrar');
    const clienteLoginForm = document.getElementById('cliente-login-form');
    const mensaje = document.getElementById('login-mensaje');

    // --- LÓGICA DEL MODAL ---
    btnCliente.addEventListener('click', () => {
        modal.classList.remove('modal-oculto');
        modal.classList.add('modal-visible');
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('modal-visible');
        modal.classList.add('modal-oculto');
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('modal-visible');
            modal.classList.add('modal-oculto');
        }
    });

    // --- LÓGICA DE LOGIN ---
    clienteLoginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('login-nombre').value;
        const apellido = document.getElementById('login-apellido').value;

        if (nombre.trim() === '' || apellido.trim() === '') {
            mensaje.textContent = 'Por favor, ingresa nombre y apellido.';
            mensaje.style.color = 'red';
            return;
        }

        localStorage.setItem('clienteNombre', nombre);
        localStorage.setItem('clienteApellido', apellido);
        localStorage.setItem('userRole', 'cliente');
        
        // --> RUTA CORREGIDA
        window.location.href = '/cliente/citas.html'; 
    });

    btnBarbero.addEventListener('click', () => {
        localStorage.setItem('userRole', 'barbero');

        // --> RUTA CORREGIDA
        window.location.href = '/barbero/agenda.html';
    });
});