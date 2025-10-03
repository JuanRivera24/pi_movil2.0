-- Insertar un par de sedes de ejemplo
INSERT INTO SEDES (ID_Sede, Nombre_Sede) VALUES (301, 'C.C Puerta del Norte');
INSERT INTO SEDES (ID_Sede, Nombre_Sede) VALUES (302, 'C.C Parque Fabricato');

-- Insertar un par de barberos de ejemplo
-- El último valor (ID_Sede) debe corresponder a una sede que ya exista
INSERT INTO BARBEROS (ID_Barbero, Nombre_Barbero, Apellido_Barbero, ID_Sede) VALUES (101, 'Ricardo', 'Gomez', 301);
INSERT INTO BARBEROS (ID_Barbero, Nombre_Barbero, Apellido_Barbero, ID_Sede) VALUES (102, 'Mateo', 'Ramírez', 302);

-- Insertar un par de servicios de ejemplo
INSERT INTO SERVICIOS (ID_Servicio, Nombre_Servicio, Precio, Duracion_min) VALUES (201, 'Corte Premium', 30000, 45);
INSERT INTO SERVICIOS (ID_Servicio, Nombre_Servicio, Precio, Duracion_min) VALUES (202, 'Afeitado Clásico', 18000, 30);