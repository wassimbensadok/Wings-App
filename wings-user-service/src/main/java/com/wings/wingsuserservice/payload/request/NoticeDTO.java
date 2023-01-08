package com.wings.wingsuserservice.payload.request;

import lombok.Data;

@Data
public class NoticeDTO {
    private Long id;
    private String text_notice;
    private int note;
    private long userId;
    private long productId;
}
