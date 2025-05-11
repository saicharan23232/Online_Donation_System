// File: src/main/java/com/s3/donation/service/AuthService.java
package com.s3.donation.service;

import com.s3.donation.exception.UserAlreadyExistsException;
import com.s3.donation.exception.InvalidCredentialsException;
import com.s3.donation.model.User;
import com.s3.donation.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Optional;

@Service // This will be registered as 'authService'
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User register(User userToRegister) {
        if (userToRegister == null) {
            throw new IllegalArgumentException("User object to register cannot be null.");
        }
        if (!StringUtils.hasText(userToRegister.getEmail())) {
            logger.warn("Registration attempt with empty email.");
            throw new IllegalArgumentException("User email cannot be empty for registration.");
        }
        if (!StringUtils.hasText(userToRegister.getPassword())) {
            logger.warn("Registration attempt for email {} with empty password.", userToRegister.getEmail());
            throw new IllegalArgumentException("User password cannot be empty for registration.");
        }

        if (userRepository.findByEmail(userToRegister.getEmail()).isPresent()) {
            logger.warn("Attempt to register with existing email: {}", userToRegister.getEmail());
            throw new UserAlreadyExistsException("User with email " + userToRegister.getEmail() + " already exists.");
        }

        String rawPassword = userToRegister.getPassword();
        userToRegister.setPassword(passwordEncoder.encode(rawPassword));

        User savedUser = userRepository.save(userToRegister);
        logger.info("User registered successfully with email: {}", savedUser.getEmail());
        return savedUser;
    }

    public User authenticate(String email, String rawPassword) {
        if (!StringUtils.hasText(email)) {
            logger.warn("Login attempt with empty email.");
            throw new IllegalArgumentException("Email cannot be empty for login.");
        }
        if (!StringUtils.hasText(rawPassword)) {
            logger.warn("Login attempt for email {} with empty password.", email);
            throw new IllegalArgumentException("Password cannot be empty for login.");
        }

        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            logger.warn("Login attempt for non-existent email: {}", email);
            throw new InvalidCredentialsException("Invalid email or password.");
        }

        User user = userOptional.get();

        if (passwordEncoder.matches(rawPassword, user.getPassword())) {
            logger.info("User authenticated successfully: {}", email);
            return user;
        } else {
            logger.warn("Failed login attempt for email: {}. Password mismatch.", email);
            throw new InvalidCredentialsException("Invalid email or password.");
        }
    }

    public Optional<User> findUserByEmail(String email) {
        if (!StringUtils.hasText(email)) {
            logger.debug("Attempt to find user with empty email string.");
            return Optional.empty();
        }
        return userRepository.findByEmail(email);
    }
}