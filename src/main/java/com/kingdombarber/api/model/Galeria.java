package com.kingdombarber.api.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity @Table(name = "GALERIA") @Getter @Setter
public class Galeria {
    @Id
    private Long id;

    private String fileName;
    private String description;
    private String category;
}