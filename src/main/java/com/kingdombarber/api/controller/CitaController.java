package com.kingdombarber.api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public List<Cita> getAllCitas(@RequestParam(required = false) String clienteNombre, @RequestParam(required = false) String clienteApellido) {
        if (clienteNombre != null && clienteApellido != null) {
            // --- CORRECCIÓN AQUÍ ---
            // El método se llama findByClienteNombreAndClienteApellido (sin guiones bajos)
            return citaRepository.findByClienteNombreAndClienteApellido(clienteNombre, clienteApellido);
        }
        return citaRepository.findAll();
    }

    @GetMapping("/barbero/{barberoId}")
    public List<Cita> getCitasByBarberoId(@PathVariable Long barberoId) {
        // --- CORRECCIÓN AQUÍ ---
        // El método se llama findByBarberoIdBarbero (sin guiones bajos)
        return citaRepository.findByBarberoIdBarbero(barberoId);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Cita> getCitaById(@PathVariable Long id) {
        Optional<Cita> citaOptional = citaRepository.findById(id);
        return citaOptional.map(cita -> new ResponseEntity<>(cita, HttpStatus.OK))
                           .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Cita> createCita(@RequestBody Cita cita) {
        Cliente clienteTemporal = cita.getCliente();
        
        // --- CORRECCIÓN AQUÍ ---
        // El método se llama findByNombreAndApellido
        Cliente clienteExistente = clienteRepository.findByNombreAndApellido(clienteTemporal.getNombre(), clienteTemporal.getApellido())
                                                    .orElseGet(() -> clienteRepository.save(clienteTemporal));
        cita.setCliente(clienteExistente);
        Cita nuevaCita = citaRepository.save(cita);
        return new ResponseEntity<>(nuevaCita, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cita> updateCita(@PathVariable Long id, @RequestBody Cita citaDetails) {
        return citaRepository.findById(id).map(cita -> {
            cita.setFecha(citaDetails.getFecha());
            cita.setHora(citaDetails.getHora());
            cita.setSede(citaDetails.getSede());
            cita.setBarbero(citaDetails.getBarbero());
            cita.setServicio(citaDetails.getServicio());
            Cita updatedCita = citaRepository.save(cita);
            return new ResponseEntity<>(updatedCita, HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCita(@PathVariable Long id) {
        return citaRepository.findById(id).map(cita -> {
            citaRepository.delete(cita);
            Map<String, Boolean> response = new HashMap<>();
            response.put("eliminado", true);
            return ResponseEntity.ok(response);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}