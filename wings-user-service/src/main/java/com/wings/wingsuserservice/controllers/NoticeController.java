package com.wings.wingsuserservice.controllers;

import com.wings.wingsuserservice.payload.request.NoticeDTO;
import com.wings.wingsuserservice.payload.request.SignupRequest;
import com.wings.wingsuserservice.security.services.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class NoticeController {

    @Autowired
    NoticeService noticeService;

    @PostMapping("/createSpecificNotice")
    public ResponseEntity<?> createSpecificNotice(@RequestBody NoticeDTO noticeDTO) {
        try {
            noticeService.createSpecificNotice(noticeDTO);
            return new ResponseEntity<>("Notice create successfully", HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/createProdcutNotice")
    public ResponseEntity<?> createProdcutNotice(@RequestBody NoticeDTO noticeDTO) {
        try {
            noticeService.createProductNotice(noticeDTO);
            return new ResponseEntity<>("Notice create successfully", HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
