package com.wingsshopservice.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wingsshopservice.DTO.CardDTO;
import com.wingsshopservice.Model.Card;
import com.wingsshopservice.Model.Category;
import com.wingsshopservice.Services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @GetMapping("/getCategoryById/{id}")
    public Optional<Category> getCategoryById(@PathVariable("id") long id) {
        return categoryService.GetCategoryById(id);
    }

    @GetMapping("/getCategoryByName/{name}")
    public Optional<Category> getCategoryByName(@PathVariable("name") String name) {
        return categoryService.GetCategoryByName(name);
    }

    @GetMapping("/getAllCategory")
    public List<Category> getAllCategory() {
        return categoryService.GetAllCategory();
    }

    @PostMapping("/createCategory")
    public Category createCategory(@RequestParam String name) {
        return categoryService.AddCategory(name);
    }
}
