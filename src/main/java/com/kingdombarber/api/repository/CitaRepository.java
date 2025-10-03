// Archivo: CitaRepository.java
package com.kingdombarber.api.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kingdombarber.api.model.Cita;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long> {}