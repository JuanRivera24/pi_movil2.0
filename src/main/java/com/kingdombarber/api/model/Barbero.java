package com.kingdombarber.api.model;

import jakarta.persistence.Column; // Asegúrate de tener este import
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
    @Column(name = "id_barbero") // Nombre de la columna
    private Long idBarbero;

    private String nombre;
    private String apellido;

    @ManyToOne
    @JoinColumn(name = "id_sede")
    private Sede sede;
}