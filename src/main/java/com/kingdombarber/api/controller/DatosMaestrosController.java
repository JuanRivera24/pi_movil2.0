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

    @Autowired
    private SedeRepository sedeRepository;
    
    @Autowired
    private BarberoRepository barberoRepository;

    @Autowired
    private ServicioRepository servicioRepository;

    @GetMapping("/sedes")
    public List<Sede> getAllSedes() {
        return sedeRepository.findAll();
    }
    
    @GetMapping("/barberos")
    public List<Barbero> getAllBarberos() {
        return barberoRepository.findAll();
    }

    @GetMapping("/servicios")
    public List<Servicio> getAllServicios() {
        return servicioRepository.findAll();
    }
}