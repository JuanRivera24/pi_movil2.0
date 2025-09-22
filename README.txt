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

- Backend Robusto:
  Controladores y endpoints en Spring Boot para lógica de negocio 
  y persistencia de datos.

- Frontend Interactivo:
  Formularios HTML + JavaScript para procesar y enviar datos a la API.

- Separación de Roles:
  Flujos distintos y seguros para "Clientes" y "Barberos".

- Experiencia de Usuario Mejorada:
  Diseño bien estructurado, atractivo y funcional, 
  aun sin frameworks complejos.

- Simulación de Componentes y Estado:
  Aunque no se usa React, se aplican conceptos como "componentes" 
  (ej. detalle-cita.html) y paso de "props" (parámetros en la URL), 
  logrando una arquitectura modular y organizada.
