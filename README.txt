======================================================================
         📱 KINGDOM BARBER - API CENTRAL (pi_movil2)
======================================================================

🗓️ **Documentación: API Móviles 2 - Kingdom Barber**  
📅 **Fecha:** Octubre, 2025  
👥 **Autores:** Juan Rivera, Andrés Vallejo, Alejandro Urrego  

Este repositorio contiene el código del **back-end** para todo el ecosistema de Kingdom Barber.  
Es una **API RESTful** desarrollada con **Java y Spring Boot**, que actúa como el cerebro y la **única fuente de verdad** para todos los clientes front-end (`pi_web2.0` y `pi_ntp2.0`).

======================================================================
        📖 GUÍA DE EJECUCIÓN Y MANUAL DE ENDPOINTS
======================================================================

-----------------------------
-- 1. REQUISITOS PREVIOS --
-----------------------------

Antes de empezar, asegúrate de tener instalado lo siguiente en tu sistema:

- ☕ **Java Development Kit (JDK)** – Versión 17 o superior  
- 🧰 **Apache Maven** – Para compilar el proyecto y gestionar dependencias  

-----------------------------
-- 2. INSTALACIÓN Y EJECUCIÓN --
-----------------------------

**Paso 1: Clonar el Repositorio**
```
git clone https://github.com/JuanRivera24/pi_movil2.0.git
cd pi_movil2
```

**Paso 2: Compilar y Ejecutar la Aplicación**

Ejecutar "Run" en ApiApplication.java, o dar click en "Run Java"


La forma más sencilla de ejecutar un proyecto Spring Boot es utilizando el Maven Wrapper incluido:

```bash
# En Windows
./mvnw spring-boot:run

# En macOS/Linux
./mvnw spring-boot:run
```

El servidor se iniciará y la API estará disponible en:  
👉 **http://localhost:8080**

**Nota sobre la Base de Datos:**  
La API utiliza una base de datos en memoria **H2**, lo que significa que:
- No necesitas instalar ninguna base de datos.
- Los datos se cargan desde `src/main/resources/data.sql` cada vez que la aplicación arranca.

======================================================================
               🧠 1. RESUMEN DEL PROYECTO
======================================================================

Esta API es el **núcleo** y la **fuente única de verdad** para todo el ecosistema **Kingdom Barber**.  
Desarrollada con **Java y Spring Boot**, centraliza la lógica de negocio y la persistencia de datos,  
sirviendo información de forma consistente a múltiples clientes.

**Clientes que consumen esta API:**
- 💻 `pi_web2.0`: Aplicación web moderna (Next.js) para agendar citas, ver servicios y contactar la barbería.  
- 📊 `pi_ntp2.0`: Dashboard de análisis en **Python/Streamlit** para reportes y visualizaciones.

Esta arquitectura **desacopla completamente** el backend de los frontends,  
permitiendo que cada componente evolucione de forma independiente.

======================================================================
               🎯 2. OBJETIVOS DEL PROYECTO
======================================================================

-----------------------------
-- OBJETIVO PRINCIPAL --
-----------------------------

Centralizar toda la lógica de negocio y la persistencia de datos del ecosistema **Kingdom Barber**  
en una **única API RESTful** robusta, segura y escalable.

-----------------------------
-- OBJETIVOS ESPECÍFICOS --
-----------------------------

- ✅ **Proveer Endpoints Claros:** Endpoints RESTful bien definidos para operaciones CRUD (citas, galería, datos maestros, etc.)  
- 🧩 **Desacoplar Clientes:** Permitir que los front-ends funcionen sin depender del almacenamiento de datos.  
- 🔄 **Garantizar Consistencia:** Unificar lectura y escritura de datos para evitar duplicidad.  
- 🚀 **Base Escalable:** Preparar el sistema para soportar nuevos clientes (como apps móviles).

======================================================================
               ⚙️ 3. STACK TECNOLÓGICO
======================================================================

- 💻 **Lenguaje:** Java 17+  
- 🧱 **Framework Principal:** Spring Boot 3.x  
- 🗄️ **Acceso a Datos:** Spring Data JPA / Hibernate  
- 🧬 **Base de Datos:** H2 Database (en memoria para desarrollo y pruebas)  
- 🌐 **Servidor Web:** Apache Tomcat (embebido)  
- 🧩 **Gestor de Dependencias:** Maven  
- ✨ **Utilidades:** Lombok (reduce código repetitivo en modelos)

======================================================================
          🏗️ 4. ARQUITECTURA Y ESTRUCTURA DE CARPETAS
======================================================================

El proyecto sigue una arquitectura **API REST estándar**, organizada por responsabilidades:

```
src/main/java/com/kingdombarber/api/
├── 📂 controller/   # Reciben peticiones HTTP y definen las URLs (endpoints)
│   ├── AgendamientoController.java
│   ├── ContactoController.java
│   ├── DashboardController.java
│   ├── DatosMaestrosController.java
│   └── GaleriaController.java
│
├── 📂 model/        # Clases @Entity que representan las tablas de la base de datos
│   ├── Barbero.java
│   ├── Cita.java
│   ├── Cliente.java
│   ├── Contacto.java
│   ├── Galeria.java
│   ├── NuevaCita.java
│   ├── Sede.java
│   └── Servicio.java
│
├── 📂 repository/   # Interfaces que extienden JpaRepository para CRUD
│   ├── BarberoRepository.java
│   ├── CitaRepository.java
│   └── ... (otros repositorios)
│
├── 📜 ApiApplication.java              # Punto de entrada principal
├── 📜 WebConfig.java                   # Configuración CORS y archivos estáticos
└── 📜 RequestLoggingInterceptor.java   # Middleware para registrar peticiones
```

```
src/main/resources/
├── 📜 application.properties  # Configuración de la base de datos, servidor, etc.
└── 📜 data.sql                # Script SQL para la carga inicial de datos
```

======================================================================
          🌐 5. DESCRIPCIÓN DE ENDPOINTS PRINCIPALES
======================================================================

-----------------------------
-- DatosMaestrosController --
-----------------------------
- `GET /sedes` → Lista todas las sedes  
- `GET /barberos` → Lista todos los barberos  
- `GET /servicios` → Lista todos los servicios  

-----------------------------
-- DashboardController (pi_ntp2.0) --
-----------------------------
- `GET /historial/citas` → Devuelve el historial completo (~4000 registros)  
- `GET /clientes` → Devuelve la lista de clientes  

-----------------------------
-- AgendamientoController (pi_web2.0) --
-----------------------------
- `GET /citas-activas` → Devuelve las citas activas  
- `POST /citas-activas` → Crea una nueva cita  
- `PUT /citas-activas/{id}` → Modifica una cita existente  
- `DELETE /citas-activas/{id}` → Elimina una cita  

-----------------------------
-- ContactoController --
-----------------------------
- `POST /contactanos` → Recibe y guarda mensajes del formulario de contacto  

-----------------------------
-- GaleriaController --
-----------------------------
- `GET /galeria` → Devuelve imágenes de la galería  
- `POST /galeria/upload` → Sube una nueva imagen con descripción y categoría  
- `PUT /galeria/{id}` → Modifica la información de una imagen  
- `DELETE /galeria/{id}` → Elimina una imagen (de la base de datos y del disco)

======================================================================
       🔁 6. FLUJO DE DATOS: CREACIÓN DE UNA CITA
======================================================================

1️⃣ **Cliente Front-End (pi_web2.0):**  
El usuario completa el formulario de agendamiento y confirma la cita.

2️⃣ **JavaScript (React):**  
Captura los datos, construye un objeto JSON y envía una petición `POST` a  
`http://localhost:8080/citas-activas`.

3️⃣ **Controlador (API Java):**  
`AgendamientoController` recibe la petición con `@PostMapping("/citas-activas")`.  
Spring Boot convierte automáticamente el cuerpo JSON en un objeto `NuevaCita`.

4️⃣ **Lógica de Negocio:**  
El controlador complementa la información (por ejemplo, sede o servicio)  
y llama al repositorio correspondiente.

5️⃣ **Repositorio (JPA):**  
`NuevaCitaRepository.save()` ejecuta el `INSERT INTO` en la base de datos H2.

6️⃣ **Respuesta del Back-End:**  
Devuelve la entidad creada como JSON con código `200 OK`.

7️⃣ **Actualización del Front-End:**  
React recibe la respuesta, actualiza su estado y muestra un mensaje de éxito.

======================================================================
        🧩 FIN DE LA DOCUMENTACIÓN TÉCNICA
======================================================================
