package com.jonathas.sisdego.services;

import com.jonathas.sisdego.domain.DTO.SolicitacaoDTO;
import com.jonathas.sisdego.domain.Solicitacao;
import com.jonathas.sisdego.domain.Usuario;
import com.jonathas.sisdego.repositories.SolicitacaoRepository;
import com.jonathas.sisdego.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SolicitacaoService {

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional(readOnly = true)
    public Solicitacao findById(Long id) {
        Solicitacao resultado = solicitacaoRepository.findById(id).get();
        return resultado;
    }

    public List<Solicitacao> findAll(){
        List<Solicitacao> resultado =  solicitacaoRepository.findAll();
        return resultado;
    }

    public Solicitacao update(SolicitacaoDTO solicitao) {
        //assumindo que vamos receber o body sem o id
        Usuario user = usuarioRepository.findById(solicitao.getUser()).get();
        Solicitacao novaSolicitacao = new Solicitacao();
        novaSolicitacao.setTipo(solicitao.getTipo());
        novaSolicitacao.setDescricao(solicitao.getDescricao());
        novaSolicitacao.setData(solicitao.getData());
        novaSolicitacao.setEndereco(solicitao.getEndereco());
        novaSolicitacao.setMelhor_dia(solicitao.getMelhor_dia());
        novaSolicitacao.setMelhor_horario(solicitao.getMelhor_horario());
        novaSolicitacao.setUser(user);
        return solicitacaoRepository.save(novaSolicitacao);
    }

    public void delete(Long id) {
        solicitacaoRepository.deleteById(id);
    }
}
