package com.S3.donation.controller;

import com.S3.donation.model.Donation;
import com.S3.donation.model.User;
import com.S3.donation.service.DonationService; // Assuming DonationService is in this package
import jakarta.validation.Valid; // For @Valid
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize; // For method-level security
import org.springframework.security.core.annotation.AuthenticationPrincipal;
// If User does not implement UserDetails, you might need to adjust how you get the user
// import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/donations")
// WARNING: origins = "*" is very permissive. Restrict to specific domains in production.
@CrossOrigin(origins = "*")
public class DonationController {

    private static final Logger logger = LoggerFactory.getLogger(DonationController.class);

    private final DonationService donationService;

    // 1. Constructor Injection
    @Autowired
    public DonationController(DonationService donationService) {
        this.donationService = donationService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')") // Example: Secure this endpoint
    public ResponseEntity<List<Donation>> getAllDonations() {
        logger.info("Fetching all donations");
        List<Donation> donations = donationService.getAllDonations();
        return ResponseEntity.ok(donations);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @donationSecurityService.canAccessDonation(authentication, #id)") // Example fine-grained access
    public ResponseEntity<Donation> getDonationById(@PathVariable Long id) {
        logger.info("Fetching donation with id: {}", id);
        Donation donation = donationService.getDonationById(id)
                .orElseThrow(() -> {
                    logger.warn("Donation not found with id: {}", id);
                    return new ResponseStatusException(HttpStatus.NOT_FOUND, "Donation not found with id: " + id);
                });
        return ResponseEntity.ok(donation);
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()") // Ensure only authenticated users can donate
    public ResponseEntity<Donation> createDonation(
            @Valid @RequestBody Donation donation, // 3. Input Validation
            @AuthenticationPrincipal User currentUser // 2. Safer way to get current user
            // If User does not implement UserDetails, use: @AuthenticationPrincipal UserDetails currentUserDetails
    ) {
        if (currentUser == null) {
            // This case should ideally be caught by @PreAuthorize or Spring Security config
            logger.warn("Attempt to create donation by unauthenticated user.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // If using UserDetails and need your custom User object:
        // User actualUser = userService.findByUsername(currentUserDetails.getUsername())
        // .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "User details not found"));
        // donation.setDonor(actualUser);

        logger.info("Creating donation by user: {}", currentUser.getEmail()); // Assuming User has getEmail()
        donation.setDonor(currentUser); // Set the donor

        Donation createdDonation = donationService.saveDonation(donation);
        logger.info("Donation created with id: {}", createdDonation.getId());


        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdDonation.getId())
                .toUri();

        return ResponseEntity.created(location).body(createdDonation);
    }

    // Endpoint to get donations for the currently authenticated user
    @GetMapping("/my-donations")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Donation>> getMyDonations(@AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        logger.info("Fetching donations for current user: {}", currentUser.getEmail());
        List<Donation> donations = donationService.getDonationsByUserId(currentUser.getId()); // Assuming User has getId()
        return ResponseEntity.ok(donations);
    }


    // This endpoint might need specific authorization rules:
    // e.g., only an ADMIN can view donations for any user ID.
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN') or #userId == authentication.principal.id") // Admin or user themselves
    public ResponseEntity<List<Donation>> getUserDonations(@PathVariable Long userId) {
        // Optional: Check if user with userId exists before fetching donations
        // if (!userService.userExists(userId)) {
        //    logger.warn("Attempt to fetch donations for non-existent user ID: {}", userId);
        //    return ResponseEntity.notFound().build();
        // }
        logger.info("Fetching donations for user id: {}", userId);
        List<Donation> donations = donationService.getDonationsByUserId(userId);
        return ResponseEntity.ok(donations);
    }

    @GetMapping("/campaign/{campaignId}")
    // No specific authorization here, assuming campaign donations are public or handled by service layer
    public ResponseEntity<List<Donation>> getCampaignDonations(@PathVariable Long campaignId) {
        // Optional: Check if campaign with campaignId exists
        // if (!campaignService.campaignExists(campaignId)) {
        //    logger.warn("Attempt to fetch donations for non-existent campaign ID: {}", campaignId);
        //    return ResponseEntity.notFound().build();
        // }
        logger.info("Fetching donations for campaign id: {}", campaignId);
        List<Donation> donations = donationService.getDonationsByCampaignId(campaignId);
        return ResponseEntity.ok(donations);
    }
}