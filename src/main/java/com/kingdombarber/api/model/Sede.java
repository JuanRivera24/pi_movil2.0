package com.kingdombarber.api.model;

import jakarta.persistence.Column; // Asegúrate de tener este import
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Sede {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sede") // Nombre de la columna
    private Long idSede;

    @Column(name = "nombre_sede") // Nombre de la columna
    private String nombreSede;

}