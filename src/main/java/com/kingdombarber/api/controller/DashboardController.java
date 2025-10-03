package com.kingdombarber.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingdombarber.api.model.Cita;
import com.kingdombarber.api.model.Cliente;
import com.kingdombarber.api.repository.CitaRepository;
import com.kingdombarber.api.repository.ClienteRepository;

@RestController
public class DashboardController {

    @Autowired
    private CitaRepository citaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    /**
     * Endpoint para la página "Gestión de Citas" de pi_ntp.
     * Devuelve el historial completo de la tabla CITAS.
     */
    @GetMapping("/historial/citas")
    public List<Cita> getHistorialCitas() {
        return citaRepository.findAll();
    }

    /**
     * Endpoint para el Dashboard de pi_ntp.
     * Devuelve la lista completa de clientes para los filtros y gráficos.
     */
    @GetMapping("/clientes")
    public List<Cliente> getAllClientes() {
        return clienteRepository.findAll();
    }
}