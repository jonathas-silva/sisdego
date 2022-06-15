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
public class UsuarioService {

    @Autowired

    private UsuarioRepository usuarioRepository;

    @Transactional(readOnly = true)
    public Usuario findById(Long id) {
        Usuario resultado = usuarioRepository.findById(id).get();
        return resultado;
    }

    public List<Usuario> findAll(){
        List<Usuario> resultado =  usuarioRepository.findAll();
        return resultado;
    }

}
