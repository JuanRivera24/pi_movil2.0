package com.kingdombarber.api.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

    private final String UPLOAD_DIR = "uploads/";

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
            // Crea el directorio si no existe
            Files.createDirectories(Paths.get(UPLOAD_DIR));

            String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + uniqueFileName);
            Files.copy(file.getInputStream(), path);

            Galeria nuevaImagen = new Galeria();
            nuevaImagen.setFileName(uniqueFileName);
            nuevaImagen.setDescription(description);
            nuevaImagen.setCategory(category);
            
            Galeria guardada = galeriaRepository.save(nuevaImagen);
            
            return ResponseEntity.ok(guardada);
        } catch (IOException e) {
            log.error("Error al subir el archivo", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/galeria/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        Optional<Galeria> optionalImagen = galeriaRepository.findById(id);
        if (optionalImagen.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Galeria imagen = optionalImagen.get();
        try {
            Path path = Paths.get(UPLOAD_DIR + imagen.getFileName());
            Files.deleteIfExists(path);
            
            galeriaRepository.delete(imagen);
            
            return ResponseEntity.noContent().build();
        } catch (IOException e) {
            log.error("Error al borrar el archivo físico: {}", imagen.getFileName(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}