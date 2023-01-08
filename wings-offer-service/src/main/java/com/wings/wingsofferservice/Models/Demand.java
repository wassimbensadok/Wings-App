package com.wings.wingsofferservice.Models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.jndi.toolkit.url.Uri;
import com.sun.org.apache.xerces.internal.util.URI;
import lombok.Data;

import javax.persistence.*;
import java.net.URL;
import java.util.Date;

@Entity
@Data
public class Demand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String type;
    private String tel_receiver;
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Date date_delivery;
    private double weight;
    private double height;
    private double length;
    private String filename;
    private String remark;
    private int VerificationCode;
    @Enumerated(EnumType.STRING)
    private EtatDemand etatdemand;
    private long userId;
    private  long routeId;

    @OneToOne
    private Offer offer;
    @Transient
    private Route route;

    @Transient
    private String fileURL;
    /*
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Date date ;*/




}
