package com.wings.wingsofferservice.DTO;

import lombok.Data;

@Data
public class InvitationDTO {
    private  long id;
    private long OfferId;
    private long DemandId;
    private long userId;
    private long deliveryId;

    public long getOfferId() {
        return OfferId;
    }

    public void setOfferId(long offerId) {
        OfferId = offerId;
    }

    public long getDemandId() {
        return DemandId;
    }

    public void setDemandId(long demandId) {
        DemandId = demandId;
    }
}
