package com.wingsshopservice.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wingsshopservice.DTO.ProductDTO;
import com.wingsshopservice.Model.Product;
import com.wingsshopservice.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping("/getProductById/{id}")
    public Product getProductById(@PathVariable("id") long id) {
        return productService.GetProductById(id);
    }

    @GetMapping("/getProductByName/{name}")
    public Optional<Product> getProductByName(@PathVariable("name") String name) {
        return productService.GetProductByName(name);
    }

    @GetMapping("/getAllProduct")
    public List<Product> getAllProduct() {
        return productService.GetAllProduct();
    }

    @GetMapping("/getActiveProduct")
    public List<Product> getActiveProduct() {
        return productService.GetActiveProduct();
    }

    @PostMapping("/createProduct")
    public Product createProduct(@RequestParam("fileI")MultipartFile fileI,@RequestParam("fileII")MultipartFile fileII,@RequestParam("fileIII")MultipartFile fileIII,@RequestParam("fileIIII")MultipartFile fileIIII, @RequestParam("product") String product) throws JsonProcessingException {
        ProductDTO productDTO = new ObjectMapper().readValue(product, ProductDTO.class);
        return productService.AddProdcut(fileI,fileII,fileIII,fileIIII,productDTO);
    }

    @PutMapping("/updateProduct/{id}")
    public Product updateProduct(@PathVariable("id") long id,@RequestParam("fileI")MultipartFile fileI,@RequestParam("fileII")MultipartFile fileII,@RequestParam("fileIII")MultipartFile fileIII,@RequestParam("fileIIII")MultipartFile fileIIII, @RequestParam("product") String product) throws JsonProcessingException {
        ProductDTO productDTO = new ObjectMapper().readValue(product, ProductDTO.class);
        return productService.UpdateProduct(id,fileI,fileII,fileIII,fileIIII,productDTO);
    }

    @GetMapping("/EnabelPro/{id}")
    public Product EnabelPro(@PathVariable("id") long id) {
        return productService.Enabel(id);
    }

    @GetMapping("/DesabelPro/{id}")
    public Product DesabelPro(@PathVariable("id") long id) {
        return productService.Desabel(id);
    }

    @DeleteMapping("/DeletePro/{id}")
    public ResponseEntity<?> DeletePro(@PathVariable("id") long id) {
        try{
            productService.DeletePro(id);
            return new ResponseEntity<>("Product delete successfully", HttpStatus.CREATED);
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
