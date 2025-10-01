package com.kingdombarber.api.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity @Table(name = "BARBEROS") @Getter @Setter
public class Barbero {
    @Id
    @Column(name = "ID_Barbero")
    private Long id;

    @Column(name = "Nombre_Barbero")
    private String nombreBarbero;

    @Column(name = "Apellido_Barbero")
    private String apellidoBarbero;

    // Relación: Muchos barberos pueden estar en una sede
    @ManyToOne
    @JoinColumn(name = "ID_Sede")
    private Sede sede;
}