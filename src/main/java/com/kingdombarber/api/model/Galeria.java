package com.kingdombarber.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity 
@Table(name = "GALERIA") 
@Getter 
@Setter
public class Galeria {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // <-- Sospecho que el error está aquí
    private Long id;

    private String fileName;
    private String description;
    private String category;
}