package com.wingsshopservice.Services;


import com.wingsshopservice.Model.Category;
import com.wingsshopservice.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
   @Autowired
   CategoryRepository categoryRepository;

    public Optional<Category> GetCategoryById(long id){
        return categoryRepository.findById(id);
    }

    public Optional<Category> GetCategoryByName(String name){
        return categoryRepository.findByCategoryName(name);
    }

    public List<Category> GetAllCategory(){
        return categoryRepository.findAll();
    }

    public Category AddCategory (String name){
        Category category = new Category();
        category.setCategoryName(name);
        return categoryRepository.save(category);
    }

}
