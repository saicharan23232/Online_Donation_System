package com.S3.donation.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "donations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "donor_id")
    private User donor;

    @ManyToOne
    @JoinColumn(name = "campaign_id")
    private Campaign campaign;

    @NotNull
    @Positive
    private BigDecimal amount;

    private String message;

    private LocalDateTime donationDate;

    @PrePersist
    protected void onCreate() {
        donationDate = LocalDateTime.now();
    }
}
