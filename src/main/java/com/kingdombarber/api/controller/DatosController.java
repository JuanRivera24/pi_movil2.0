package com.kingdombarber.api.controller;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingdombarber.api.model.Barbero;
import com.kingdombarber.api.model.Sede;
import com.kingdombarber.api.model.Servicio;
import com.kingdombarber.api.repository.BarberoRepository;
import com.kingdombarber.api.repository.SedeRepository;
import com.kingdombarber.api.repository.ServicioRepository;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class DatosController {

    @Autowired
    private SedeRepository sedeRepository;
    @Autowired
    private ServicioRepository servicioRepository;
    @Autowired
    private BarberoRepository barberoRepository;

    @PostConstruct
    @Transactional
    public void init() {
        // --- Carga de Sedes (solo si está vacío) ---
        if (sedeRepository.count() == 0) {
            System.out.println("Cargando sedes iniciales con los nombres correctos...");
            List<Sede> sedes = Arrays.asList(
                crearSede("C.C Puerta del Norte"),
                crearSede("C.C Parque Fabricato"),
                crearSede("C.C La Central"),
                crearSede("C.C Los Molinos"),
                crearSede("C.C Santafé"),
                crearSede("C.C Premium Plaza")
            );
            sedeRepository.saveAll(sedes);
        }

        // --- Carga de Servicios (sin cambios) ---
        if (servicioRepository.count() == 0) {
            System.out.println("Cargando servicios iniciales...");
            List<Servicio> servicios = Arrays.asList(
                crearServicio("Corte Premium", 25000, 45),
                crearServicio("Afeitado Clásico", 18000, 30),
                crearServicio("Arreglo de Barba", 15000, 25),
                crearServicio("Ritual Completo (Corte + Barba)", 40000, 70),
                crearServicio("Corte Clásico", 20000, 40),
                crearServicio("Corte Infantil", 15000, 30),
                crearServicio("Perfilado de Cejas", 12000, 15),
                crearServicio("Limpieza Facial Express", 22000, 25),
                crearServicio("Limpieza Facial Profunda", 35000, 50),
                crearServicio("Coloración de Barba", 18000, 30),
                crearServicio("Tinte Capilar", 30000, 45),
                crearServicio("Masaje Capilar Relajante", 20000, 20),
                crearServicio("Exfoliación Facial", 28000, 30),
                crearServicio("Tratamiento Capilar Nutritivo", 40000, 50),
                crearServicio("Paquete Ejecutivo (Corte + Barba + Facial)", 60000, 90)
            );
            servicioRepository.saveAll(servicios);
        }

        // --- Carga de Barberos (sin cambios) ---
        if (barberoRepository.count() == 0) {
            System.out.println("Cargando lista COMPLETA de barberos...");
            Map<String, Sede> sedesMap = sedeRepository.findAll().stream()
                .collect(Collectors.toMap(Sede::getNombreSede, Function.identity()));

            List<Barbero> barberos = Arrays.asList(
                // ... (el resto de la lista de barberos no necesita cambios)
                 // C.C Puerta del Norte
                crearBarbero("Ricardo", "Gómez", sedesMap.get("C.C Puerta del Norte")),
                crearBarbero("Mateo", "Ramírez", sedesMap.get("C.C Puerta del Norte")),
                crearBarbero("Carlos", "Fernández", sedesMap.get("C.C Puerta del Norte")),
                crearBarbero("Andrés", "Torres", sedesMap.get("C.C Puerta del Norte")),
                crearBarbero("Juan", "Martínez", sedesMap.get("C.C Puerta del Norte")),
                crearBarbero("Fernando", "Castillo", sedesMap.get("C.C Puerta del Norte")),
                crearBarbero("Luis", "Rodríguez", sedesMap.get("C.C Puerta del Norte")),
                crearBarbero("David", "Morales", sedesMap.get("C.C Puerta del Norte")),
                crearBarbero("Santiago", "Herrera", sedesMap.get("C.C Puerta del Norte")),
                crearBarbero("Diego", "Sánchez", sedesMap.get("C.C Puerta del Norte")),
                crearBarbero("Esteban", "Ríos", sedesMap.get("C.C Puerta del Norte")),
                crearBarbero("Julián", "Vargas", sedesMap.get("C.C Puerta del Norte")),
                crearBarbero("Alejandro", "Navarro", sedesMap.get("C.C Puerta del Norte")),
                crearBarbero("Valeria", "Torres", sedesMap.get("C.C Puerta del Norte")),
                crearBarbero("Laura", "Gutiérrez", sedesMap.get("C.C Puerta del Norte")),
                // C.C Parque Fabricato
                crearBarbero("Sebastián", "Cárdenas", sedesMap.get("C.C Parque Fabricato")),
                crearBarbero("Jorge", "Patiño", sedesMap.get("C.C Parque Fabricato")),
                crearBarbero("Mauricio", "López", sedesMap.get("C.C Parque Fabricato")),
                crearBarbero("Camilo", "Duarte", sedesMap.get("C.C Parque Fabricato")),
                crearBarbero("Natalia", "Jiménez", sedesMap.get("C.C Parque Fabricato")),
                crearBarbero("Felipe", "Mejía", sedesMap.get("C.C Parque Fabricato")),
                crearBarbero("Tomás", "Giraldo", sedesMap.get("C.C Parque Fabricato")),
                crearBarbero("Cristian", "Pérez", sedesMap.get("C.C Parque Fabricato")),
                crearBarbero("Daniel", "Gómez", sedesMap.get("C.C Parque Fabricato")),
                crearBarbero("Oscar", "Mendoza", sedesMap.get("C.C Parque Fabricato")),
                crearBarbero("Martín", "Suárez", sedesMap.get("C.C Parque Fabricato")),
                crearBarbero("Hernán", "Quintero", sedesMap.get("C.C Parque Fabricato")),
                crearBarbero("Pablo", "Vélez", sedesMap.get("C.C Parque Fabricato")),
                crearBarbero("Andrea", "Restrepo", sedesMap.get("C.C Parque Fabricato")),
                crearBarbero("Gloria", "Salazar", sedesMap.get("C.C Parque Fabricato")),
                // C.C La Central
                crearBarbero("Hugo", "Rendón", sedesMap.get("C.C La Central")),
                crearBarbero("Ramiro", "Jaramillo", sedesMap.get("C.C La Central")),
                crearBarbero("Nicolás", "García", sedesMap.get("C.C La Central")),
                crearBarbero("Federico", "Marín", sedesMap.get("C.C La Central")),
                crearBarbero("Cristóbal", "Zapata", sedesMap.get("C.C La Central")),
                crearBarbero("Rafael", "Pérez", sedesMap.get("C.C La Central")),
                crearBarbero("Simón", "Cano", sedesMap.get("C.C La Central")),
                crearBarbero("Gustavo", "Álvarez", sedesMap.get("C.C La Central")),
                crearBarbero("Iván", "Correa", sedesMap.get("C.C La Central")),
                crearBarbero("Álvaro", "Cardona", sedesMap.get("C.C La Central")),
                crearBarbero("Pedro", "Villegas", sedesMap.get("C.C La Central")),
                crearBarbero("Jairo", "Castaño", sedesMap.get("C.C La Central")),
                crearBarbero("Andrés", "Ortiz", sedesMap.get("C.C La Central")),
                crearBarbero("Mariana", "Londoño", sedesMap.get("C.C La Central")),
                crearBarbero("Camila", "Salas", sedesMap.get("C.C La Central")),
                // C.C Los Molinos
                crearBarbero("Julián", "Mesa", sedesMap.get("C.C Los Molinos")),
                crearBarbero("Samuel", "Henao", sedesMap.get("C.C Los Molinos")),
                crearBarbero("Felipe", "Córdoba", sedesMap.get("C.C Los Molinos")),
                crearBarbero("Rodrigo", "Jiménez", sedesMap.get("C.C Los Molinos")),
                crearBarbero("Germán", "Valencia", sedesMap.get("C.C Los Molinos")),
                crearBarbero("Manuel", "Mora", sedesMap.get("C.C Los Molinos")),
                crearBarbero("Óscar", "Bedoya", sedesMap.get("C.C Los Molinos")),
                crearBarbero("Darío", "Restrepo", sedesMap.get("C.C Los Molinos")),
                crearBarbero("Henry", "Zuluaga", sedesMap.get("C.C Los Molinos")),
                crearBarbero("Adrián", "Castaño", sedesMap.get("C.C Los Molinos")),
                crearBarbero("León", "Ortiz", sedesMap.get("C.C Los Molinos")),
                crearBarbero("Jhon", "Arango", sedesMap.get("C.C Los Molinos")),
                crearBarbero("Ómar", "Muñoz", sedesMap.get("C.C Los Molinos")),
                crearBarbero("Paula", "García", sedesMap.get("C.C Los Molinos")),
                crearBarbero("Daniela", "Franco", sedesMap.get("C.C Los Molinos")),
                // C.C Santafé
                crearBarbero("Cristian", "Arias", sedesMap.get("C.C Santafé")),
                crearBarbero("Jairo", "Suárez", sedesMap.get("C.C Santafé")),
                crearBarbero("Elkin", "Berrío", sedesMap.get("C.C Santafé")),
                crearBarbero("Wilson", "Ortiz", sedesMap.get("C.C Santafé")),
                crearBarbero("Camilo", "Gaviria", sedesMap.get("C.C Santafé")),
                crearBarbero("Orlando", "Sierra", sedesMap.get("C.C Santafé")),
                crearBarbero("Sergio", "Villa", sedesMap.get("C.C Santafé")),
                crearBarbero("Andrés", "Muñoz", sedesMap.get("C.C Santafé")),
                crearBarbero("Nicolás", "Ríos", sedesMap.get("C.C Santafé")),
                crearBarbero("Julio", "Botero", sedesMap.get("C.C Santafé")),
                crearBarbero("Miguel", "Salinas", sedesMap.get("C.C Santafé")),
                crearBarbero("Iván", "Ochoa", sedesMap.get("C.C Santafé")),
                crearBarbero("Ramiro", "Jiménez", sedesMap.get("C.C Santafé")),
                crearBarbero("Liliana", "Castro", sedesMap.get("C.C Santafé")),
                crearBarbero("Carolina", "López", sedesMap.get("C.C Santafé")),
                // C.C Premium Plaza
                crearBarbero("Héctor", "Zapata", sedesMap.get("C.C Premium Plaza")),
                crearBarbero("Óscar", "García", sedesMap.get("C.C Premium Plaza")),
                crearBarbero("Mauricio", "Quintero", sedesMap.get("C.C Premium Plaza")),
                crearBarbero("Álvaro", "Pérez", sedesMap.get("C.C Premium Plaza")),
                crearBarbero("David", "Sierra", sedesMap.get("C.C Premium Plaza")),
                crearBarbero("Andrés", "Cardona", sedesMap.get("C.C Premium Plaza")),
                crearBarbero("Juan", "Molina", sedesMap.get("C.C Premium Plaza")),
                crearBarbero("Santiago", "Ceballos", sedesMap.get("C.C Premium Plaza")),
                crearBarbero("Camilo", "Agudelo", sedesMap.get("C.C Premium Plaza")),
                crearBarbero("Felipe", "Vallejo", sedesMap.get("C.C Premium Plaza")),
                crearBarbero("Leonardo", "Tobón", sedesMap.get("C.C Premium Plaza")),
                crearBarbero("Martín", "Montoya", sedesMap.get("C.C Premium Plaza")),
                crearBarbero("Esteban", "Restrepo", sedesMap.get("C.C Premium Plaza")),
                crearBarbero("Juliana", "Ramírez", sedesMap.get("C.C Premium Plaza")),
                crearBarbero("Manuela", "Jiménez", sedesMap.get("C.C Premium Plaza"))
            );
            barberoRepository.saveAll(barberos);
        }
    }

    // --- Métodos de ayuda ---
    private Sede crearSede(String nombre) {
        Sede s = new Sede();
        s.setNombreSede(nombre);
        return s;
    }

    private Servicio crearServicio(String nombre, double precio, int duracion) {
        Servicio s = new Servicio();
        s.setNombreServicio(nombre);
        s.setPrecio(precio);
        s.setDuracionMin(duracion);
        return s;
    }

    private Barbero crearBarbero(String nombre, String apellido, Sede sede) {
        Barbero b = new Barbero();
        b.setNombre(nombre);
        b.setApellido(apellido);
        b.setSede(sede);
        return b;
    }

    // --- Endpoints ---
    // *********************** ¡AQUÍ ESTÁ LA CORRECCIÓN! ***********************
    @GetMapping("/sedes")
    public List<Sede> getAllSedes() {
        // Usamos un Stream para asegurar que la lista no tenga duplicados antes de enviarla.
        // También la ordenamos por ID para mantener un orden consistente.
        return sedeRepository.findAll().stream()
                .sorted(Comparator.comparing(Sede::getIdSede))
                .distinct() // Garantiza que cada sede sea única
                .collect(Collectors.toList());
    }
    // ************************************************************************

    @GetMapping("/servicios") public List<Servicio> getAllServicios() { return servicioRepository.findAll(); }
    @GetMapping("/barberos") public List<Barbero> getAllBarberos() { return barberoRepository.findAll(); }
}