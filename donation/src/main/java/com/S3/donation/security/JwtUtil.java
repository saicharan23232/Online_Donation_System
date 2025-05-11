package com.s3.donation.service;

import com.s3.donation.exception.UserAlreadyExistsException; // Custom exception
import com.s3.donation.exception.InvalidCredentialsException; // Custom exception
import com.s3.donation.model.User;
import com.s3.donation.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Good for write operations
import org.springframework.util.StringUtils; // For checking empty/blank strings

import java.util.Optional;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository; // Use final for constructor injection
    private final PasswordEncoder passwordEncoder; // Use final for constructor injection

    // Constructor Injection (recommended over field injection)
    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional // Make transactional as it involves a write operation
    public User register(User userToRegister) {
        // 1. Input Validation
        if (userToRegister == null) {
            throw new IllegalArgumentException("User object cannot be null.");
        }
        if (!StringUtils.hasText(userToRegister.getEmail())) {
            throw new IllegalArgumentException("User email cannot be empty.");
        }
        if (!StringUtils.hasText(userToRegister.getPassword())) {
            throw new IllegalArgumentException("User password cannot be empty.");
        }
        // Optional: Add email format validation here or rely on @Valid in controller

        // 2. Check for existing user
        if (userRepository.findByEmail(userToRegister.getEmail()).isPresent()) {
            logger.warn("Attempt to register with existing email: {}", userToRegister.getEmail());
            throw new UserAlreadyExistsException("User with email " + userToRegister.getEmail() + " already exists.");
        }

        // 3. Encode password
        userToRegister.setPassword(passwordEncoder.encode(userToRegister.getPassword()));

        // 4. Save user
        User savedUser = userRepository.save(userToRegister);
        logger.info("User registered successfully with email: {}", savedUser.getEmail());
        return savedUser;
    }

    /**
     * Authenticates a user based on email and raw password.
     *
     * @param email       The user's email.
     * @param rawPassword The user's raw (unencoded) password.
     * @return Optional of User if authentication is successful.
     * @throws InvalidCredentialsException if credentials do not match or user not found.
     * @throws IllegalArgumentException if email or password are blank.
     */
    public User authenticate(String email, String rawPassword) {
        // 1. Input Validation
        if (!StringUtils.hasText(email)) {
            throw new IllegalArgumentException("Email cannot be empty for login.");
        }
        if (!StringUtils.hasText(rawPassword)) {
            throw new IllegalArgumentException("Password cannot be empty for login.");
        }

        // 2. Fetch user by email
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            logger.warn("Login attempt for non-existent email: {}", email);
            throw new InvalidCredentialsException("Invalid email or password."); // Generic message for security
        }

        User user = userOptional.get();

        // 3. Verify password
        if (passwordEncoder.matches(rawPassword, user.getPassword())) {
            logger.info("User authenticated successfully: {}", email);
            return user; // Authentication successful
        } else {
            logger.warn("Failed login attempt for email: {}", email);
            throw new InvalidCredentialsException("Invalid email or password."); // Generic message for security
        }
    }

    /**
     * Finds a user by their email. This method is typically used by
     * UserDetailsService for Spring Security.
     *
     * @param email The email of the user to find.
     * @return Optional of User.
     */
    public Optional<User> findUserByEmail(String email) {
        if (!StringUtils.hasText(email)) {
            // Or throw IllegalArgumentException, depends on expected usage
            return Optional.empty();
        }
        return userRepository.findByEmail(email);
    }
}