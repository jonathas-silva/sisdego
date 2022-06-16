package com.jonathas.sisdego.repositories;

import com.jonathas.sisdego.domain.Catador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatadorRepository extends JpaRepository<Catador, Long> {
}
