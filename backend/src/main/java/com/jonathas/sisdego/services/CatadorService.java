package com.jonathas.sisdego.services;

import com.jonathas.sisdego.domain.Catador;
import com.jonathas.sisdego.domain.Solicitacao;
import com.jonathas.sisdego.domain.enums.EstadoSolicitacao;
import com.jonathas.sisdego.repositories.CatadorRepository;
import com.jonathas.sisdego.repositories.SolicitacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CatadorService {

    @Autowired
    private CatadorRepository catadorRepository;

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    @Transactional(readOnly = true)
    public Catador findById(Long id) {
        Catador resultado = catadorRepository.findById(id).get();
        return resultado;
    }

    public List<Catador> findAll(){
        List<Catador> resultado =  catadorRepository.findAll();
        return resultado;
    }

    public Catador inserirSolicitacao(Long idSolicitacao, Long idCatador) {

        Solicitacao solicitacao = solicitacaoRepository.findById(idSolicitacao).get();
        solicitacao.setEstado(EstadoSolicitacao.EM_FILA);
        Catador catador = catadorRepository.findById(idCatador).get();
        solicitacaoRepository.save(solicitacao);
        catador.setSolicitacoes(solicitacao);
        return catadorRepository.save(catador);
    }

    public Catador deletarSolicitacao(Long idSolicitacao, Long idCatador) {
        Solicitacao solicitacao = solicitacaoRepository.findById(idSolicitacao).get();
        solicitacao.setEstado(EstadoSolicitacao.AGUARDANDO); //muda o status da solicitação
        solicitacaoRepository.save(solicitacao); //Salva a solicitação alterada
        Catador catador = catadorRepository.findById(idCatador).get();
        catador.deleteSolicitacoes(solicitacao); //deleta a referida solicitação da lista de solicitações do catador
        return catadorRepository.save(catador); //salva o catador alterado
    }
}
