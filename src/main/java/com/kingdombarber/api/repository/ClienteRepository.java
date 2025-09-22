package com.kingdombarber.api.repository;

import java.util.Optional; // <-- IMPORTANTE: AÑADE ESTA LÍNEA

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kingdombarber.api.model.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    // --- AGREGA ESTE MÉTODO ---
    // Spring Data JPA creará automáticamente la consulta para buscar
    // un cliente por su nombre Y su apellido.
    Optional<Cliente> findByNombreAndApellido(String nombre, String apellido);
}