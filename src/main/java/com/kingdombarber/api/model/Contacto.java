package com.kingdombarber.api.model;
import java.time.ZonedDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity @Table(name = "CONTACTOS") @Getter @Setter
public class Contacto {
    @Id
    private String id; // Usamos String como en tu JSON original
    
    private String nombre;
    private String email;
    
    @Lob
    @Column(columnDefinition = "TEXT")
    private String mensaje;

    private ZonedDateTime fecha;
}