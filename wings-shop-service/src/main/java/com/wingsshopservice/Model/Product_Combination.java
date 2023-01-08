package com.wingsshopservice.Model;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Data
public class Product_Combination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String sku;
    private String model;
    private double weight;
    private double length;
    private double width;
    private double height;
    private String color;
    private BigDecimal price;
    @OneToOne
    private Product product;

    @Transient
    private User user;

    @Transient
    private int productStock;

}
