package com.example.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.application.entity.Payments;

public interface PaymentRepository extends JpaRepository<Payments, Long> {

}
