======================================================================
           📱 DOCUMENTACIÓN: API MÓVILES 2 - KINGDOM BARBER
======================================================================

📅 **Fecha:** Octubre, 2025  
👨‍💻 **Autores:** Juan Rivera, Andrés Vallejo, Alejandro Urrego

======================================================================
                     🧠 RESUMEN DEL PROYECTO
======================================================================

Esta API es el **cerebro y la fuente única de verdad** para todo el ecosistema 
de aplicaciones de Kingdom Barber.  

Desarrollada con **Java y Spring Boot**, su propósito es **centralizar toda la lógica de negocio 
y la persistencia de datos**, sirviendo información de manera consistente a múltiples clientes.

Actualmente, esta API da servicio a dos aplicaciones cliente:

- **pi_web2.0 (Front-End Web):**  
  Aplicación moderna desarrollada en Next.js donde los clientes pueden ver información, 
  agendar citas, explorar la galería y contactar a la barbería.

- **pi_ntp2.0 (Dashboard de Análisis):**  
  Aplicación en Python/Streamlit que consume grandes volúmenes de datos históricos 
  para generar visualizaciones, reportes y análisis de negocio.

La arquitectura desacopla completamente el back-end de los front-ends, 
permitiendo que cada pieza del sistema evolucione de forma independiente.

======================================================================
                     🎯 OBJETIVOS DEL PROYECTO
======================================================================

-----------------------------
-- OBJETIVO PRINCIPAL --
-----------------------------

Centralizar toda la lógica de negocio y la persistencia de datos del ecosistema 
Kingdom Barber en una única **API RESTful** robusta, segura y escalable.

-----------------------------
-- OBJETIVOS ESPECÍFICOS --
-----------------------------

- **Proveer Endpoints Claros:**  
  Exponer un conjunto de endpoints RESTful bien definidos para operaciones CRUD 
  (citas, galería, datos maestros, etc.).

- **Desacoplar Clientes:**  
  Eliminar la dependencia de los clientes sobre la forma en que se almacenan los datos, 
  permitiendo cambios o escalabilidad sin afectar los front-ends.

- **Garantizar la Consistencia:**  
  Asegurar que todas las aplicaciones consuman y modifiquen la misma fuente de datos, 
  evitando inconsistencias y duplicidad.

- **Establecer una Base Escalable:**  
  Sentar las bases para que futuros clientes, como una aplicación móvil, 
  puedan integrarse fácilmente sin modificar la lógica del back-end.

======================================================================
                  ⚙️ STACK TECNOLÓGICO
======================================================================

- **Lenguaje:** Java 17+  
- **Framework Principal:** Spring Boot 3.x  
- **Acceso a Datos:** Spring Data JPA / Hibernate  
- **Base de Datos:** H2 Database (en memoria para desarrollo y pruebas)  
- **Servidor Web:** Apache Tomcat (embebido)  
- **Gestor de Dependencias:** Maven  
- **Utilidades:** Lombok (para reducir código repetitivo en los modelos)

======================================================================
             🏗️ ARQUITECTURA Y ESTRUCTURA DE CARPETAS
======================================================================

El proyecto sigue una arquitectura **API REST** estándar, organizada por responsabilidades:

```
src/main/java/com/kingdombarber/api/
├── 📂 controller/   # Reciben peticiones HTTP y definen los endpoints.
│   ├── AgendamientoController.java
│   ├── ContactoController.java
│   ├── DashboardController.java
│   ├── DatosMaestrosController.java
│   └── GaleriaController.java
│
├── 📂 model/        # Clases @Entity que representan las tablas de la base de datos.
│   ├── Barbero.java
│   ├── Cita.java
│   ├── Cliente.java
│   ├── Contacto.java
│   ├── Galeria.java
│   ├── NuevaCita.java
│   ├── Sede.java
│   └── Servicio.java
│
├── 📂 repository/   # Interfaces que extienden JpaRepository para las operaciones CRUD.
│   ├── BarberoRepository.java
│   ├── CitaRepository.java
│   └── ... (otros repositorios)
│
├── 📜 ApiApplication.java             # Punto de entrada principal.
├── 📜 WebConfig.java                  # Configuración de CORS y archivos estáticos.
└── 📜 RequestLoggingInterceptor.java  # Middleware para registrar peticiones.

src/main/resources/
├── 📜 application.properties   # Configuración de base de datos y servidor.
└── 📜 data.sql                 # Script SQL para la carga inicial de datos.
```

======================================================================
               🔗 DESCRIPCIÓN DE ENDPOINTS PRINCIPALES
======================================================================

La API está organizada en los siguientes controladores:

-----------------------------
-- DATOS MAESTROS --
-----------------------------

**DatosMaestrosController**
- `GET /sedes` → Devuelve la lista de todas las sedes.  
- `GET /barberos` → Devuelve la lista de todos los barberos.  
- `GET /servicios` → Devuelve la lista de todos los servicios.

-----------------------------
-- DASHBOARD (pi_ntp2.0) --
-----------------------------

**DashboardController**
- `GET /historial/citas` → Devuelve el historial completo de citas (~4000 registros).  
- `GET /clientes` → Devuelve la lista completa de clientes.

-----------------------------
-- AGENDAMIENTO (pi_web2.0) --
-----------------------------

**AgendamientoController**
- `GET /citas-activas` → Devuelve las citas del calendario.  
- `POST /citas-activas` → Crea una nueva cita.  
- `PUT /citas-activas/{id}` → Modifica una cita existente.  
- `DELETE /citas-activas/{id}` → Elimina una cita.

-----------------------------
-- CONTACTO (pi_web2.0) --
-----------------------------

**ContactoController**
- `POST /contactanos` → Recibe y guarda un nuevo mensaje del formulario de contacto.

-----------------------------
-- GALERÍA (pi_web2.0) --
-----------------------------

**GaleriaController**
- `GET /galeria` → Devuelve la lista de imágenes.  
- `POST /galeria/upload` → Sube una nueva imagen con descripción y categoría.  
- `PUT /galeria/{id}` → Modifica la información de una imagen.  
- `DELETE /galeria/{id}` → Elimina una imagen (de la base de datos y del disco).

======================================================================
              🔄 FLUJO DE DATOS: CREACIÓN DE UNA CITA
======================================================================

1. **Cliente Front-End (pi_web2.0):**  
   El usuario completa el formulario de agendamiento y confirma la cita.

2. **JavaScript (React):**  
   El componente construye un objeto JSON y envía una petición `POST` al endpoint  
   `http://localhost:8080/citas-activas` usando `fetch()`.

3. **Controlador (API Java):**  
   `AgendamientoController` recibe la petición mediante `@PostMapping("/citas-activas")`.  
   Spring Boot convierte el cuerpo JSON en un objeto `NuevaCita`.

4. **Lógica de Negocio:**  
   El controlador enriquece el objeto (por ejemplo, obteniendo el nombre de la sede)  
   y lo envía al repositorio correspondiente.

5. **Repositorio (JPA):**  
   `NuevaCitaRepository.save()` genera e ejecuta una sentencia `INSERT INTO` en la base de datos H2.

6. **Respuesta del Back-End:**  
   Spring Boot devuelve la entidad completa como JSON junto con un código de estado `200 OK`.

7. **Actualización del Front-End:**  
   React actualiza su estado interno, agrega el nuevo evento al calendario  
   y muestra una notificación de éxito al usuario.

======================================================================
✅ FIN DE LA DOCUMENTACIÓN
======================================================================
