package com.S3.donation.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger; // Import SLF4J Logger
import org.slf4j.LoggerFactory; // Import SLF4J LoggerFactory
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull; // For non-null parameters, good practice
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource; // Good practice for setting details
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    // 1. Declare and initialize the logger
    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);

    // 2. Define constants for magic strings
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService; // Assuming this is your custom UserDetailsService impl

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        try {
            String jwt = getJwtFromRequest(request);

            if (StringUtils.hasText(jwt) && jwtUtil.validateToken(jwt)) {
                String username = jwtUtil.getUsernameFromToken(jwt);

                // It's good practice to ensure no authentication is already set for the current thread
                // if you strictly want this filter to be the one setting it.
                // However, if JWT should override, this check is not strictly needed.
                // For this scenario, let's assume JWT should authenticate if present and valid.

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                // Set details for the authentication token (e.g., IP address, session ID)
                // This is good practice and can be useful for auditing or further security checks.
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
                logger.debug("Set Authentication for user: {}", username);
            }
        } catch (UsernameNotFoundException ex) {
            // This specific catch is good if you want to log it differently or handle it specifically
            // before it falls into the generic Exception catch.
            logger.warn("User not found for token: {}", ex.getMessage());
            // SecurityContextHolder will remain unauthenticated, which is correct.
        }
        // Catching specific JWT exceptions can be useful if jwtUtil.validateToken throws them
        // For example, if using a library like JJWT:
        // catch (ExpiredJwtException ex) {
        //     logger.warn("JWT token has expired: {}", ex.getMessage());
        // } catch (MalformedJwtException | SignatureException | UnsupportedJwtException | IllegalArgumentException ex) {
        //     logger.warn("Invalid JWT token: {}", ex.getMessage());
        // }
        catch (Exception e) {
            // General catch for any other unexpected issues during token processing
            logger.error("Could not set user authentication in security context", e);
            // Ensure SecurityContext is cleared if an error occurs mid-authentication attempt
            // SecurityContextHolder.clearContext(); // Optional: depends on desired behavior on error
        }

        // Crucially, continue the filter chain regardless of authentication success or failure
        // (unless you explicitly want to stop the request, e.g., by sending an error response directly).
        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            // Use BEARER_PREFIX.length() instead of magic number 7
            return bearerToken.substring(BEARER_PREFIX.length());
        }
        return null;
    }
}