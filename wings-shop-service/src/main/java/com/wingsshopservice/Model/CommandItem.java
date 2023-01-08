package com.wingsshopservice.Model;

import lombok.Data;
import org.bouncycastle.pqc.math.linearalgebra.PolynomialRingGF2;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Data
public class CommandItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int quantity;
    private BigDecimal price;
    @ManyToOne
    private Product product;
    @ManyToOne
    private Command command;
}
