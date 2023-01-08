package com.wingsshopservice.Repository;

import com.wingsshopservice.Model.Product_Stock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProStockRepository extends JpaRepository<Product_Stock, Long> {
    Optional<Product_Stock> findByProductCombination_Id (long id);
    void deleteByProductCombination_Id (long id);
}
