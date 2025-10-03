package com.kingdombarber.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingdombarber.api.model.Barbero;
import com.kingdombarber.api.model.Sede;
import com.kingdombarber.api.model.Servicio;
import com.kingdombarber.api.repository.BarberoRepository;
import com.kingdombarber.api.repository.SedeRepository;
import com.kingdombarber.api.repository.ServicioRepository;

@RestController
public class DatosMaestrosController {

    // @Autowired le pide a Spring que nos "inyecte" una instancia funcional
    // de nuestros repositorios para que podamos usarlos.
    @Autowired
    private SedeRepository sedeRepository;
    
    @Autowired
    private BarberoRepository barberoRepository;

    @Autowired
    private ServicioRepository servicioRepository;

    // Este método se ejecutará cuando se pida la URL: GET http://localhost:8080/sedes
    @GetMapping("/sedes")
    public List<Sede> getAllSedes() {
        // Spring convierte la lista de Sedes a JSON automáticamente
        return sedeRepository.findAll();
    }
    
    // URL: GET http://localhost:8080/barberos
    @GetMapping("/barberos")
    public List<Barbero> getAllBarberos() {
        return barberoRepository.findAll();
    }

    // URL: GET http://localhost:8080/servicios
    @GetMapping("/servicios")
    public List<Servicio> getAllServicios() {
        return servicioRepository.findAll();
    }
}