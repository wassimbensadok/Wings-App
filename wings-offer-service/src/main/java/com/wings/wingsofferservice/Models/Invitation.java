package com.wings.wingsofferservice.Models;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Invitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @OneToOne
    private Offer offer;
    @OneToOne
    private  Demand demand;
    private long userId;
    private long deliveryId;
    @Enumerated(EnumType.STRING)
    private EtatInvitation etatInvitation;

    @Transient
    private User user;

    @Transient
    private User delivery;
}
