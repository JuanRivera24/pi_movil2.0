package com.kingdombarber.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Barbero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idBarbero;

    private String nombre;
    private String apellido;

    @ManyToOne // Anotación clave: Muchos barberos pueden estar en UNA sede.
    @JoinColumn(name = "id_sede") // Esto creará una columna "id_sede" en la tabla "barbero"
    private Sede sede; // Objeto que representa la sede a la que pertenece
}