package com.kingdombarber.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kingdombarber.api.model.Contacto;

@Repository
public interface ContactoRepository extends JpaRepository<Contacto, String> { // Ojo: El ID es de tipo String
}