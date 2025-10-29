package com.kingdombarber.api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kingdombarber.api.model.NuevaCita;
import com.kingdombarber.api.repository.BarberoRepository;
import com.kingdombarber.api.repository.NuevaCitaRepository;
import com.kingdombarber.api.repository.SedeRepository;

@RestController
public class AgendamientoController {

    @Autowired
    private NuevaCitaRepository nuevaCitaRepository;
    
    @Autowired
    private SedeRepository sedeRepository;
    
    @Autowired
    private BarberoRepository barberoRepository;

    @GetMapping("/citas-activas")
    public List<NuevaCita> getAllNuevasCitas() {
        return nuevaCitaRepository.findAll();
    }

    @PostMapping("/citas-activas")
    public NuevaCita crearNuevaCita(@RequestBody NuevaCita nuevaCita) {
        // Lógica para enriquecer el objeto antes de guardarlo
        sedeRepository.findById(nuevaCita.getSedeId()).ifPresent(sede -> 
            nuevaCita.setNombreSede(sede.getNombreSede())
        );
        barberoRepository.findById(nuevaCita.getBarberId()).ifPresent(barbero -> 
            nuevaCita.setNombreCompletoBarbero(barbero.getNombreBarbero() + " " + barbero.getApellidoBarbero())
        );
        
        return nuevaCitaRepository.save(nuevaCita);
    }

    @PutMapping("/citas-activas/{id}")
    public ResponseEntity<NuevaCita> updateNuevaCita(@PathVariable String id, @RequestBody NuevaCita citaActualizada) {
        return nuevaCitaRepository.findById(id)
                .map(citaExistente -> {
                    // Actualizamos todos los campos relevantes de la cita existente
                    // con los datos que llegan de la petición.
                    citaExistente.setTitle(citaActualizada.getTitle());
                    citaExistente.setFechaInicio(citaActualizada.getFechaInicio());
                    citaExistente.setFechaFin(citaActualizada.getFechaFin());
                    citaExistente.setTotalCost(citaActualizada.getTotalCost());
                    citaExistente.setSedeId(citaActualizada.getSedeId());
                    citaExistente.setBarberId(citaActualizada.getBarberId());
                    citaExistente.setServices(citaActualizada.getServices());
                    citaExistente.setServiciosDetalle(citaActualizada.getServiciosDetalle());

                    // Volvemos a enriquecer los datos por si la sede o el barbero cambiaron
                    sedeRepository.findById(citaActualizada.getSedeId()).ifPresent(sede -> 
                        citaExistente.setNombreSede(sede.getNombreSede())
                    );
                    barberoRepository.findById(citaActualizada.getBarberId()).ifPresent(barbero -> 
                        citaExistente.setNombreCompletoBarbero(barbero.getNombreBarbero() + " " + barbero.getApellidoBarbero())
                    );
                    
                    // Guardamos la entidad completamente actualizada
                    NuevaCita guardada = nuevaCitaRepository.save(citaExistente);
                    return ResponseEntity.ok(guardada);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/citas-activas/{id}")
    public ResponseEntity<Map<String, String>> deleteNuevaCita(@PathVariable String id) {
        if (nuevaCitaRepository.existsById(id)) {
            nuevaCitaRepository.deleteById(id);
            Map<String, String> response = new HashMap<>();
            response.put("mensaje", "Cita con id '" + id + "' eliminada exitosamente.");
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("error", "No se encontró la cita con id '" + id + "'.");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
}