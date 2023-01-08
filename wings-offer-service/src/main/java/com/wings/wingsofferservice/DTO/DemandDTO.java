package com.wings.wingsofferservice.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Data
public class DemandDTO {
    private String departGov;
    private String departAdr;
    private String arriGov;
    private String arriAdr;
    private String type;
    private String tel_receiver;
    private String remark;
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Date date_delivery;
    private double weight;
    private double height;
    private double length;
    private long userId;
    private long RouteId;

}
