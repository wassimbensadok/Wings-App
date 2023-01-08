package com.wings.wingsadresse.service.repository;

import com.wings.wingsadresse.service.Models.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CityRepository  extends JpaRepository<City, Long> {

    List<City> findCityNameByGovernorate_Id(long id);


}
