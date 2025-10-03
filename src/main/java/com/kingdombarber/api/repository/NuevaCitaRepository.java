// Archivo: NuevaCitaRepository.java
package com.kingdombarber.api.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kingdombarber.api.model.NuevaCita;

@Repository
public interface NuevaCitaRepository extends JpaRepository<NuevaCita, String> {} // Ojo: El ID es String