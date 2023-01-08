package com.wings.wingsofferservice.Service;

import com.wings.wingsofferservice.DTO.InvitationDTO;
import com.wings.wingsofferservice.Models.*;
import com.wings.wingsofferservice.Twilio.SmsRequest;
import com.wings.wingsofferservice.controller.DemandController;
import com.wings.wingsofferservice.feign.UserServiceFeign;
import com.wings.wingsofferservice.repository.DemandRepository;
import com.wings.wingsofferservice.repository.InvitationRepository;
import com.wings.wingsofferservice.repository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.util.List;
import java.util.Optional;

@Service
public class InvitationService {

    @Autowired
    DemandRepository demandRepository;

    @Autowired
    OfferRepository offerRepository;

    @Autowired
    InvitationRepository invitationRepository;
    private final com.wings.wingsofferservice.Twilio.Service service;
    private  final UserServiceFeign userServiceFeign;

    public InvitationService(UserServiceFeign userServiceFeign,com.wings.wingsofferservice.Twilio.Service service) {
        this.userServiceFeign = userServiceFeign;
        this.service = service;
    }

    public List<Invitation> getInvitationByDeliveryId(long id){
        try {
            List<Invitation> invitationList = invitationRepository.findByDeliveryIdOrderByIdDesc(id);
            for(Invitation invitation:invitationList){
                User user=userServiceFeign.GetUserById(invitation.getUserId());
                invitation.setUser(user);
                Optional<Route> route=userServiceFeign.getRoute(invitation.getDemand().getRouteId());
                invitation.getDemand().setRoute(route.get());
            }
            return invitationList;
        }catch (Exception e){
            return null;
        }
    }

    public List<Invitation> getInvitationByUserId(long id){
        try {
            List<Invitation> invitationList = invitationRepository.findByUserIdOrderByIdDesc(id);
            for(Invitation invitation:invitationList){
                User user=userServiceFeign.GetUserById(invitation.getUserId());
                User delivery= userServiceFeign.GetUserById(invitation.getDeliveryId());
                invitation.setUser(user);
                invitation.setDelivery(delivery);
                Optional<Route> route=userServiceFeign.getRoute(invitation.getDemand().getRouteId());
                invitation.getDemand().setRoute(route.get());
            }
            return invitationList;
        }catch (Exception e){
            return null;
        }
    }

    public Invitation CreateInvitation(InvitationDTO invitationDTO){
        Offer offer = new Offer();
        offer.setId(invitationDTO.getOfferId());
        Demand demand = new Demand();
        demand.setId(invitationDTO.getDemandId());
        Invitation invitation = new Invitation();;
        invitation.setOffer(offer);
        invitation.setDemand(demand);
        invitation.setUserId(invitationDTO.getUserId());
        invitation.setDeliveryId(invitationDTO.getDeliveryId());
        invitation.setEtatInvitation(EtatInvitation.pending);
        return invitationRepository.save(invitation);
    }

    public Invitation   AcceptInvitation(long id){
        Optional<Invitation> invitation = invitationRepository.findById(id);
        if (invitation.isPresent()){
            Invitation _invitation = invitation.get();
            _invitation.setEtatInvitation(EtatInvitation.accepted);
            Optional<Demand> demand = demandRepository.findById(_invitation.getDemand().getId());
            if(demand.isPresent()){
                Demand _demand = demand.get();
                _demand.setEtatdemand(EtatDemand.processed);
                demandRepository.save(_demand);
            }
            SmsRequest smsRequest = new SmsRequest(demand.get().getTel_receiver(),"Bonjour notre livreur va bientôt vous livrer le "+demand.get().getType()+" voici votre code de confirmation " +demand.get().getVerificationCode() + " pour confirmer la réception du "+demand.get().getType());
            service.sendSms(smsRequest);
            return invitationRepository.save(_invitation);


        }else{
            return  null;
        }
    }

    public Invitation   refuseInvitation(long id){
        Optional<Invitation> invitation = invitationRepository.findById(id);
        if (invitation.isPresent()){
            Invitation _invitation = invitation.get();
            _invitation.setEtatInvitation(EtatInvitation.refuse);
            return invitationRepository.save(_invitation);
        }else{
            return  null;
        }
    }

    public void  cancelInvitation(long id){
       invitationRepository.deleteById(id);
    }


}
