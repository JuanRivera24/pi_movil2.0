======================================================================
                 KINGDOM BARBER - SISTEMA DE GESTIÓN DE CITAS
======================================================================

📜 DESCRIPCIÓN GENERAL
----------------------

Kingdom Barber es una aplicación web completa desarrollada con Spring Boot 
y Vanilla JavaScript, diseñada para modernizar y simplificar la gestión de 
citas en una barbería. 

La plataforma ofrece dos portales distintos:
- Portal del Cliente
- Portal del Barbero

Cada uno con funcionalidades específicas para sus necesidades, garantizando 
una experiencia de usuario fluida e intuitiva.

El proyecto demuestra una arquitectura robusta de backend y un frontend 
dinámico e interactivo, cumpliendo con las mejores prácticas de desarrollo 
de software para crear una solución escalable y fácil de mantener.

======================================================================
                   ✨ CARACTERÍSTICAS PRINCIPALES
======================================================================

-----------------------------
-- PORTAL DEL CLIENTE --
-----------------------------

- Reservar Cita:
  Un formulario intuitivo permite a los clientes seleccionar la sede, 
  el barbero, el servicio deseado y la fecha/hora para su cita.

- Visualizar Barberos:
  Los clientes pueden explorar la lista de barberos disponibles 
  en cada una de las sedes de la barbería.

- Gestión de Citas:
  Permite modificar los detalles de una reserva existente o 
  cancelarla si es necesario.

-----------------------------
-- PORTAL DEL BARBERO --
-----------------------------

- Inicio de Sesión por Sede:
  Los barberos seleccionan su sede y luego su nombre para acceder a 
  su agenda personal.

- Visualización de Agenda:
  Muestra una lista clara y ordenada de todas las citas agendadas, 
  incluyendo fecha, hora, nombre del cliente y servicio.

- Detalles de la Cita:
  Al hacer clic en una cita, el barbero es redirigido a una página 
  dedicada con todos los detalles del servicio y del cliente, 
  facilitando la preparación para el trabajo.

- Cancelación de Citas:
  Permite a los barberos cancelar una cita directamente 
  desde su agenda.

======================================================================
               🛠️ TECNOLOGÍAS Y ARQUITECTURA
======================================================================

-----------------------------
-- BACKEND (SPRING BOOT) --
-----------------------------

- Framework: Spring Boot
- Lenguaje: Java
- Arquitectura: Modelo-Vista-Controlador (MVC) adaptado para API REST

**Componentes Clave:**
- Controladores (/controller): Endpoints RESTful para operaciones CRUD 
  de citas, barberos, clientes, etc.
- Modelos (/model): Entidades JPA que definen la estructura de datos.
- Repositorios (/repository): Interfaces que utilizan Spring Data JPA 
  para interactuar con la base de datos.

**Base de Datos:**
- Configurada en `application.properties`
- Datos iniciales cargados con `data.sql`

-----------------------------
-- FRONTEND (VANILLA JS, HTML5, CSS3) --
-----------------------------

- Lenguajes: JavaScript (ES6+), HTML5, CSS3
- Librerías/Frameworks: Ninguno (Vanilla JS para demostrar dominio web)

**Características Clave:**
- Peticiones a la API con `fetch` para comunicación asíncrona.
- Manipulación del DOM para mostrar listas de citas, barberos y detalles.
- Gestión de datos en formato JSON entre cliente y servidor.
- Diseño responsivo con CSS para una experiencia visual agradable.

======================================================================
        ✅ CUMPLIMIENTO DE REQUISITOS DEL PROYECTO
======================================================================

-----------------------------
-- FRONTEND --
-----------------------------

- Formularios de Ingreso (inputs, submit en HTML):  
  CUMPLE. El sistema cuenta con formularios claros para agendar citas, 
  seleccionar sede y filtrar datos.

- Captura de Datos con FormData y JSON:  
  CUMPLE. JavaScript captura los valores de los formularios, los convierte 
  en objetos JSON y los envía al backend.

- Peticiones y Envío de Datos con fetch:  
  CUMPLE. Los scripts (cliente.js, barbero.js, detalle-cita.js) usan fetch 
  para operaciones GET, POST y DELETE con la API de Spring Boot.

- Presentación HTML con Diseño Mejorado:  
  CUMPLE. La interfaz cuenta con estilo en CSS y organización en tarjetas, 
  superando un diseño básico.

-----------------------------
-- BACKEND --
-----------------------------

- Recepción de Datos vía API REST:  
  CUMPLE. Controladores como `CitaController.java` implementan endpoints 
  RESTful (@GetMapping, @PostMapping, etc.).

- Procesamiento de Datos (Casos de Uso):  
  CUMPLE. La lógica incluye validaciones como verificar si un cliente 
  existe antes de crear uno nuevo.

- Conexión con Base de Datos (CRUD):  
  CUMPLE. Repositorios JPA permiten crear, leer, actualizar y eliminar 
  citas, clientes y barberos.

- Generación de Respuestas JSON:  
  CUMPLE. Los controladores devuelven objetos o listas que Spring Boot 
  convierte automáticamente en JSON.

-----------------------------
-- REQUISITOS ADICIONALES --
-----------------------------

- Ingreso por Roles (Cliente/Barbero):  
  CUMPLE. El sistema diferencia roles y redirige a vistas específicas 
  para cada tipo de usuario.  

- Funcionalidad del Cliente:  
  CUMPLE. Puede ver barberos, sedes, servicios y pedir citas mediante 
  un formulario.  

- Funcionalidad del Barbero:  
  CUMPLE. Puede visualizar su agenda, consultar detalles de citas y 
  cancelarlas directamente.  

- Experiencia de Usuario Optimizada:  
  CUMPLE. Diseño estructurado, validaciones y flujo amigable.  

- Simulación de Componentes y Estado:  
  CUMPLE. Aunque no se usa React, el sistema simula componentes con 
  páginas reutilizables (ej. detalle-cita.html) y paso de datos mediante 
  parámetros en la URL.
