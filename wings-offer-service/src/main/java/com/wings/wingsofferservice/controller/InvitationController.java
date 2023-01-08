package com.wings.wingsofferservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wings.wingsofferservice.DTO.DemandDTO;
import com.wings.wingsofferservice.DTO.InvitationDTO;
import com.wings.wingsofferservice.Models.Invitation;
import com.wings.wingsofferservice.Service.InvitationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class InvitationController {

    @Autowired
    InvitationService invitationService;

    @GetMapping("/getInvitationByDeliveryId/{id}")
    public List<Invitation> getInvitationByDeliveryId(@PathVariable("id") long id){
       return invitationService.getInvitationByDeliveryId(id);
    }

    @GetMapping("/getInvitationByUserId/{id}")
    public List<Invitation> getInvitationByUserId(@PathVariable("id") long id){
        return invitationService.getInvitationByUserId(id);
    }

    @PostMapping("/SendInvitation")
    public Invitation SendInvitation(@RequestBody InvitationDTO invitationDTO)  {

          return   invitationService.CreateInvitation(invitationDTO);

    }

    @GetMapping("/AcceptInvitation/{id}")
    public ResponseEntity<?> AcceptInvitation(@PathVariable("id") long id)  {
        try{
            invitationService.AcceptInvitation(id);
            return new ResponseEntity<>("Invitation accepted successfully", HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/RefuseInvitation/{id}")
    public ResponseEntity<?> RefuseInvitation(@PathVariable("id") long id)  {
        try{
            invitationService.refuseInvitation(id);
            return new ResponseEntity<>("Demand registered successfully", HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/CancelInvitation/{id}")
    public ResponseEntity<?> CancelInvitation(@PathVariable("id") long id)  {
        try{
            invitationService.cancelInvitation(id);
            return new ResponseEntity<>("Invitation delete successfully", HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
