package com.wingsshopservice.Controller;

import com.wingsshopservice.Model.SubCategory;
import com.wingsshopservice.Services.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class SubCategoryController {

    @Autowired
    SubCategoryService subCategoryService;

    @GetMapping("/getSubCategoryById/{id}")
    public Optional<SubCategory> getSubCategoryById(@PathVariable("id") long id) {
        return subCategoryService.GetSubCategoryById(id);
    }

    @GetMapping("/getSubCategoryByName/{name}")
    public Optional<SubCategory> getSubCategoryByName(@PathVariable("name") String name) {
        return subCategoryService.GetSubCategoryByName(name);
    }

    @GetMapping("/getSubCategoryByCategory/{id}")
    public List<SubCategory> getSubCategoryByCategory(@PathVariable("id") long id) {
        return subCategoryService.GetSubCategoryByCategory(id);
    }

    @GetMapping("/getAllSubCategory")
    public List<SubCategory> getAllSubCategory() {
        return subCategoryService.GetAllCategory();
    }

    @PostMapping("/createSubCategory/{id}")
    public SubCategory createSubCategory(@PathVariable("id") Long id,@RequestParam("name") String name) {
        return subCategoryService.AddSubCategory(name,id);
    }
}
