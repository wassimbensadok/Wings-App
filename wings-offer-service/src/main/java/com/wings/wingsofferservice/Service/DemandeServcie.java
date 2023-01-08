package com.wings.wingsofferservice.Service;

import com.wings.wingsofferservice.DTO.DemandDTO;
import com.wings.wingsofferservice.Models.Demand;
import com.wings.wingsofferservice.Models.EtatDemand;
import com.wings.wingsofferservice.Models.Route;
import com.wings.wingsofferservice.StorageService.FilesStorageService;
import com.wings.wingsofferservice.controller.DemandController;
import com.wings.wingsofferservice.feign.UserServiceFeign;
import com.wings.wingsofferservice.repository.DemandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.io.IOException;
import java.net.URL;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class DemandeServcie {
    @Autowired
    DemandRepository demandRepository;
    @Autowired
    FilesStorageService storageService;

    private  final UserServiceFeign userServiceFeign;

    public DemandeServcie(UserServiceFeign userServiceFeign) {
        this.userServiceFeign = userServiceFeign;
    }



    public List<Demand> getAllDemand() {
        List<Demand> demandList=demandRepository.findAll();
        for(Demand demand:demandList){
            Optional<Route> route=userServiceFeign.getRoute(demand.getRouteId());
            demand.setRoute(route.get());
        }
        return demandList;
    }

    public Optional<Demand> getDemandById(long id) throws IOException {
        try {
            Optional<Demand> demand = demandRepository.findById(id);
            if (demand == null) throw new RuntimeException("Invoice Not found");
            Optional<Route> route = userServiceFeign.getRoute(demand.get().getRouteId());
            if (route.isPresent())
                demand.get().setRoute(route.get());
            demand.get().setFileURL(storageService.load(demand.get().getFilename()).getFile().toURI().toString());
            return demand;
        }catch (Exception e){
            return null;
        }
    }

    public List<Demand> getDemandByUserId(long id) throws IOException {
        try {
            String url = null;
            List<Demand> demandList=demandRepository.findByUserId(id);
            for(Demand demand:demandList){
                Optional<Route> route=userServiceFeign.getRoute(demand.getRouteId());
                demand.setRoute(route.get());
                if(demand.getFilename()!=null ) {
                    url = MvcUriComponentsBuilder
                            .fromMethodName(DemandController.class, "getFile", demand.getFilename()).build().toString();

                    demand.setFileURL(url);
                }

            }
            return demandList;
        }catch (Exception e){
        return null;
        }
    }

    /*public Optional<Demand> getDemandByFilter(long id ,DemandFilterDTO filterDTO) {
        List<Demand> demandList=demandRepository.findByUserId(id);
        for(Demand demand:demandList){
            Optional<Route> route=userServiceFeign.getRoute(demand.getRouteId());
            demand.setRoute(route.get());
        }
        List<Demand> demands = new ArrayList<>();

            for(Demand demand:demandList){
                if(filterDTO.getDepartGov()!= null && demand.getRoute().getDepar_gov() == filterDTO.getDepartGov())
                demands.add(demand);
                if(filterDTO.getDepartAdr()!= null && demand.getRoute().getAdr_departure() == filterDTO.getDepartAdr())
                    demands.add(demand);
                if(filterDTO.getArriGov()!= null && demand.getRoute().getArri_gov() == filterDTO.getArriGov())
                    demands.add(demand);
                if(filterDTO.getArriAdr()!= null && demand.getRoute().getAdr_arrival() == filterDTO.getArriAdr())
                    demands.add(demand);
            }

    }*/


    public Demand  AddDemand(DemandDTO demand,MultipartFile file) throws IOException {
        Route routeRequest = new Route(demand.getDepartGov(),demand.getDepartAdr(),demand.getArriGov(),demand.getArriAdr());
        Route routeResponse = userServiceFeign.newRoute(demand.getUserId(),routeRequest);
        Random random = new Random();
        int code = random.nextInt(9000) + 1000;
        Demand _demand = new Demand();
        _demand.setType(demand.getType());
        _demand.setTel_receiver(demand.getTel_receiver());
        _demand.setWeight(demand.getWeight());
        _demand.setHeight(demand.getHeight());
        _demand.setLength(demand.getLength());
        _demand.setRemark(demand.getRemark());
        _demand.setDate_delivery(demand.getDate_delivery());
        _demand.setUserId(demand.getUserId());
        _demand.setRouteId(routeResponse.getId());
        _demand.setVerificationCode(code);
       _demand.setFilename(file.getOriginalFilename());
        _demand.setEtatdemand(EtatDemand.pending);

        storageService.save(file);
        return  demandRepository.save(_demand);
    }

    public Demand  AddDemandII(DemandDTO demand){
        Route routeRequest = new Route(demand.getDepartGov(),demand.getDepartAdr(),demand.getArriGov(),demand.getArriAdr());
        Route routeResponse = userServiceFeign.newRoute(demand.getUserId(),routeRequest);
        Random random = new Random();
        int code = random.nextInt(9000) + 1000;
        Demand _demand = new Demand();
        _demand.setType(demand.getType());
        _demand.setTel_receiver(demand.getTel_receiver());
        _demand.setRemark(demand.getRemark());
        _demand.setDate_delivery(demand.getDate_delivery());
        _demand.setUserId(demand.getUserId());
        _demand.setRouteId(routeResponse.getId());
        _demand.setVerificationCode(code);
        _demand.setEtatdemand(EtatDemand.pending);

        return  demandRepository.save(_demand);
    }

    public Demand UpdateDemand(long id, DemandDTO demandDTO,MultipartFile file){
        Optional<Demand> demand = demandRepository.findById(id);
        if (demand.isPresent()) {
            //Optional<Route> route = userServiceFeign.getRoute(demandDTO.getRouteId());

                Route routeRequest = new Route(demandDTO.getDepartGov(), demandDTO.getDepartAdr(), demandDTO.getArriGov(), demandDTO.getArriAdr());
                Route routeResponse = userServiceFeign.UpdateRoute(demand.get().getRouteId(), routeRequest);
                Demand  _demand = demand.get();
                _demand.setType(demandDTO.getType());
                _demand.setWeight(demandDTO.getWeight());
                _demand.setHeight(demandDTO.getHeight());
                _demand.setLength(demandDTO.getLength());
                _demand.setRemark(demandDTO.getRemark());
                _demand.setDate_delivery(demandDTO.getDate_delivery());
            ;
                if(_demand.getFilename() != file.getOriginalFilename() ){
                    storageService.delete(_demand.getFilename());
                    storageService.save(file);
                    _demand.setFilename(file.getOriginalFilename());
                }
                demandRepository.save(_demand);
                return  demandRepository.save(_demand);
        }else {
            return null;
        }
    }

    public void DeleteDemandById(long id) {
        Optional<Demand> demand=demandRepository.findById(id);
        if(demand==null) throw new RuntimeException("Invoice Not found");
        userServiceFeign.DeleteRoute(demand.get().getRouteId());
        demandRepository.deleteById(id);
    }

    public void DeleteAllDemand() {
        List<Demand> demandList=demandRepository.findAll();
        for(Demand demand:demandList){
            Optional<Route> route=userServiceFeign.getRoute(demand.getRouteId());
            if(route.isPresent())
            userServiceFeign.DeleteRoute(demand.getRouteId());
        }
        demandRepository.deleteAll();
    }

}
