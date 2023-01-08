package com.wingsshopservice.Model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private  String name;
    private  String slug;
    private boolean isValid;
    @Size(max = 2000)
    private String Details;
    private String picture1;
    private String picture2;
    private String picture3;
    private String picture4;

    @OneToOne(cascade=CascadeType.PERSIST, fetch = FetchType.EAGER)
    private Card card;

    @ManyToOne(cascade=CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private Category category;
    @ManyToOne
    @JoinColumn(name = "sub_category_id")
    private SubCategory subCategory;


    @Transient
    private Product_Combination productCombination;
}
