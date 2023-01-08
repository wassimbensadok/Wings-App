package com.wingsshopservice.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.wingsshopservice.Model.Product_Combination;
import com.wingsshopservice.Repository.ProComRepository;
import com.wingsshopservice.Services.Product_CombinationService;
import com.wingsshopservice.StorageService.ProductFileStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class ProComController {

    @Autowired
    Product_CombinationService productCombinationService;

    @Autowired
    ProComRepository proComRepository;

    @Autowired
    ProductFileStorage productFileStorage;

    @GetMapping("/getProComByProId/{id}")
    public Optional<Product_Combination> getProComByProId(@PathVariable("id") long id) throws JsonProcessingException {
        return productCombinationService.getProComByProId(id);
    }

    @GetMapping("/getAllProComByUserId/{id}")
    public List<Product_Combination> getAllProComByUserId(@PathVariable("id") long id) throws JsonProcessingException {
        return productCombinationService.getAllProComByUserId(id);
    }

    @GetMapping("/getProComByCart/{id}")
    public List<Product_Combination> getProComByCart(@PathVariable("id") long id) throws JsonProcessingException {
        return productCombinationService.getProComByCard(id);
    }

    @GetMapping("/getProComByProName/{name}")
    public Optional<Product_Combination> getProComByProName(@PathVariable("name") String name) throws JsonProcessingException {
        return productCombinationService.getProComByProName(name);
    }

    @GetMapping("/getAllProCom")
    public List<Product_Combination> getAllProCom(){
        return productCombinationService.getAllProCom();
    }

    @GetMapping("/getAllProComWithVendor")
    public List<Product_Combination> getAllProComWithVendor(){
        return productCombinationService.getAllProComWithUser();
    }

    @GetMapping("/getProComBySubCat")
    public List<Product_Combination> getProComBySubCatId (@RequestParam String SubCaName ) throws JsonProcessingException {
        return productCombinationService.getProComBySubCat(SubCaName);
    }

    @GetMapping("/getProComByCat/{Category}")
    public List<Product_Combination> getProComByCatId (@PathVariable("Category") String category ) throws JsonProcessingException {
        return productCombinationService.getProComByCat(category);
    }

    @GetMapping("/getProComByCatAndActivePro/{Category}")
    public List<Product_Combination> getProComByCatAndActivePro (@PathVariable("Category") String category ){
        return productCombinationService.getProComByCatAndActivePro(category);
    }

    @GetMapping("/getProComBySubCatAndActivePro/{SubCaName}")
    public List<Product_Combination> getProComBySubCatAndActivePro (@PathVariable("SubCaName") String SubCaName ) throws JsonProcessingException {
        return productCombinationService.getProComBySubCatAndActivePro(SubCaName);
    }

    @GetMapping("search/{search}")
    public List<Product_Combination> search(@PathVariable("search") String search ) {
        return productCombinationService.search(search);
    }

    @GetMapping("getRandomPro")
    public List<Product_Combination> getRandomPro() {
        return productCombinationService.getRandomPro();
    }

    @GetMapping("/getProComFile/{filename:.+}")
    public ResponseEntity<Resource> getProComFile(@PathVariable String filename) {
        Resource file = productFileStorage.load(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }
}
