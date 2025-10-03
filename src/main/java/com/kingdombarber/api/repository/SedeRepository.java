// Archivo: SedeRepository.java
package com.kingdombarber.api.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kingdombarber.api.model.Sede;

@Repository
public interface SedeRepository extends JpaRepository<Sede, Long> {}