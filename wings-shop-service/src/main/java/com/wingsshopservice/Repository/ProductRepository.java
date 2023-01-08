package com.wingsshopservice.Repository;

import com.wingsshopservice.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByName (String name);
    @Query("SELECT p FROM Product p WHERE p.isValid = true ")
    List<Product> findAllByValidIsTrue ();
    @Query("SELECT p FROM Product p,Card c WHERE p.card.id = c.id")
    List<Product> findAllProduct ();
}
