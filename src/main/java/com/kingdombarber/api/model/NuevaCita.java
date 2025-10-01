package com.kingdombarber.api.model;

import java.time.ZonedDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity @Table(name = "NUEVAS_CITAS") @Getter @Setter
public class NuevaCita {
    @Id
    private String id; // Usamos String como en tu JSON original
    
    private String title;
    private ZonedDateTime start;
    private ZonedDateTime end;
    private Double totalCost;
    
    private String clienteId;
    private Long sedeId;
    private Long barberId;
    
    // Para campos complejos como 'services' y 'serviciosDetalle' que son arrays/objetos,
    // una forma simple de empezar es guardarlos como texto.
    @Lob // Large Object: para guardar texto largo
    @Column(columnDefinition = "TEXT")
    private String services;
    
    @Lob
    @Column(columnDefinition = "TEXT")
    private String serviciosDetalle;

    // Campos que habia omitido, ahora incluidos
    private String nombreSede;
    private String nombreCompletoBarbero;
}