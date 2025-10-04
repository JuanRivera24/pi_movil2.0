package com.kingdombarber.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "GALERIA")
@Getter
@Setter
public class Galeria {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private String category;

    // Campo para guardar la imagen como texto Base64
    @Lob 
    @Column(name = "image_data", columnDefinition = "TEXT")
    private String imageData;
}