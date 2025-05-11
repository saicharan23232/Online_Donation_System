package com.S3.donation.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableMethodSecurity  // if you want @PreAuthorize, etc.
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // authorize requests
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**", "/login", "/css/**", "/js/**").permitAll()
                .anyRequest().authenticated()
            )
            // use form login (you can customize login page, success handlers, etc.)
            .formLogin(Customizer.withDefaults())
            // enable basic auth as well if needed
            //.httpBasic(Customizer.withDefaults())
            // CSRF is on by default; disable only if you have a stateless API
            ;
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
