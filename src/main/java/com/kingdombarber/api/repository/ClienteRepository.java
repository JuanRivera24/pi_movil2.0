// Archivo: ClienteRepository.java
package com.kingdombarber.api.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kingdombarber.api.model.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {}