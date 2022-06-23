package com.jonathas.sisdego.services;

import com.jonathas.sisdego.data.DetalheUsuarioData;
import com.jonathas.sisdego.domain.DTO.SolicitacaoDTO;
import com.jonathas.sisdego.domain.Solicitacao;
import com.jonathas.sisdego.domain.Usuario;
import com.jonathas.sisdego.repositories.SolicitacaoRepository;
import com.jonathas.sisdego.repositories.UsuarioRepository;
import org.hibernate.engine.jdbc.spi.SqlExceptionHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder encoder;


    @Transactional(readOnly = true)
    public Usuario findById(Long id) {
        Usuario resultado = usuarioRepository.findById(id).get();
        return resultado;
    }

    public List<Usuario> findAll() {
        List<Usuario> resultado = usuarioRepository.findAll();
        return resultado;
    }

    public Usuario salvarUsuario(Usuario usuario) {
        usuario.setSenha(encoder.encode(usuario.getSenha()));

        return usuarioRepository.save(usuario);

    }

    public ResponseEntity<Boolean> validarSenha(String email, String senha) {


        Optional<Usuario> optionalUsuario = usuarioRepository.findByEmail(email);
        if (optionalUsuario.isEmpty()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(false);
        }
        boolean valid = false;
        valid = encoder.matches(senha, optionalUsuario.get().getSenha());
        HttpStatus status = (valid) ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;

        return ResponseEntity.status(status).body(valid);
    }

    //retornar o NOME usuário logado
    public static String authenticated() {

        String username = null;

        Object principal =  SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        if(principal instanceof UserDetails) {
            username = ((DetalheUsuarioData) principal).getUsername();
        }else {
            username = principal.toString();
        }
        return username;
    }
}
