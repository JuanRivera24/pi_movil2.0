package com.kingdombarber.api.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kingdombarber.api.model.Galeria;
import com.kingdombarber.api.repository.GaleriaRepository;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class GaleriaController {

    @Autowired
    private GaleriaRepository galeriaRepository;

    @GetMapping("/galeria")
    public List<Galeria> getAllGaleria() {
        return galeriaRepository.findAll();
    }

    @PostMapping("/galeria/upload")
    public ResponseEntity<Galeria> uploadImage(@RequestParam("image") MultipartFile file,
                                             @RequestParam("description") String description,
                                             @RequestParam("category") String category) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        try {
            // Convertimos la imagen a un string Base64
            String imageDataString = Base64.getEncoder().encodeToString(file.getBytes());
            
            // Creamos la entidad y guardamos el string en formato Data URL
            Galeria nuevaImagen = new Galeria();
            nuevaImagen.setDescription(description);
            nuevaImagen.setCategory(category);
            nuevaImagen.setImageData("data:" + file.getContentType() + ";base64," + imageDataString);

            Galeria guardada = galeriaRepository.save(nuevaImagen);
            
            return ResponseEntity.ok(guardada);
        } catch (IOException e) {
            log.error("Error al procesar el archivo subido", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PutMapping("/galeria/{id}")
    public ResponseEntity<Galeria> updateImage(@PathVariable Long id, @RequestBody Galeria galeriaDetails) {
        return galeriaRepository.findById(id)
                .map(imagenExistente -> {
                    imagenExistente.setDescription(galeriaDetails.getDescription());
                    imagenExistente.setCategory(galeriaDetails.getCategory());
                    Galeria updatedImage = galeriaRepository.save(imagenExistente);
                    return ResponseEntity.ok(updatedImage);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/galeria/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        if (galeriaRepository.existsById(id)) {
            galeriaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}