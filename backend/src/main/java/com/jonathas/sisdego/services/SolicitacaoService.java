package com.jonathas.sisdego.services;

import com.jonathas.sisdego.domain.Catador;
import com.jonathas.sisdego.domain.DTO.SolicitacaoDTO;
import com.jonathas.sisdego.domain.Solicitacao;
import com.jonathas.sisdego.domain.Usuario;
import com.jonathas.sisdego.domain.enums.EstadoSolicitacao;
import com.jonathas.sisdego.repositories.CatadorRepository;
import com.jonathas.sisdego.repositories.SolicitacaoRepository;
import com.jonathas.sisdego.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class SolicitacaoService {

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    @Autowired
    private CatadorRepository catadorRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CatadorService catadorService;

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

        //Aqui estamos fazendo essa conversão na marra, devido a problemas com função 'toEnum'
        if(solicitao.getEstado() == 0){
            novaSolicitacao.setEstado(EstadoSolicitacao.AGUARDANDO);
        }else if (solicitao.getEstado() == 1){
            novaSolicitacao.setEstado(EstadoSolicitacao.EM_FILA);
        }else if (solicitao.getEstado() == 2){
            novaSolicitacao.setEstado(EstadoSolicitacao.COLETADO);
        } else{
            throw new IllegalArgumentException("Código de solicitação inválido!");
        }

        return solicitacaoRepository.save(novaSolicitacao);
    }

    public void delete(Long id) {
           solicitacaoRepository.deleteById(id);


    }

    public Solicitacao alterar(Long id, SolicitacaoDTO solicitacaoDTO) {
        Solicitacao solicitacao = solicitacaoRepository.findById(id).get();

        solicitacao.setTipo(solicitacaoDTO.getTipo());
        solicitacao.setDescricao(solicitacaoDTO.getDescricao());
        solicitacao.setEndereco(solicitacaoDTO.getEndereco());
        solicitacao.setMelhor_dia(solicitacaoDTO.getMelhor_dia());
        solicitacao.setMelhor_horario(solicitacaoDTO.getMelhor_horario());


        //Não vamos alterar o status da solicitação

        return solicitacaoRepository.save(solicitacao);
    }
}
