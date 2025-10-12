======================================================================
                 📱 KINGDOM BARBER - API CENTRAL (pi_movil2)
======================================================================

🗓️ Documentación: API Central - Kingdom Barber  
📅 Fecha: Octubre, 2025  
👥 Autores: Juan Rivera, Andrés Vallejo, Alejandro Urrego  

======================================================================
                         📖 DESCRIPCIÓN GENERAL
======================================================================

Este repositorio contiene el código fuente del **back-end principal**
del ecosistema **Kingdom Barber**.  

Es una **API RESTful** desarrollada con **Java + Spring Boot**, que actúa
como el cerebro y la **única fuente de verdad** para los proyectos:

- 💻 `pi_web2` → Aplicación web (Next.js / React + Tailwind)
- 📊 `pi_ntp` → Panel analítico con IA (Python / Streamlit)

La API centraliza toda la lógica de negocio, persistencia de datos y
comunicación entre clientes, asegurando integridad, escalabilidad y 
coherencia en todo el ecosistema.

======================================================================
                         🚀 INFORMACIÓN DE DESPLIEGUE
======================================================================

Plataforma: Render (https://render.com/)  
URL Pública: https://pi-movil2-0.onrender.com  
Base de Datos (Producción): PostgreSQL  

======================================================================
                        ⚙️ GUÍA DE EJECUCIÓN LOCAL
======================================================================

1️⃣ REQUISITOS PREVIOS  
----------------------
- ☕ Java JDK 17 o superior  
- 🧰 Apache Maven  
- 🐳 Docker (opcional, para contenedores)  

2️⃣ CLONAR Y EJECUTAR  
----------------------
git clone https://github.com/JuanRivera24/pi_movil2.0.git  
cd pi_movil2  

Ejecución con Maven Wrapper (recomendado):  
./mvnw spring-boot:run  

Servidor local: http://localhost:8080  

📌 NOTA:
En desarrollo usa una base H2 (en memoria).  
Los datos se cargan automáticamente desde `src/main/resources/data.sql`.

======================================================================
                          🧠 RESUMEN DEL PROYECTO
======================================================================

La API centraliza la lógica de negocio, seguridad y persistencia para
todo el ecosistema **Kingdom Barber**.  

Provee endpoints REST para operaciones CRUD de:
- Citas
- Barberos
- Clientes
- Servicios
- Sedes
- Galería
- Contacto

Esta arquitectura desacopla completamente el backend del frontend,
permitiendo que cada módulo evolucione de forma independiente.

======================================================================
                         🎯 OBJETIVOS DEL PROYECTO
======================================================================

🎯 OBJETIVO PRINCIPAL  
Centralizar toda la lógica de negocio y persistencia de datos en una
única API RESTful robusta, segura y escalable.

🧩 OBJETIVOS ESPECÍFICOS  
- Proveer endpoints REST claros para operaciones CRUD.  
- Desacoplar completamente las aplicaciones cliente.  
- Garantizar consistencia en los datos de todo el sistema.  
- Construir una base sólida y escalable para futuras integraciones.  

======================================================================
                         ⚙️ STACK TECNOLÓGICO
======================================================================

💻 Lenguaje: Java 17+  
🧱 Framework: Spring Boot 3.x  
🗄️ Acceso a Datos: Spring Data JPA / Hibernate  
💾 Base de Datos (Desarrollo): H2 (in-memory)  
📦 Base de Datos (Producción): PostgreSQL  
🌐 Servidor: Tomcat embebido  
🧩 Gestor de dependencias: Maven  
🐳 Contenerización: Docker  
✨ Utilidades: Lombok  

======================================================================
                   🏗️ ARQUITECTURA Y ESTRUCTURA DE CARPETAS
======================================================================

El proyecto sigue una estructura por capas, separando responsabilidades:

📂 src/main/java/com/kingdombarber/api/
│
├── controller/     → Controladores REST (reciben peticiones HTTP)
│   ├── AgendamientoController.java
│   ├── ContactoController.java
│   ├── DatosMaestrosController.java
│   ├── GaleriaController.java
│   └── DashboardController.java
│
├── model/          → Entidades JPA (Barbero, Cita, Cliente, Servicio, etc.)
├── repository/     → Interfaces JPA para operaciones CRUD
├── service/        → Lógica de negocio (servicios intermedios)
├── config/         → Configuración general (CORS, Logging)
└── ApiApplication.java → Clase principal (punto de entrada)

📂 src/main/resources/
├── application.properties → Configuración (DB, servidor)
└── data.sql → Datos iniciales de desarrollo  

======================================================================
                     🌐 ENDPOINTS PRINCIPALES
======================================================================

🧾 DATOS MAESTROS  
GET /sedes → Lista todas las sedes  
GET /barberos → Lista todos los barberos  
GET /servicios → Lista todos los servicios  

📊 DASHBOARD (Consumido por pi_ntp)  
GET /historial/citas → Devuelve el historial completo  
GET /clientes → Lista de clientes  

🗓️ AGENDAMIENTO (Consumido por pi_web2)  
GET /citas-activas → Lista citas activas  
POST /citas-activas → Crea una nueva cita  
PUT /citas-activas/{id} → Modifica una cita existente  
DELETE /citas-activas/{id} → Elimina una cita  

💬 CONTACTO  
POST /contactanos → Recibe mensajes desde el formulario  

🖼️ GALERÍA  
GET /galeria → Obtiene imágenes  
POST /galeria → Sube imagen en formato Base64  
PUT /galeria/{id} → Actualiza metadatos  
DELETE /galeria/{id} → Elimina imagen  

📎 Nota:  
Las imágenes se guardan en Base64 en la base de datos, facilitando el
despliegue en entornos contenerizados (Render).

======================================================================
                  🔁 FLUJO DE DATOS - CREACIÓN DE CITA
======================================================================

1️⃣ El cliente (pi_web2) llena el formulario de cita y envía un JSON.  
2️⃣ Se realiza un `POST /citas-activas` a la API.  
3️⃣ Spring Boot convierte el JSON a una entidad Java (`Cita`).  
4️⃣ El controlador valida y delega al servicio correspondiente.  
5️⃣ El servicio llama al repositorio (`CitaRepository.save()`).  
6️⃣ Hibernate traduce la operación a un `INSERT` en PostgreSQL.  
7️⃣ La API devuelve un JSON con la cita creada.  
8️⃣ El frontend actualiza su interfaz mostrando la nueva reserva.  

======================================================================
                    ✅ EJEMPLO DE PETICIÓN / RESPUESTA
======================================================================

📤 REQUEST  
POST /citas-activas  
Content-Type: application/json  

{
  "fecha": "2025-11-02",
  "hora": "14:00",
  "cliente": { "nombre": "Juan", "apellido": "Pérez" },
  "sede": { "idSede": 1 },
  "barbero": { "idBarbero": 3 },
  "servicio": { "idServicio": 2 }
}

📥 RESPONSE  
{
  "idCita": 23,
  "fecha": "2025-11-02",
  "hora": "14:00",
  "barbero": { "nombre": "Andrés", "apellido": "Gómez" },
  "servicio": { "nombreServicio": "Corte y Barba" },
  "estado": "Confirmada"
}

======================================================================
                    🔐 CONSIDERACIONES DE SEGURIDAD
======================================================================

- Configurar CORS solo para los dominios de confianza.  
- Validar todas las entradas en el servidor.  
- Usar perfiles de entorno para separar credenciales.  
- En producción, proteger endpoints con JWT o Spring Security.  

======================================================================
                  📦 DESPLIEGUE EN RENDER - RESUMEN
======================================================================

- Compilar con Maven (`mvn clean package`).  
- Subir al repositorio conectado a Render.  
- Configurar variables de entorno (DB_URL, PROFILE).  
- Render despliega automáticamente la API y realiza health checks.  

======================================================================
                      📚 AUTORES Y CONTACTO
======================================================================

👤 Juan Manuel Rivera  
👤 Andrés Vallejo  
👤 Alejandro Urrego  

Repositorio oficial:  
🔗 https://github.com/JuanRivera24/pi_movil2.0.git  

======================================================================
                         🧩 FIN DE DOCUMENTO
======================================================================

