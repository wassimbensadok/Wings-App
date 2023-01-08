package com.wingsshopservice.DTO;

import lombok.Data;

@Data
public class CardDTO {
    private long id;
    private  String ShopName;
    private String type;
    private String commercial_register;
    private String WebSite;
    private long userProId;
}
