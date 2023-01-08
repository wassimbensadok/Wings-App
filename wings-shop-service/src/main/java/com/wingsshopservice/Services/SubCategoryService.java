package com.wingsshopservice.Services;

import com.wingsshopservice.Model.Category;
import com.wingsshopservice.Model.SubCategory;
import com.wingsshopservice.Repository.CategoryRepository;
import com.wingsshopservice.Repository.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubCategoryService {

    @Autowired
    SubCategoryRepository subCategoryRepository;

    @Autowired
    CategoryRepository categoryRepository;

    public Optional<SubCategory> GetSubCategoryById(long id){
        return subCategoryRepository.findById(id);
    }

    public Optional<SubCategory> GetSubCategoryByName(String name){
        return subCategoryRepository.findBySubCategoryName(name);
    }

    public List<SubCategory> GetSubCategoryByCategory(long id){
        return subCategoryRepository.findByCategory_Id(id);
    }


    public List<SubCategory> GetAllCategory(){
        return subCategoryRepository.findAll();
    }

    public SubCategory AddSubCategory (String subCatName, long categoryId){
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        Category category = categoryOptional.get();
        SubCategory subCategory = new SubCategory();
        subCategory.setSubCategoryName(subCatName);
        subCategory.setCategory(category);
        return subCategoryRepository.save(subCategory);
    }
}
