package com.kingdombarber.api.controller;

import java.util.List;

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

@RestController // Anotación clave: Combina @Controller y @ResponseBody. Prepara la clase para recibir peticiones web.
@RequestMapping("/api") // Define una URL base para todos los endpoints de esta clase.
@CrossOrigin // Permite que nuestro frontend (que se servirá desde localhost) pueda hacerle peticiones.
public class DatosController {

    @Autowired // Inyección de dependencias: Spring nos "inyecta" una instancia lista para usar.
    private SedeRepository sedeRepository;

    @Autowired
    private ServicioRepository servicioRepository;

    @Autowired
    private BarberoRepository barberoRepository;

    // Endpoint para obtener todas las sedes
    @GetMapping("/sedes") // Se mapea a una petición GET a la URL /api/sedes
    public List<Sede> getAllSedes() {
        return sedeRepository.findAll(); // El método findAll() viene de JpaRepository
    }

    // Endpoint para obtener todos los servicios
    @GetMapping("/servicios") // URL: /api/servicios
    public List<Servicio> getAllServicios() {
        return servicioRepository.findAll();
    }

    // Endpoint para obtener todos los barberos
    @GetMapping("/barberos") // URL: /api/barberos
    public List<Barbero> getAllBarberos() {
        return barberoRepository.findAll();
    }
}