package com.kingdombarber.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kingdombarber.api.model.Barbero;

@Repository
public interface BarberoRepository extends JpaRepository<Barbero, Long> {
}