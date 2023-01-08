package com.wings.wingsuserservice.Mailer;

import lombok.Data;

@Data
public class SubscribeForm {
    private String name;
    private String email;
    private String link;
}
