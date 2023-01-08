package com.wingsshopservice.Repository;


import com.wingsshopservice.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByCategoryName (String name);
}
