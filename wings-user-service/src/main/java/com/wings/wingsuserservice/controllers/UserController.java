package com.wings.wingsuserservice.controllers;

import com.wings.wingsuserservice.StorageService.FilesStorageService;
import com.wings.wingsuserservice.models.Delivery;
import com.wings.wingsuserservice.models.User;
import com.wings.wingsuserservice.models.UserPro;
import com.wings.wingsuserservice.payload.request.SignupRequest;
import com.wings.wingsuserservice.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    FilesStorageService storageService;


    @GetMapping("/GetOnlyUser")
    public List<User> GetOnlyUser(){
        return userService.getOnlyUser();
    }



    @GetMapping("/GetAllUser")
    public List<User> GetAllUser(){
        return userService.GetAllUser();
    }

    @GetMapping("/GetUserById/{id}")
    public User GetUserById (@PathVariable("id") Long id){
        return userService.GetUserById(id);
    }

    @GetMapping("/enableUserById/{id}")
    public ResponseEntity<?> enableUserById (@PathVariable("id") Long id){
        try{
           userService.enabledUserById(id);
            return new ResponseEntity<>("User enabled successfully", HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/disableUserById/{id}")
    public ResponseEntity<?> disableUserById (@PathVariable("id") Long id){
        try{
            userService.disableUserById(id);
            return new ResponseEntity<>("User disabled successfully", HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @GetMapping("/GetByFilter")
    public Optional<User> GetByFilter (@RequestBody SignupRequest user){
        System.out.println(user);
        return userService.GetByFilter(user);
    }

    @GetMapping("/GetUser")
    public List<User> GetUser() {
        return userService.GetUser();
    }

    @GetMapping("/GetDelivery")
    public List<Delivery> GetDelivery() {
        return userService.GetDelivery();
    }

    @GetMapping("/GetUserPro")
    public List<UserPro> GetUserPro() {
        return userService.GetUserPro();
    }

    @GetMapping("/GetAdmin")
    public List<User> GetAdmin (){
        return userService.GetAdmin();
    }

    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storageService.load(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }
}
