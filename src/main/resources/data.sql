-- =========== INSERTAR DATOS EN LA TABLA SEDE ===========
INSERT INTO sede (id_sede, nombre_sede) VALUES (301, 'C.C Puerta del Norte');
INSERT INTO sede (id_sede, nombre_sede) VALUES (302, 'C.C Parque Fabricato');
INSERT INTO sede (id_sede, nombre_sede) VALUES (303, 'C.C La Central');
INSERT INTO sede (id_sede, nombre_sede) VALUES (304, 'C.C Los Molinos');
INSERT INTO sede (id_sede, nombre_sede) VALUES (305, 'C.C Santafé');
INSERT INTO sede (id_sede, nombre_sede) VALUES (306, 'C.C Premium Plaza');

-- =========== INSERTAR DATOS EN LA TABLA BARBERO ===========
-- Barberos de Puerta del Norte (Sede 301)
INSERT INTO barbero (id_barbero, nombre, apellido, id_sede) VALUES (101, 'Ricardo', 'Gómez', 301);
INSERT INTO barbero (id_barbero, nombre, apellido, id_sede) VALUES (102, 'Mateo', 'Ramírez', 301);
-- Barberos de Parque Fabricato (Sede 302)
INSERT INTO barbero (id_barbero, nombre, apellido, id_sede) VALUES (103, 'Javier', 'Hernández', 302);
INSERT INTO barbero (id_barbero, nombre, apellido, id_sede) VALUES (104, 'Andrés', 'Silva', 302);
-- Barberos de La Central (Sede 303)
INSERT INTO barbero (id_barbero, nombre, apellido, id_sede) VALUES (105, 'Carlos', 'Vargas', 303);
INSERT INTO barbero (id_barbero, nombre, apellido, id_sede) VALUES (106, 'Luis', 'Mendoza', 303);


-- =========== INSERTAR DATOS EN LA TABLA SERVICIO ===========
INSERT INTO servicio (id_servicio, nombre_servicio, precio, duracion_min) VALUES (201, 'Corte Premium', 25000, 45);
INSERT INTO servicio (id_servicio, nombre_servicio, precio, duracion_min) VALUES (202, 'Afeitado Clásico', 18000, 30);
INSERT INTO servicio (id_servicio, nombre_servicio, precio, duracion_min) VALUES (203, 'Arreglo de Barba', 15000, 25);
INSERT INTO servicio (id_servicio, nombre_servicio, precio, duracion_min) VALUES (204, 'Ritual Completo (Corte + Barba)', 40000, 70);
INSERT INTO servicio (id_servicio, nombre_servicio, precio, duracion_min) VALUES (205, 'Corte Clásico', 20000, 40);
INSERT INTO servicio (id_servicio, nombre_servicio, precio, duracion_min) VALUES (210, 'Coloración de Barba', 18000, 30);


-- =========== INSERTAR DATOS EN LA TABLA CLIENTE ===========
INSERT INTO cliente (id_cliente, nombre, apellido, telefono, email) VALUES (1, 'Juan', 'Pérez', '3109876543', 'juan.perez@email.com');
INSERT INTO cliente (id_cliente, nombre, apellido, telefono, email) VALUES (2, 'Carlos', 'López', '3201234567', 'carlos.lopez@email.com');
INSERT INTO cliente (id_cliente, nombre, apellido, telefono, email) VALUES (8, 'Miguel', 'Castro', '3111234567', 'miguel.castro@email.com');
INSERT INTO cliente (id_cliente, nombre, apellido, telefono, email) VALUES (68, 'Jorge', 'Rojas', '3157654321', 'jorge.rojas@email.com');

-- =========== INSERTAR DATOS EN LA TABLA CITA (VERSIÓN CORREGIDA) ===========
-- Nota: Usaremos los IDs de los datos que acabamos de insertar.
INSERT INTO cita (id_cita, id_cliente, id_barbero, id_servicio, id_sede, fecha, hora) VALUES (1001, 8, 105, 210, 303, '2025-03-14', '10:00:00');
INSERT INTO cita (id_cita, id_cliente, id_barbero, id_servicio, id_sede, fecha, hora) VALUES (1002, 68, 103, 201, 302, '2025-02-28', '09:00:00');
