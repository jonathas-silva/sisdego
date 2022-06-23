package com.jonathas.sisdego.controllers;

import com.jonathas.sisdego.data.DetalheUsuarioData;
import com.jonathas.sisdego.domain.Usuario;
import com.jonathas.sisdego.security.JWTAuthenticatonFilter;
import com.jonathas.sisdego.services.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping(value = "/auth")
public class AuthResource {

    @PostMapping(value = "/refresh_token")
    public ResponseEntity<Void> refreshToken (HttpServletResponse response) throws IOException {
        String token = JWTAuthenticatonFilter.generateToken(UsuarioService.authenticated());

        response.getWriter().write(token);
        response.getWriter().flush();
        return ResponseEntity.noContent().build();
    }


}
