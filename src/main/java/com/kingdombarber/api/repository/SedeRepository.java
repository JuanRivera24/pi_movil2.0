package com.kingdombarber.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kingdombarber.api.model.Sede;

@Repository // Buena práctica para indicar que es un componente de persistencia
public interface SedeRepository extends JpaRepository<Sede, Long> {
}