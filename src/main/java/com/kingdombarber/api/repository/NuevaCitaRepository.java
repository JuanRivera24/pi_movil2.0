package com.kingdombarber.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kingdombarber.api.model.NuevaCita;

@Repository
public interface NuevaCitaRepository extends JpaRepository<NuevaCita, Long> {

    // --- CORRECCIÓN EN EL NOMBRE DEL MÉTODO ---
    // Antes: findByClienteNombreAndClienteApellido
    // Spring necesita navegar así: Cita -> cliente -> nombre / Cita -> cliente -> apellido
    List<NuevaCita> findByClienteNombreAndClienteApellido(String nombre, String apellido);

    // --- CORRECCIÓN EN EL NOMBRE DEL MÉTODO ---
    // Antes: findByBarberoIdBarbero
    // Spring necesita navegar así: Cita -> barbero -> idBarbero
    List<NuevaCita> findByBarberoIdBarbero(Long idBarbero);
}