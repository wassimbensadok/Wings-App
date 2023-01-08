package com.wingsshopservice.DTO;

import com.wingsshopservice.Model.CommandStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
@Data
public class CommandDTO {
    private BigDecimal totalPrice;
    private Date date;
    private CommandStatus status;
    private long userId;
    private long deliveryId;
}
