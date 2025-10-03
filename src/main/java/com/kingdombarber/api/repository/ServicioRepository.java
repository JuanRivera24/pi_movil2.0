// Archivo: ServicioRepository.java
package com.kingdombarber.api.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kingdombarber.api.model.Servicio;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {}