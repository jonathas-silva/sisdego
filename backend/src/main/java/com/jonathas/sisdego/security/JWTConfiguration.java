package com.jonathas.sisdego.security;

import com.jonathas.sisdego.services.DetalheUsuarioServiceImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@EnableWebSecurity
public class JWTConfiguration extends WebSecurityConfigurerAdapter {

    private final DetalheUsuarioServiceImpl usuarioService;
    private final PasswordEncoder passwordEncoder;

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;


    public JWTConfiguration(DetalheUsuarioServiceImpl usuarioService, PasswordEncoder passwordEncoder) {
        this.usuarioService = usuarioService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(usuarioService).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        //As declarações foram deixadas aqui para utilizarmos os setters dos valores injetados de properties
        JWTAuthenticatonFilter jwtAuthenticatonFilter = new JWTAuthenticatonFilter(authenticationManager());
        jwtAuthenticatonFilter.setExpiration(expiration);
        jwtAuthenticatonFilter.setSecret(secret);

        JWTValidationFilter jwtValidationFilter = new JWTValidationFilter(authenticationManager());
        jwtValidationFilter.setSecret(secret);

        http.cors().and().csrf().disable(); //precisa desabilitar para autorizar o acesso através de domínios externos?
        http.csrf().disable().authorizeRequests()
                .antMatchers(HttpMethod.POST, "/login").permitAll()
                .antMatchers(HttpMethod.POST, "/usuarios").permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilter(jwtAuthenticatonFilter)
                .addFilter(jwtValidationFilter)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                //não deixa o estado da sessão gravado no servidor



    }

    //A configuração do cors permite que a nossa aplicação receba requisições de outro domínio
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
        corsConfiguration.setAllowedMethods(Arrays.asList("POST", "GET" ,"PUT", "DELETE", "OPTIONS"));
        source.registerCorsConfiguration("/**", corsConfiguration);

        return source;
    }

}

