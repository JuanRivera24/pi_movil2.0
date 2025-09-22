package com.kingdombarber.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingdombarber.api.model.Barbero;
import com.kingdombarber.api.repository.BarberoRepository;

@RestController
@RequestMapping("/api/barberos") // The base path for this controller
@CrossOrigin
public class BarberoController {

    @Autowired
    private BarberoRepository barberoRepository;

    // This is the new endpoint.
    // It will respond to GET requests like /api/barberos/por-sede/1
    @GetMapping("/por-sede/{idSede}")
    public List<Barbero> getBarberosPorSede(@PathVariable Long idSede) {
        return barberoRepository.findBySedeIdSede(idSede);
    }
}