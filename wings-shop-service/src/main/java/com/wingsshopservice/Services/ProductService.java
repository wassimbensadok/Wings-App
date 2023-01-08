package com.wingsshopservice.Services;


import com.wingsshopservice.DTO.ProductDTO;
import com.wingsshopservice.Model.*;
import com.wingsshopservice.Repository.*;
import com.wingsshopservice.StorageService.ProductFileStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CardRepository cardRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    SubCategoryRepository subCategoryRepository;

    @Autowired
    ProComRepository proComRepository;

    @Autowired
    ProStockRepository proStockRepository;

    @Autowired
    ProductFileStorage productFileStorage;

    public Product GetProductById(long id){
        Product product = new Product();
        Optional<Product> productOptional = productRepository.findById(id);
        if(productOptional.isPresent()){
            product = productOptional.get();
            Optional<Product_Combination> productCombination= proComRepository.findByProductId(product.getId());
            if(productCombination.isPresent()){
                Product_Combination product_combination = productCombination.get();
                product.setProductCombination(product_combination);
            }
        }
        return product;
    }

    public Optional<Product> GetProductByName(String name){
        return productRepository.findByName(name);
    }

    public Product Enabel(long id){
        Optional<Product> optionalProduct =  productRepository.findById(id);
        Product product = optionalProduct.get();
        if(!product.isValid())
            product.setValid(true);

        productRepository.save(product);
        return product;
    }

    public Product Desabel(long id){
        Optional<Product> optionalProduct =  productRepository.findById(id);
        Product product = optionalProduct.get();
        if(product.isValid())
            product.setValid(false);

        productRepository.save(product);
        return product;
    }

    public List<Product> GetActiveProduct(){
        try{
            return productRepository.findAllByValidIsTrue();
        }catch (Exception e){
            return null;
        }
    }

    public List<Product> GetAllProduct(){
        return productRepository.findAllProduct();
    }

    public Product AddProdcut (MultipartFile fileI,MultipartFile fileII,MultipartFile fileIII,MultipartFile fileIIII,ProductDTO productDTO){
        Card card = new Card();
        card = cardRepository.findById(productDTO.getCardId()).get();
        Category category = new Category();
        category = categoryRepository.findById(productDTO.getCategoryId()).get();
        SubCategory subCategory = new SubCategory();
        subCategory = subCategoryRepository.findById(productDTO.getSubCategoryId()).get();
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setSlug(productDTO.getSlug());
        product.setValid(false);
        product.setDetails(productDTO.getDetails());
        product.setPicture1(fileI.getOriginalFilename());
        product.setPicture2(fileII.getOriginalFilename());
        product.setPicture3(fileIII.getOriginalFilename());
        product.setPicture4(fileIIII.getOriginalFilename());
        product.setCard(card);
        product.setCategory(category);
        product.setSubCategory(subCategory);
        Product product1 = productRepository.save(product);
        productFileStorage.save(fileI);
        productFileStorage.save(fileII);
        productFileStorage.save(fileIII);
        productFileStorage.save(fileIIII);

        Product_Combination productCombination = new Product_Combination();
        productCombination.setSku(productDTO.getSku());
        productCombination.setModel(productDTO.getModel());
        productCombination.setWeight(productDTO.getWeight());
        productCombination.setLength(productDTO.getLength());
        productCombination.setWidth(productDTO.getWidth());
        productCombination.setHeight(productDTO.getHeight());
        productCombination.setColor(productDTO.getColor());
        productCombination.setPrice(productDTO.getPrice());
        productCombination.setProduct(product1);
        Product_Combination productCombination1 = proComRepository.save(productCombination);

        Product_Stock productStock = new Product_Stock();
        productStock.setTotalStock(productDTO.getTotalStock());
        productStock.setUnitPrice(productDTO.getPrice());
        productStock.setTotalPrice(productDTO.getPrice().multiply(BigDecimal.valueOf(productDTO.getTotalStock())));
        productStock.setProductCombination(productCombination1);
        proStockRepository.save(productStock);
        return product1;

    }

    public Product UpdateProduct(long id ,MultipartFile fileI,MultipartFile fileII,MultipartFile fileIII,MultipartFile fileIIII,ProductDTO productDTO){
        Category category = new Category();
        category = categoryRepository.findById(productDTO.getCategoryId()).get();
        SubCategory subCategory = new SubCategory();
        subCategory = subCategoryRepository.findById(productDTO.getSubCategoryId()).get();
        Product product = productRepository.findById(id).get();
        product.setName(productDTO.getName());
        product.setSlug(productDTO.getSlug());
        product.setDetails(productDTO.getDetails());
        productFileStorage.delete(product.getPicture1());
        productFileStorage.delete(product.getPicture2());
        productFileStorage.delete(product.getPicture3());
        productFileStorage.delete(product.getPicture4());
        productFileStorage.save(fileI);
        productFileStorage.save(fileII);
        productFileStorage.save(fileIII);
        productFileStorage.save(fileIIII);
        product.setPicture1(fileI.getOriginalFilename());
        product.setPicture2(fileII.getOriginalFilename());
        product.setPicture3(fileIII.getOriginalFilename());
        product.setPicture4(fileIIII.getOriginalFilename());
        product.setCategory(category);
        product.setSubCategory(subCategory);
        Product product1 = productRepository.save(product);


        Product_Combination productCombination = proComRepository.findByProductId(id).get();
        productCombination.setSku(productDTO.getSku());
        productCombination.setModel(productDTO.getModel());
        productCombination.setWeight(productDTO.getWeight());
        productCombination.setLength(productDTO.getLength());
        productCombination.setWidth(productDTO.getWidth());
        productCombination.setHeight(productDTO.getHeight());
        productCombination.setColor(productDTO.getColor());
        productCombination.setPrice(productDTO.getPrice());
        productCombination.setProduct(product1);
        Product_Combination productCombination1 = proComRepository.save(productCombination);

        Product_Stock productStock = proStockRepository.findByProductCombination_Id(productCombination.getId()).get();
        productStock.setTotalStock(productDTO.getTotalStock());
        productStock.setUnitPrice(productDTO.getPrice());
        productStock.setTotalPrice(productDTO.getPrice().multiply(BigDecimal.valueOf(productDTO.getTotalStock())));
        productStock.setProductCombination(productCombination1);
        proStockRepository.save(productStock);

        return product;
    }

    public void DeletePro(long id){
        Optional<Product_Combination> productCombinationOptional =  proComRepository.findByProductId(id);
        Product_Combination productCombination = productCombinationOptional.get();
        proStockRepository.deleteByProductCombination_Id(productCombination.getId());
        proComRepository.deleteById(productCombination.getId());
        productRepository.deleteById(id);
    }

}
