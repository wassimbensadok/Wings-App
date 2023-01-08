package com.wingsshopservice.Services;

import com.wingsshopservice.Controller.ProComController;
import com.wingsshopservice.DTO.ComItemDTO;
import com.wingsshopservice.Model.Command;
import com.wingsshopservice.Model.CommandItem;
import com.wingsshopservice.Model.Product;
import com.wingsshopservice.Model.Product_Combination;
import com.wingsshopservice.Repository.ComItemRepository;
import com.wingsshopservice.Repository.CommandRepository;
import com.wingsshopservice.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;

@Service
public class ComItemService {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    CommandRepository commandRepository;
    @Autowired
    ComItemRepository comItemRepository;
    public CommandItem addCommandItem(ComItemDTO comItemDTO){
        Product product = productRepository.findById(comItemDTO.getProductId()).get();
        Command command = commandRepository.findById(comItemDTO.getCommandId()).get();
        CommandItem commandItem = new CommandItem();
        commandItem.setQuantity(comItemDTO.getQuantity());
        commandItem.setPrice(comItemDTO.getPrice());
        commandItem.setProduct(product);
        commandItem.setCommand(command);
        return  comItemRepository.save(commandItem);
    }

    public List<CommandItem> getComItemByCom(long id){

        List<CommandItem> commandItemList = comItemRepository.findByCommand_Id(id);
        List<CommandItem> commandItems = new ArrayList<>();
        for(CommandItem procom: commandItemList) {

                Product product = procom.getProduct();
                if (product.getPicture1() != null) {
                    product.setPicture1(MvcUriComponentsBuilder
                            .fromMethodName(ProComController.class, "getProComFile", product.getPicture1()).build().toString());
                }
                if (product.getPicture2() != null) {
                    product.setPicture2(MvcUriComponentsBuilder
                            .fromMethodName(ProComController.class, "getProComFile", product.getPicture2()).build().toString());

                }
                if (product.getPicture3() != null) {
                    product.setPicture3(MvcUriComponentsBuilder
                            .fromMethodName(ProComController.class, "getProComFile", product.getPicture3()).build().toString());

                }
                if (product.getPicture4() != null) {
                    product.setPicture4(MvcUriComponentsBuilder
                            .fromMethodName(ProComController.class, "getProComFile", product.getPicture4()).build().toString());
                }
                procom.setProduct(product);
                commandItems.add(procom);

        }
        return commandItems;
    }
}
