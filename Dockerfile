# --- Etapa de Construcción (Build Stage) ---
# Usamos una imagen de Maven para construir el proyecto
FROM maven:3.8.5-openjdk-17 AS build

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de configuración de Maven
COPY pom.xml .
COPY src ./src

# Ejecutamos el comando de Maven para construir el archivo .jar
# -DskipTests omite las pruebas para acelerar el build
RUN mvn clean install -DskipTests


# --- Etapa Final (Final Stage) ---
# Usamos una imagen ligera de Java para ejecutar la aplicación
FROM openjdk:17-jdk-slim

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos el archivo .jar construido desde la etapa anterior
# <-- ¡LÍNEA CORREGIDA CON TU ARCHIVO .JAR!
COPY --from=build /app/target/api-0.0.1-SNAPSHOT.jar app.jar

# Exponemos el puerto en el que corre la aplicación (Spring Boot usa 8080 por defecto)
EXPOSE 8080

# El comando para iniciar la aplicación cuando el contenedor arranque
ENTRYPOINT ["java", "-jar", "app.jar"]