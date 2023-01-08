package com.wings.wingsadresse.service.repository;

import com.wings.wingsadresse.service.Models.Governorate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface GovernorateRepository extends JpaRepository<Governorate, Long> {
    @Query("SELECT id from Governorate WHERE GovName=:name")
    Optional<Governorate> findGovernorateByGovName(String name);
}
