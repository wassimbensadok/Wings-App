package com.wings.wingsadresse.service.controller;

import com.wings.wingsadresse.service.Models.City;
import com.wings.wingsadresse.service.Models.Governorate;
import com.wings.wingsadresse.service.repository.CityRepository;
import com.wings.wingsadresse.service.repository.GovernorateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/adr")
public class AdrController {

    @Autowired
    GovernorateRepository governorateRepository ;

    @Autowired
    CityRepository cityRepository ;

    @GetMapping("/GetAllGovernorate")
    public List<Governorate> GetAllGovernorate() {
            return  governorateRepository.findAll();
    }

    @GetMapping("/GetGovernorateIdByName/{name}")
    public Optional<Governorate> GetGovernorate(@PathVariable("name") String name) {
        return  governorateRepository.findGovernorateByGovName(name);
    }

    @GetMapping("/GetCityByGovernorate/{id}")
    public List<City> GetCityByGovernorate(@PathVariable("id") long id) {
        return  cityRepository.findCityNameByGovernorate_Id(id);
    }

    @GetMapping("/GetAllCity")
    public List<City> GetAllCity() {
        return  cityRepository.findAll();
    }


}
