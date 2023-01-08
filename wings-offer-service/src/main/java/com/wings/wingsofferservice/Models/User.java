package com.wings.wingsofferservice.Models;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

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
