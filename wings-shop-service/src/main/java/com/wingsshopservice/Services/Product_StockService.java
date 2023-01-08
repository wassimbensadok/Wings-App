package com.wingsshopservice.Services;


import com.wingsshopservice.Model.Product_Stock;
import com.wingsshopservice.Repository.ProStockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class Product_StockService {

    @Autowired
    ProStockRepository proStockRepository;

    public Optional<Product_Stock> getProdStock(long id){
        return proStockRepository.findByProductCombination_Id(id);
    }
}
