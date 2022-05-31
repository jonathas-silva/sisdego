package com.jonathas.sisdego.repositories;

import com.jonathas.sisdego.domain.Solicitacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SolicitacaoRepository  extends JpaRepository<Solicitacao, Long> {
}
