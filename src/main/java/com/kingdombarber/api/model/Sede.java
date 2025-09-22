package com.kingdombarber.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity // Le dice a JPA que esta clase es una tabla de la base de datos
@Getter   // Lombok: Crea automáticamente los getters (ej. getIdSede())
@Setter   // Lombok: Crea automáticamente los setters (ej. setNombreSede())
public class Sede {

    @Id // Marca este campo como la clave primaria (Primary Key)
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Le dice a la BD que genere el ID automáticamente
    private Long idSede;

    private String nombreSede;

}