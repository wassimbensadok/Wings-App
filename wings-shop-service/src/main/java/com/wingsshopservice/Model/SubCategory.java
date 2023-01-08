package com.wingsshopservice.Model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class SubCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String subCategoryName;
    @ManyToOne
    private Category category;
}
