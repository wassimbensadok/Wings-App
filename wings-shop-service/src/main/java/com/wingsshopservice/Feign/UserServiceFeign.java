package com.wingsshopservice.Feign;

import com.wingsshopservice.Model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Optional;

@FeignClient(name = "USER-SERVICE")
public interface UserServiceFeign {

    @RequestMapping(method = RequestMethod.GET, value = "/api/auth/GetUserById/{id}")
    User GetUserById(@PathVariable("id") Long id);

}
