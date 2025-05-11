package com.S3.donation.repository;

import com.S3.donation.model.Campaign;
import com.S3.donation.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
    List<Campaign> findByCreatedBy(User user);
}