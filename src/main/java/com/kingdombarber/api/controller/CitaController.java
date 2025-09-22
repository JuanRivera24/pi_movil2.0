package com.kingdombarber.api.controller;

import java.util.List;
import java.util.Optional; // <-- IMPORT AÑADIDO

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable; // <-- IMPORT AÑADIDO
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingdombarber.api.model.Cita;
import com.kingdombarber.api.model.Cliente;
import com.kingdombarber.api.repository.CitaRepository;
import com.kingdombarber.api.repository.ClienteRepository;

@RestController
@RequestMapping("/api/citas")
@CrossOrigin
public class CitaController {

    @Autowired
    private CitaRepository citaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<Cita> getAllCitas() {
        return citaRepository.findAll();
    }

    // --- NUEVO MÉTODO AÑADIDO ---
    // Endpoint para OBTENER una cita por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Cita> getCitaById(@PathVariable Long id) {
        Optional<Cita> citaOptional = citaRepository.findById(id);
        
        if (citaOptional.isPresent()) {
            return new ResponseEntity<>(citaOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    // --- FIN DEL NUEVO MÉTODO ---

    @PostMapping
    @Transactional
    public ResponseEntity<Cita> createCita(@RequestBody Cita cita) {
        Cliente clienteTemporal = cita.getCliente();
        Cliente clienteGuardado = clienteRepository.save(clienteTemporal);
        cita.setCliente(clienteGuardado);
        Cita nuevaCita = citaRepository.save(cita);
        return new ResponseEntity<>(nuevaCita, HttpStatus.CREATED);
    }
}