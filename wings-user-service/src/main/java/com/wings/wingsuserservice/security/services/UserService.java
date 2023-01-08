package com.wings.wingsuserservice.security.services;

import com.wings.wingsuserservice.controllers.UserController;
import com.wings.wingsuserservice.models.*;
import com.wings.wingsuserservice.payload.request.SignupRequest;
import com.wings.wingsuserservice.repository.DeliveryRepository;
import com.wings.wingsuserservice.repository.UserProRepository;
import com.wings.wingsuserservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    DeliveryRepository deliveryRepository;

    @Autowired
    UserProRepository userProRepository;

    public List<User> GetAllUser(){
        return userRepository.findAll();
    }

    public User GetUserById (Long id) {
        User user  = new User();
        user = userRepository.findById(id).get();
        user.setPassword(null);
        return  user;
    }
    public Optional<User> GetByFilter (SignupRequest user){
        if(!user.getFirstname().isEmpty()  && !user.getLastname().isEmpty()) {
            return userRepository.findByFirstNameAndFirstName(user.getFirstname(), user.getLastname());

        }else
            return null;
    }

    public List<User> GetAdmin () {
        List<User> userList = userRepository.findAll();
        List<User> users = new ArrayList<>();
        for(User user:userList){
            List<String> roles = user.getRoles().stream()
                    .map(item -> item.getName().name())
                    .collect(Collectors.toList());
            if(roles.contains("ROLE_ADMIN") || roles.contains("ROLE_AGENT") )
                users.add(user);
        }
        return users;
    }

    public List<User> GetUser () {
        List<User> userList = userRepository.findAll();
        List<User> users = new ArrayList<>();
        for(User user:userList){
            List<String> roles = user.getRoles().stream()
                    .map(item -> item.getName().name())
                    .collect(Collectors.toList());
            if(roles.contains("ROLE_USER") )
            users.add(user);
        }
        return users;
    }

    public List<Delivery> GetDelivery () {
        String frontURL;
        String backURL;
        List<Delivery> deliveryList = deliveryRepository.findAll();
        for(Delivery delivery:deliveryList) {
            if (delivery.getCinFront() != null) {
                frontURL = MvcUriComponentsBuilder
                        .fromMethodName(UserController.class, "getFile", delivery.getCinFront()).build().toString();

                delivery.setCinFront(frontURL);
            }
            if (delivery.getCinBack() != null) {
                backURL = MvcUriComponentsBuilder
                        .fromMethodName(UserController.class, "getFile", delivery.getCinBack()).build().toString();

                delivery.setCinBack(backURL);
            }

        }
        return deliveryList;

    }

    public List<UserPro> GetUserPro () {
        return userProRepository.findAll();

    }

    public User enabledUserById(long id){
        User user = userRepository.findById(id).get();

        user.setActive(true);
        return userRepository.save(user);
    }

    public User disableUserById(long id){
        User user = userRepository.findById(id).get();
        user.setActive(false);
        return userRepository.save(user);
    }

    public List<User> getOnlyUser(){
        List<User> userList = userRepository.findAll();
        List<User> users = new ArrayList<>();
        for(User user:userList){
            List<String> roles = user.getRoles().stream()
                    .map(item -> item.getName().name())
                    .collect(Collectors.toList());
            if(roles.contains("ROLE_USER") )
                users.add(user);
        }
        return users;
    }
}
