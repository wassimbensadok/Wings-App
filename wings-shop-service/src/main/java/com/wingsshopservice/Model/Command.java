package com.wingsshopservice.Model;

import com.google.inject.internal.BindingImpl;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Command {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private BigDecimal totalPrice;
    private Date date;
    private CommandStatus status;
    private long userId;
    private long deliveryId;

    @Transient
    private User user;
}
