package com.wings.wingsuserservice.Feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "SHOP-SERVICE")
public interface ShopeFiegnService {
    @RequestMapping(method = RequestMethod.POST, value = "/api/Card", consumes = "application/json")
    void createCard(@RequestParam("file") MultipartFile file, @RequestParam("card") String cardDTO);
}
