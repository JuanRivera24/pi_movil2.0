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
    private String id;
    private String title;
    @Column(name = "fecha_inicio")
    private ZonedDateTime fechaInicio;
    @Column(name = "fecha_fin")
    private ZonedDateTime fechaFin;
    private Double totalCost;
    private String clienteId;
    private Long sedeId;
    private Long barberId;
    @Lob @Column(columnDefinition = "TEXT")
    private String services;
    @Lob @Column(columnDefinition = "TEXT")
    private String serviciosDetalle;
    private String nombreSede;
    private String nombreCompletoBarbero;
}