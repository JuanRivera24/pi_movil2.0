package com.kingdombarber.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kingdombarber.api.model.Barbero; // Asegúrate de importar List

@Repository
public interface BarberoRepository extends JpaRepository<Barbero, Long> {

    // --- NUEVO MÉTODO ---
    // Spring Data JPA creará automáticamente la consulta para buscar
    // todos los barberos cuyo objeto 'sede' tenga un atributo 'idSede' que coincida.
    List<Barbero> findBySedeIdSede(Long idSede);
}