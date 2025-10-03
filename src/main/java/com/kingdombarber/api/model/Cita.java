package com.kingdombarber.api.model;
import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity @Table(name = "CITAS") @Getter @Setter
public class Cita {
    @Id @Column(name = "ID_Cita")
    private Long id;
    @Column(name = "ID_Cliente")
    private Long idCliente;
    @Column(name = "ID_Barbero")
    private Long idBarbero;
    @Column(name = "ID_Servicio")
    private Long idServicio;
    @Column(name = "ID_Sede")
    private Long idSede;
    @Column(name = "Fecha")
    private LocalDate fecha;
    @Column(name = "Hora")
    private LocalTime hora;
}