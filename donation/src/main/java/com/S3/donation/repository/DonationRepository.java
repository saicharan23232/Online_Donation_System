package com.S3.donation.repository;

import com.S3.donation.model.Campaign;
import com.S3.donation.model.Donation;
import com.S3.donation.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonationRepository extends JpaRepository<Donation, Long> {
    List<Donation> findByDonor(User user);
    List<Donation> findByCampaign(Campaign campaign);
    List<Donation> findByDonorId(Long userId);
    List<Donation> findByCampaignId(Long campaignId);
}