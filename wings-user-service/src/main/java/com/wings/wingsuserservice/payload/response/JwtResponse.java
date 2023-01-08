package com.wings.wingsuserservice.payload.response;

import java.util.List;

public class JwtResponse {
  private String token;
  private String type = "Bearer";
  private Long id;
  private String email;
  private String firstname;
  private String lastname;
  private boolean isActive;
  private List<String> roles;

  public JwtResponse(String accessToken, Long id, String email, List<String> roles) {
    this.token = accessToken;
    this.id = id;
    this.email = email;
    this.roles = roles;
  }

  public JwtResponse(String accessToken, Long id, String firstname,String lastname, String email, boolean isActive, List<String> roles) {
    this.token = accessToken;
    this.type = "Bearer";
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.isActive = isActive;
    this.roles = roles;
  }

  public String getAccessToken() {
    return token;
  }

  public void setAccessToken(String accessToken) {
    this.token = accessToken;
  }

  public String getTokenType() {
    return type;
  }

  public void setTokenType(String tokenType) {
    this.type = tokenType;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getFirstname() {
    return firstname;
  }

  public void setFirstname(String firstname) {
    this.firstname = firstname;
  }

  public String getLastname() {
    return lastname;
  }

  public void setLastname(String lastname) {
    this.lastname = lastname;
  }

  public List<String> getRoles() {
    return roles;
  }

  public boolean getIsActive() {
    return isActive;
  }

  public void setActive(boolean active) {
    isActive = active;
  }
}
