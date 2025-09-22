package com.kingdombarber.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired; // Importa la clase Cliente
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity; // Importa el repositorio de Cliente
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody; // Importa Transactional
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

    // Inyectamos el repositorio de Cliente que necesitamos
    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<Cita> getAllCitas() {
        return citaRepository.findAll();
    }

    // REEMPLAZA TU MÉTODO createCita CON ESTE
    @PostMapping
    @Transactional // Anotación importante: asegura que todo el método se ejecute como una única transacción
    public ResponseEntity<Cita> createCita(@RequestBody Cita cita) {
        
        // 1. Extraemos el objeto cliente que viene en el JSON de la cita
        Cliente clienteTemporal = cita.getCliente();
        
        // 2. Guardamos este cliente en la base de datos.
        // Spring Data JPA es inteligente y nos devolverá el objeto guardado con su nuevo ID.
        Cliente clienteGuardado = clienteRepository.save(clienteTemporal);
        
        // 3. Asignamos el cliente (ya con ID) de vuelta a la cita.
        cita.setCliente(clienteGuardado);
        
        // 4. Ahora sí, guardamos la cita completa con todas sus relaciones correctas.
        Cita nuevaCita = citaRepository.save(cita);
        
        return new ResponseEntity<>(nuevaCita, HttpStatus.CREATED);
    }
}