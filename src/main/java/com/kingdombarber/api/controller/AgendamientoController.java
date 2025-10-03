package com.kingdombarber.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kingdombarber.api.model.NuevaCita;
import com.kingdombarber.api.repository.NuevaCitaRepository;

@RestController
public class AgendamientoController {

    @Autowired
    private NuevaCitaRepository nuevaCitaRepository;

    /**
     * READ: Obtiene todas las citas activas para el calendario.
     * Endpoint: GET /nuevas-citas
     */
    @GetMapping("/nuevas-citas")
    public List<NuevaCita> getAllNuevasCitas() {
        return nuevaCitaRepository.findAll();
    }

    /**
     * CREATE: Crea una nueva cita desde el formulario de agendamiento.
     * Endpoint: POST /nuevas-citas
     */
    @PostMapping("/nuevas-citas")
    public NuevaCita crearNuevaCita(@RequestBody NuevaCita nuevaCita) {
        return nuevaCitaRepository.save(nuevaCita);
    }

    /**
     * UPDATE: Modifica una cita existente.
     * Endpoint: PUT /nuevas-citas/{id}
     */
    @PutMapping("/nuevas-citas/{id}")
    public ResponseEntity<NuevaCita> updateNuevaCita(@PathVariable String id, @RequestBody NuevaCita citaActualizada) {
        return nuevaCitaRepository.findById(id)
                .map(citaExistente -> {
                    // Actualizamos los campos que pueden cambiar
                    citaExistente.setTitle(citaActualizada.getTitle());
                    citaExistente.setFechaInicio(citaActualizada.getFechaInicio());
                    citaExistente.setFechaFin(citaActualizada.getFechaFin());
                    citaExistente.setTotalCost(citaActualizada.getTotalCost());
                    // ... aquí podrías actualizar más campos si lo necesitas ...
                    
                    NuevaCita guardada = nuevaCitaRepository.save(citaExistente);
                    return ResponseEntity.ok(guardada);
                })
                .orElse(ResponseEntity.notFound().build()); // Si no se encuentra, devuelve 404
    }

    /**
     * DELETE: Elimina una cita del calendario y devuelve un mensaje de confirmación.
     * Endpoint: DELETE /nuevas-citas/{id}
     */
    @DeleteMapping("/nuevas-citas/{id}")
    public ResponseEntity<Void> deleteNuevaCita(@PathVariable String id) {
        if (nuevaCitaRepository.existsById(id)) {
            nuevaCitaRepository.deleteById(id);
            // Devuelve 204 No Content, con el cuerpo vacío.
            return ResponseEntity.noContent().build(); 
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}