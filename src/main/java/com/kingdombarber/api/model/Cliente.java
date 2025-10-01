package com.kingdombarber.api.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity @Table(name = "CLIENTES") @Getter @Setter
public class Cliente {
    @Id
    @Column(name = "ID_Cliente")
    private Long id;

    @Column(name = "Nombre_Cliente")
    private String nombreCliente;

    @Column(name = "Apellido_Cliente")
    private String apellidoCliente;

    @Column(name = "Telefono")
    private String telefono;
    
    @Column(name = "Email")
    private String email;
}