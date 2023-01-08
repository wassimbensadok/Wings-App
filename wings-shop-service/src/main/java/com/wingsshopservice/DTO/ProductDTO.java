package com.wingsshopservice.DTO;

import com.wingsshopservice.Model.Card;
import lombok.Data;

import javax.persistence.OneToOne;
import java.math.BigDecimal;

@Data
public class ProductDTO {
    private  String name;
    private  String slug;
    private String details;
    private String sku;
    private String model;
    private int totalStock;
    private double weight;
    private double length;
    private double width;
    private double height;
    private String color;
    private BigDecimal price;
    private long cardId;
    private long categoryId;
    private long subCategoryId;
}
