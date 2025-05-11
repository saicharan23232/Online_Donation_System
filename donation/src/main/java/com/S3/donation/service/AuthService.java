package com.S3.donation.service;

import com.s3.donation.exception.UserAlreadyExistsException; // You'll need to create this
import com.s3.donation.exception.InvalidCredentialsException; // You'll need to create this
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

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Constructor Injection (recommended over field injection)
    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Registers a new user.
     *
     * @param userToRegister The user object containing registration details.
     * @return The saved User object with an encoded password.
     * @throws IllegalArgumentException if user object, email, or password is null/empty.
     * @throws UserAlreadyExistsException if a user with the given email already exists.
     */
    @Transactional // Ensures the operation is atomic
    public User register(User userToRegister) {
        // 1. Input Validation
        if (userToRegister == null) {
            throw new IllegalArgumentException("User object to register cannot be null.");
        }
        if (!StringUtils.hasText(userToRegister.getEmail())) {
            logger.warn("Registration attempt with empty email.");
            throw new IllegalArgumentException("User email cannot be empty for registration.");
        }
        if (!StringUtils.hasText(userToRegister.getPassword())) {
            // Log a warning but don't log the password itself
            logger.warn("Registration attempt for email {} with empty password.", userToRegister.getEmail());
            throw new IllegalArgumentException("User password cannot be empty for registration.");
        }
        // Optional: Add more sophisticated email format validation here if not done elsewhere (e.g., @Valid in controller)

        // 2. Check for existing user
        if (userRepository.findByEmail(userToRegister.getEmail()).isPresent()) {
            logger.warn("Attempt to register with existing email: {}", userToRegister.getEmail());
            throw new UserAlreadyExistsException("User with email " + userToRegister.getEmail() + " already exists.");
        }

        // 3. Encode password
        // Ensure password is not null again, though prior check should cover it
        String rawPassword = userToRegister.getPassword();
        userToRegister.setPassword(passwordEncoder.encode(rawPassword));

        // 4. Save user
        User savedUser = userRepository.save(userToRegister);
        logger.info("User registered successfully with email: {}", savedUser.getEmail());
        return savedUser;
    }

    /**
     * Authenticates a user based on email and raw password.
     * This method is typically called by a login controller.
     *
     * @param email       The user's email.
     * @param rawPassword The user's raw (unencoded) password.
     * @return The authenticated User object.
     * @throws InvalidCredentialsException if credentials do not match or user not found.
     * @throws IllegalArgumentException if email or password are blank.
     */
    public User authenticate(String email, String rawPassword) {
        // 1. Input Validation
        if (!StringUtils.hasText(email)) {
            logger.warn("Login attempt with empty email.");
            throw new IllegalArgumentException("Email cannot be empty for login.");
        }
        if (!StringUtils.hasText(rawPassword)) {
            logger.warn("Login attempt for email {} with empty password.", email);
            throw new IllegalArgumentException("Password cannot be empty for login.");
        }

        // 2. Fetch user by email
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            logger.warn("Login attempt for non-existent email: {}", email);
            // Throw a generic message for security reasons (don't reveal if email exists or not)
            throw new InvalidCredentialsException("Invalid email or password.");
        }

        User user = userOptional.get();

        // 3. Verify password
        if (passwordEncoder.matches(rawPassword, user.getPassword())) {
            logger.info("User authenticated successfully: {}", email);
            return user; // Authentication successful
        } else {
            logger.warn("Failed login attempt for email: {}. Password mismatch.", email);
            // Throw a generic message
            throw new InvalidCredentialsException("Invalid email or password.");
        }
    }

    /**
     * Finds a user by their email.
     * This method is typically used by Spring Security's UserDetailsService.
     *
     * @param email The email of the user to find.
     * @return Optional of User if found, otherwise Optional.empty().
     */
    public Optional<User> findUserByEmail(String email) {
        if (!StringUtils.hasText(email)) {
            logger.debug("Attempt to find user with empty email string.");
            return Optional.empty(); // Or throw new IllegalArgumentException("Email cannot be empty.");
        }
        return userRepository.findByEmail(email);
    }
}