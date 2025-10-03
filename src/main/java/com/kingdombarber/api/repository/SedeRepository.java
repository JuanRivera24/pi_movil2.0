package com.kingdombarber.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kingdombarber.api.model.Sede;

@Repository
public interface SedeRepository extends JpaRepository<Sede, Long> {
    // Spring Boot crea los métodos CRUD automáticamente. No se necesita nada más aquí para empezar.
}