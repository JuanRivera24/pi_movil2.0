// Archivo: Servicio.java
package com.kingdombarber.api.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity @Table(name = "SERVICIOS") @Getter @Setter
public class Servicio {
    @Id @Column(name = "ID_Servicio")
    private Long id;

    @Column(name = "Nombre_Servicio")
    private String nombreServicio;

    @Column(name = "Precio")
    private Double precio;

    @Column(name = "Duracion_min")
    private Integer duracionMin;
}