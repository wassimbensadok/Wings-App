package com.wingsshopservice.Services;


import com.wingsshopservice.Controller.ProComController;
import com.wingsshopservice.Feign.UserServiceFeign;
import com.wingsshopservice.Model.*;
import com.wingsshopservice.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class Product_CombinationService {
    @Autowired
    ProComRepository proComRepository;
    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    SubCategoryRepository subCategoryRepository;

    @Autowired
    ProStockRepository proStockRepository;

    @Autowired
    CardRepository cardRepository;

    private  final UserServiceFeign userServiceFeign;

    public Product_CombinationService(UserServiceFeign userServiceFeign) {
        this.userServiceFeign = userServiceFeign;
    }

    public Optional<Product_Combination> getProComByProId(long id){
        Optional<Product_Combination> productCombination =  proComRepository.findByProductId(id);
        if(productCombination.isPresent()){
            Product product = productCombination.get().getProduct();
            product.setPicture1(MvcUriComponentsBuilder
                    .fromMethodName(ProComController.class, "getProComFile", product.getPicture1()).build().toString());
            product.setPicture2(MvcUriComponentsBuilder
                    .fromMethodName(ProComController.class, "getProComFile", product.getPicture2()).build().toString());
            product.setPicture3(MvcUriComponentsBuilder
                    .fromMethodName(ProComController.class, "getProComFile", product.getPicture3()).build().toString());
            product.setPicture4(MvcUriComponentsBuilder
                    .fromMethodName(ProComController.class, "getProComFile", product.getPicture4()).build().toString());
            productCombination.get().setProduct(product);
            Product_Stock productStock = proStockRepository.findByProductCombination_Id(productCombination.get().getId()).get();
            productCombination.get().setProductStock(productStock.getTotalStock());
        }
        return productCombination;
    }

    public Optional<Product_Combination> getProComByProName(String name){
            Optional<Product_Combination> productCombination = proComRepository.findByProduct_Name(name);
            if(productCombination.isPresent()){
                Product product = productCombination.get().getProduct();
                product.setPicture1(MvcUriComponentsBuilder
                        .fromMethodName(ProComController.class, "getProComFile", product.getPicture1()).build().toString());
                product.setPicture2(MvcUriComponentsBuilder
                        .fromMethodName(ProComController.class, "getProComFile", product.getPicture2()).build().toString());
                product.setPicture3(MvcUriComponentsBuilder
                        .fromMethodName(ProComController.class, "getProComFile", product.getPicture3()).build().toString());
                product.setPicture4(MvcUriComponentsBuilder
                        .fromMethodName(ProComController.class, "getProComFile", product.getPicture4()).build().toString());
                productCombination.get().setProduct(product);

            return productCombination;
        }
        return null;
    }


    public List<Product_Combination> getProComByCard(long id){
        Optional<Card> cardOptional = cardRepository.findById(id);
        if (cardOptional.isPresent()) {
            Card card = cardOptional.get();
            List<Product_Combination> productCombination = proComRepository.findByProductCard(card);
            for(Product_Combination procom: productCombination){
                Product product = procom.getProduct();
                if(product.getPicture1() != null) {
                    product.setPicture1(MvcUriComponentsBuilder
                            .fromMethodName(ProComController.class, "getProComFile", product.getPicture1()).build().toString());
                }
                if(product.getPicture2() != null) {
                    product.setPicture2(MvcUriComponentsBuilder
                            .fromMethodName(ProComController.class, "getProComFile", product.getPicture2()).build().toString());

                }
                if(product.getPicture3() != null) {
                    product.setPicture3(MvcUriComponentsBuilder
                            .fromMethodName(ProComController.class, "getProComFile", product.getPicture3()).build().toString());

                }
                if(product.getPicture4() != null) {
                    product.setPicture4(MvcUriComponentsBuilder
                            .fromMethodName(ProComController.class, "getProComFile", product.getPicture4()).build().toString());
                }
                procom.setProduct(product);
            }
            return productCombination;
        }
        return null;
    }
















    public List<Product_Combination> getProComBySubCat(String name){
        Optional<SubCategory> subCategoryOptional = subCategoryRepository.findBySubCategoryName(name);
        if (subCategoryOptional.isPresent()) {
            SubCategory subCategory = subCategoryOptional.get();
            List<Product_Combination> productCombination = proComRepository.findByProduct_SubCategory(subCategory);
            for(Product_Combination procom: productCombination){
                Product product = procom.getProduct();
                if(product.getPicture1() != null) {
                    product.setPicture1(MvcUriComponentsBuilder
                            .fromMethodName(ProComController.class, "getProComFile", product.getPicture1()).build().toString());
                }
                if(product.getPicture2() != null) {
                    product.setPicture2(MvcUriComponentsBuilder
                            .fromMethodName(ProComController.class, "getProComFile", product.getPicture2()).build().toString());

                }
                if(product.getPicture3() != null) {
                    product.setPicture3(MvcUriComponentsBuilder
                            .fromMethodName(ProComController.class, "getProComFile", product.getPicture3()).build().toString());

                }
                if(product.getPicture4() != null) {
                    product.setPicture4(MvcUriComponentsBuilder
                            .fromMethodName(ProComController.class, "getProComFile", product.getPicture4()).build().toString());
                }
                procom.setProduct(product);
            }
            return productCombination;
        }
        return null;
    }

    public List<Product_Combination> getProComByCat(String name){
        Optional<Category> categoryOptional = categoryRepository.findByCategoryName(name);
        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            List<Product_Combination> productCombination = proComRepository.findByProductCategory(category);
            for(Product_Combination procom: productCombination){
                Product product = procom.getProduct();
                if(product.getPicture1() != null) {
                    product.setPicture1(MvcUriComponentsBuilder
                            .fromMethodName(ProComController.class, "getProComFile", product.getPicture1()).build().toString());
                }
                if(product.getPicture2() != null) {
                    product.setPicture2(MvcUriComponentsBuilder
                            .fromMethodName(ProComController.class, "getProComFile", product.getPicture2()).build().toString());

                }
                if(product.getPicture3() != null) {
                    product.setPicture3(MvcUriComponentsBuilder
                            .fromMethodName(ProComController.class, "getProComFile", product.getPicture3()).build().toString());

                }
                if(product.getPicture4() != null) {
                    product.setPicture4(MvcUriComponentsBuilder
                            .fromMethodName(ProComController.class, "getProComFile", product.getPicture4()).build().toString());
                }
                procom.setProduct(product);
            }
            return productCombination;
        }
        return null;
    }

    public List<Product_Combination> getProComByCatAndActivePro(String name){
        Optional<Category> categoryOptional = categoryRepository.findByCategoryName(name);
        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            List<Product_Combination> productCombination = proComRepository.findByProductCategory(category);
            List<Product_Combination> productCombinationList = new ArrayList<>();
            for(Product_Combination procom: productCombination){
                if(procom.getProduct().isValid()) {
                    Product product = procom.getProduct();
                    if (product.getPicture1() != null) {
                        product.setPicture1(MvcUriComponentsBuilder
                                .fromMethodName(ProComController.class, "getProComFile", product.getPicture1()).build().toString());
                    }
                    if (product.getPicture2() != null) {
                        product.setPicture2(MvcUriComponentsBuilder
                                .fromMethodName(ProComController.class, "getProComFile", product.getPicture2()).build().toString());

                    }
                    if (product.getPicture3() != null) {
                        product.setPicture3(MvcUriComponentsBuilder
                                .fromMethodName(ProComController.class, "getProComFile", product.getPicture3()).build().toString());

                    }
                    if (product.getPicture4() != null) {
                        product.setPicture4(MvcUriComponentsBuilder
                                .fromMethodName(ProComController.class, "getProComFile", product.getPicture4()).build().toString());
                    }
                    procom.setProduct(product);
                    productCombinationList.add(procom);
                }
            }
            return productCombinationList;
        }
        return null;
    }
    /****************************/
    public List<Product_Combination> getProComBySubCatAndActivePro(String name){
        Optional<SubCategory> subCategoryOptional = subCategoryRepository.findBySubCategoryName(name);
        List<Product> productList = productRepository.findAllByValidIsTrue();
        if (subCategoryOptional.isPresent()) {
            SubCategory subCategory = subCategoryOptional.get();
            List<Product_Combination> productCombination = proComRepository.findByProduct_SubCategory(subCategory);
            List<Product_Combination> productCombinationList = new ArrayList<>();
            for(Product_Combination procom: productCombination){
                if(procom.getProduct().isValid()) {

                    Product product = procom.getProduct();
                    if (product.getPicture1() != null) {
                        product.setPicture1(MvcUriComponentsBuilder
                                .fromMethodName(ProComController.class, "getProComFile", product.getPicture1()).build().toString());
                    }
                    if (product.getPicture2() != null) {
                        product.setPicture2(MvcUriComponentsBuilder
                                .fromMethodName(ProComController.class, "getProComFile", product.getPicture2()).build().toString());

                    }
                    if (product.getPicture3() != null) {
                        product.setPicture3(MvcUriComponentsBuilder
                                .fromMethodName(ProComController.class, "getProComFile", product.getPicture3()).build().toString());

                    }
                    if (product.getPicture4() != null) {
                        product.setPicture4(MvcUriComponentsBuilder
                                .fromMethodName(ProComController.class, "getProComFile", product.getPicture4()).build().toString());
                    }
                    procom.setProduct(product);
                    productCombinationList.add(procom);
                }
            }
            return productCombinationList;
        }
        return null;
    }





    public List<Product_Combination> getAllProCom(){
        List<Product_Combination> productCombination =  proComRepository.findAll();
        for(Product_Combination procom: productCombination){
            Product product = procom.getProduct();
            if(product.getPicture1() != null) {
                product.setPicture1(MvcUriComponentsBuilder
                        .fromMethodName(ProComController.class, "getProComFile", product.getPicture1()).build().toString());
            }
            if(product.getPicture2() != null) {
                product.setPicture2(MvcUriComponentsBuilder
                        .fromMethodName(ProComController.class, "getProComFile", product.getPicture2()).build().toString());

            }
            if(product.getPicture3() != null) {
                product.setPicture3(MvcUriComponentsBuilder
                        .fromMethodName(ProComController.class, "getProComFile", product.getPicture3()).build().toString());

            }
            if(product.getPicture4() != null) {
                product.setPicture4(MvcUriComponentsBuilder
                        .fromMethodName(ProComController.class, "getProComFile", product.getPicture4()).build().toString());
            }
            procom.setProduct(product);
        }
        return productCombination;
    }

    public List<Product_Combination> getAllProComWithUser(){
        List<Product_Combination> productCombination =  proComRepository.findAll();
        for(Product_Combination procom: productCombination){
            Product product = procom.getProduct();
            if(product.getPicture1() != null) {
                product.setPicture1(MvcUriComponentsBuilder
                        .fromMethodName(ProComController.class, "getProComFile", product.getPicture1()).build().toString());
            }
            if(product.getPicture2() != null) {
                product.setPicture2(MvcUriComponentsBuilder
                        .fromMethodName(ProComController.class, "getProComFile", product.getPicture2()).build().toString());

            }
            if(product.getPicture3() != null) {
                product.setPicture3(MvcUriComponentsBuilder
                        .fromMethodName(ProComController.class, "getProComFile", product.getPicture3()).build().toString());

            }
            if(product.getPicture4() != null) {
                product.setPicture4(MvcUriComponentsBuilder
                        .fromMethodName(ProComController.class, "getProComFile", product.getPicture4()).build().toString());
            }
            procom.setProduct(product);
            if(product.getCard() != null) {
                User user = userServiceFeign.GetUserById(product.getCard().getUserProId());
                procom.setUser(user);
            }
        }
        return productCombination;
    }

    public List<Product_Combination> getAllProComByUserId(long id){
        List<Product_Combination> productCombination =  proComRepository.findAll();
        List<Product_Combination> productCombinationList = new ArrayList<>();
        for(Product_Combination procom: productCombination){
            Product product = procom.getProduct();
            if(product.getCard() != null) {
                if (procom.getProduct().getCard().getUserProId() == id) {
                    if (product.getPicture1() != null) {
                        product.setPicture1(MvcUriComponentsBuilder
                                .fromMethodName(ProComController.class, "getProComFile", product.getPicture1()).build().toString());
                    }
                    if (product.getPicture2() != null) {
                        product.setPicture2(MvcUriComponentsBuilder
                                .fromMethodName(ProComController.class, "getProComFile", product.getPicture2()).build().toString());

                    }
                    if (product.getPicture3() != null) {
                        product.setPicture3(MvcUriComponentsBuilder
                                .fromMethodName(ProComController.class, "getProComFile", product.getPicture3()).build().toString());

                    }
                    if (product.getPicture4() != null) {
                        product.setPicture4(MvcUriComponentsBuilder
                                .fromMethodName(ProComController.class, "getProComFile", product.getPicture4()).build().toString());
                    }
                    procom.setProduct(product);
                    Product_Stock productStock = proStockRepository.findByProductCombination_Id(procom.getId()).get();
                    procom.setProductStock(productStock.getTotalStock());
                    productCombinationList.add(procom);
                }
            }
        }
        return productCombinationList;
    }

    public List<Product_Combination> search(String serach){
        Optional<Category> categoryOptional = categoryRepository.findByCategoryName(serach);
        List<Product_Combination> productCombination = new ArrayList<>();
        List<Product_Combination> productCombinationList = new ArrayList<>();
        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            productCombination = proComRepository.findByProductCategory(category);
            for(Product_Combination procom: productCombination){
                Product product = procom.getProduct();
                if(procom.getProduct().isValid()) {
                    if (product.getPicture1() != null) {
                        product.setPicture1(MvcUriComponentsBuilder
                                .fromMethodName(ProComController.class, "getProComFile", product.getPicture1()).build().toString());
                    }
                    if (product.getPicture2() != null) {
                        product.setPicture2(MvcUriComponentsBuilder
                                .fromMethodName(ProComController.class, "getProComFile", product.getPicture2()).build().toString());

                    }
                    if (product.getPicture3() != null) {
                        product.setPicture3(MvcUriComponentsBuilder
                                .fromMethodName(ProComController.class, "getProComFile", product.getPicture3()).build().toString());

                    }
                    if (product.getPicture4() != null) {
                        product.setPicture4(MvcUriComponentsBuilder
                                .fromMethodName(ProComController.class, "getProComFile", product.getPicture4()).build().toString());
                    }
                    procom.setProduct(product);
                    productCombinationList.add(procom);
                }
            }
            return productCombinationList;
        }
        Optional<SubCategory> subCategoryOptional = subCategoryRepository.findBySubCategoryName(serach);
        if (subCategoryOptional.isPresent()) {
            SubCategory subCategory = subCategoryOptional.get();
            productCombination = proComRepository.findByProduct_SubCategory(subCategory);
            for(Product_Combination procom: productCombination){
                Product product = procom.getProduct();
                if(procom.getProduct().isValid()) {
                    if (product.getPicture1() != null) {
                        product.setPicture1(MvcUriComponentsBuilder
                                .fromMethodName(ProComController.class, "getProComFile", product.getPicture1()).build().toString());
                    }
                    if (product.getPicture2() != null) {
                        product.setPicture2(MvcUriComponentsBuilder
                                .fromMethodName(ProComController.class, "getProComFile", product.getPicture2()).build().toString());

                    }
                    if (product.getPicture3() != null) {
                        product.setPicture3(MvcUriComponentsBuilder
                                .fromMethodName(ProComController.class, "getProComFile", product.getPicture3()).build().toString());

                    }
                    if (product.getPicture4() != null) {
                        product.setPicture4(MvcUriComponentsBuilder
                                .fromMethodName(ProComController.class, "getProComFile", product.getPicture4()).build().toString());
                    }
                    procom.setProduct(product);
                    productCombinationList.add(procom);
                }
            }
            return productCombinationList;
        }
        Optional<Product_Combination> productCombinationOptional = proComRepository.findByProduct_Name(serach);
        if(productCombinationOptional.isPresent()){
            Product product = productCombinationOptional.get().getProduct();
            product.setPicture1(MvcUriComponentsBuilder
                    .fromMethodName(ProComController.class, "getProComFile", product.getPicture1()).build().toString());
            product.setPicture2(MvcUriComponentsBuilder
                    .fromMethodName(ProComController.class, "getProComFile", product.getPicture2()).build().toString());
            product.setPicture3(MvcUriComponentsBuilder
                    .fromMethodName(ProComController.class, "getProComFile", product.getPicture3()).build().toString());
            product.setPicture4(MvcUriComponentsBuilder
                    .fromMethodName(ProComController.class, "getProComFile", product.getPicture4()).build().toString());
            productCombinationOptional.get().setProduct(product);
            if(productCombinationOptional.get().getProduct().isValid()) {
                productCombination.add(productCombinationOptional.get());
                return productCombination;
            }
        }
        return null;
    }

    public List<Product_Combination> getRandomPro(){
        List<Product_Combination> productCombination = proComRepository.getRandomProduct();
        List<Product_Combination> productCombinationList = new ArrayList<>();
        for(Product_Combination procom: productCombination) {
            if (procom.getProduct().isValid()) {
                Product product = procom.getProduct();
                if (product.getPicture1() != null) {
                    product.setPicture1(MvcUriComponentsBuilder
                            .fromMethodName(ProComController.class, "getProComFile", product.getPicture1()).build().toString());
                }
                if (product.getPicture2() != null) {
                    product.setPicture2(MvcUriComponentsBuilder
                            .fromMethodName(ProComController.class, "getProComFile", product.getPicture2()).build().toString());

                }
                if (product.getPicture3() != null) {
                    product.setPicture3(MvcUriComponentsBuilder
                            .fromMethodName(ProComController.class, "getProComFile", product.getPicture3()).build().toString());

                }
                if (product.getPicture4() != null) {
                    product.setPicture4(MvcUriComponentsBuilder
                            .fromMethodName(ProComController.class, "getProComFile", product.getPicture4()).build().toString());
                }
                procom.setProduct(product);
                productCombinationList.add(procom);
            }
        }
        return productCombinationList;
    }
}
