package com.wingsshopservice;

import com.wingsshopservice.StorageService.FilesStorageService;
import com.wingsshopservice.StorageService.ProductFileStorage;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

import javax.annotation.Resource;

@SpringBootApplication
@EnableFeignClients
public class WingsShopServiceApplication implements CommandLineRunner {

    @Resource
    FilesStorageService storageService;
    @Resource
    ProductFileStorage productFileStorage;

    public static void main(String[] args) {
        SpringApplication.run(WingsShopServiceApplication.class, args);
    }

    @Override
    public void run(String... arg) throws Exception {
        storageService.init();
        productFileStorage.init();
    }

}
