package com.wingsshopservice.Repository;

import com.wingsshopservice.Model.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CardRepository extends JpaRepository <Card, Long> {
    Optional<Card> findByUserProId(Long aLong);

}
