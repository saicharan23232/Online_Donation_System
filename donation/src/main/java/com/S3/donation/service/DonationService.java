package com.S3.donation.controller;

import com.S3.donation.model.Donation;
import com.S3.donation.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "*")
public class DonationController {

    @Autowired
    private DonationService donationService;

    @GetMapping
    public ResponseEntity<List<Donation>> getAllDonations() {
        List<Donation> donations = donationService.getAllDonations();
        return ResponseEntity.ok(donations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Donation> getDonationById(@PathVariable Long id) {
        Donation donation = donationService.getDonationById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Donation not found"));
        return ResponseEntity.ok(donation);
    }

    @PostMapping
    public ResponseEntity<Donation> createDonation(@RequestBody Donation donation) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User donor = (User) authentication.getPrincipal(); // Get logged-in user

        donation.setDonor(donor); // Set the donor
        Donation createdDonation = donationService.saveDonation(donation);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdDonation.getId())
                .toUri();

        return ResponseEntity.created(location).body(createdDonation);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Donation>> getUserDonations(@PathVariable Long userId) {
        List<Donation> donations = donationService.getDonationsByUserId(userId);
        return ResponseEntity.ok(donations);
    }
    @GetMapping("/campaign/{campaignId}")
    public ResponseEntity<List<Donation>> getCampaignDonations(@PathVariable Long campaignId) {
        List<Donation> donations = donationService.getDonationsByCampaignId(campaignId);
        return ResponseEntity.ok(donations);
    }
}