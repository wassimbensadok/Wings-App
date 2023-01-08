package com.wingsshopservice.Controller;

import com.wingsshopservice.Model.Card;
import com.wingsshopservice.Model.Product_Stock;
import com.wingsshopservice.Services.Product_StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class ProStockController {

    @Autowired
    Product_StockService productStockService;

    @GetMapping("/getProductStock/{id}")
    public Optional<Product_Stock> getProductStock(@PathVariable("id") long id) {

        return productStockService.getProdStock(id);
    }
}
