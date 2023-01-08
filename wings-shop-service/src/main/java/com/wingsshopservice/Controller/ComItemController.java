package com.wingsshopservice.Controller;

import com.wingsshopservice.DTO.ComItemDTO;
import com.wingsshopservice.Model.CommandItem;
import com.wingsshopservice.Services.ComItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class ComItemController {
    @Autowired
    ComItemService comItemService;
    @PostMapping("addComItem")
    public CommandItem addComItem(@RequestBody ComItemDTO comItemDTO){
        return  comItemService.addCommandItem(comItemDTO);
    }

    @GetMapping("getComItemByCom/{id}")
    public List<CommandItem> getComItemByCom(@PathVariable("id") long id){
        return comItemService.getComItemByCom(id);
    }
}
