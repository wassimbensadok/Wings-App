package com.wingsshopservice.Model;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Data
public class Product_Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int totalStock;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;
    @OneToOne
    private Product_Combination productCombination;


}
