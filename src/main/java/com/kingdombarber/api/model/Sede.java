package com.kingdombarber.api.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity @Table(name = "SEDES") @Getter @Setter
public class Sede {
    @Id @Column(name = "ID_Sede")
    private Long id;
    @Column(name = "Nombre_Sede")
    private String nombreSede;
}