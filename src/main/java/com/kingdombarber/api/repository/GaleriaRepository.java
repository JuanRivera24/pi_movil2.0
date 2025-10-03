package com.kingdombarber.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kingdombarber.api.model.Galeria;

@Repository
public interface GaleriaRepository extends JpaRepository<Galeria, Long> {
}