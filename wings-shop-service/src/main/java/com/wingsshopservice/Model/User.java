package com.wingsshopservice.Model;

import lombok.Data;

@Data
public class User {

  private Long id;
  private String firstName;
  private String lastName;
  private String email;
  private String password;
  private String governorate;
  private String address;
  private String phone;

}
