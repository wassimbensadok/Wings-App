package com.wingsshopservice.Repository;

import com.wingsshopservice.Model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProComRepository extends JpaRepository<Product_Combination, Long> {
    Optional<Product_Combination> findByProductId (long id);
    List<Product_Combination> findByProduct_SubCategory (SubCategory subCategory);
    List<Product_Combination> findByProductCard (Card card);
    List<Product_Combination> findByProductCategory (Category category);
    Optional<Product_Combination> findByProduct_Name (String name);
    @Query(value = "SELECT * FROM product_combination ORDER BY rand() LIMIT 16",nativeQuery = true)
    List<Product_Combination> getRandomProduct ();
    //List<Product_Combination> findByProduct_SubCategoryaAndProduct_Valid (SubCategory subCategory, Boolean b);
}
