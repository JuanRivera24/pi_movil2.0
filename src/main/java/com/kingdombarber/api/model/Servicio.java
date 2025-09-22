package com.kingdombarber.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Servicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_servicio") // Buena práctica para nombrar columnas
    private Long idServicio;

    @Column(name = "nombre_servicio")
    private String nombreServicio;

    private double precio;

    @Column(name = "duracion_min") // Buena práctica
    private int duracionMin; // Duración en minutos

}