package com.kingdombarber.api.controller;

import java.time.ZonedDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kingdombarber.api.model.Contacto;
import com.kingdombarber.api.repository.ContactoRepository;

@RestController
public class ContactoController {

    @Autowired
    private ContactoRepository contactoRepository;

    /**
     * CREATE: Recibe un nuevo mensaje de contacto desde la web.
     * Endpoint: POST /contactanos
     */
    @PostMapping("/contactanos")
    public Contacto crearContacto(@RequestBody Contacto nuevoContacto) {
        nuevoContacto.setId("msg_" + System.currentTimeMillis());
        nuevoContacto.setFecha(ZonedDateTime.now());
        return contactoRepository.save(nuevoContacto);
    }

    /**
     * READ: Obtiene todos los mensajes de contacto. (Para uso administrativo con Postman)
     * Endpoint: GET /contactanos
     */
    @GetMapping("/contactanos")
    public List<Contacto> getAllContactos() {
        return contactoRepository.findAll();
    }

    /**
     * DELETE: Elimina un mensaje de contacto por su ID. (Para uso administrativo con Postman)
     * Endpoint: DELETE /contactanos/{id}
     */
    @DeleteMapping("/contactanos/{id}")
    public ResponseEntity<Void> deleteContacto(@PathVariable String id) {
        if (contactoRepository.existsById(id)) {
            contactoRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // Devuelve 204 No Content
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}