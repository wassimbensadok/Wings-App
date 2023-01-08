package com.wingsshopservice.Repository;

import com.wingsshopservice.Model.Category;
import com.wingsshopservice.Model.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Long> {
    Optional<SubCategory> findBySubCategoryName (String name);
    List<SubCategory> findByCategory_Id (long id);
}
