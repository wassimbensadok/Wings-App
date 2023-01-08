package com.wingsshopservice.DTO;

import com.wingsshopservice.Model.Command;
import com.wingsshopservice.Model.Product;
import lombok.Data;

import javax.persistence.ManyToOne;
import java.math.BigDecimal;

@Data
public class ComItemDTO {
    private int quantity;
    private BigDecimal price;
    private long productId;
    private long commandId;
}
