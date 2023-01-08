package com.wingsshopservice.Controller;

import com.wingsshopservice.DTO.CommandDTO;
import com.wingsshopservice.Model.Command;
import com.wingsshopservice.Services.CommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class CommandController {

    @Autowired
    CommandService commandService;

    @GetMapping("getCommand")
    public List<Command> getCommand(){
        return commandService.getCommand();
    }

    @GetMapping("getCommandByUser/{id}")
    public List<Command> getCommandByUser(@PathVariable("id") long id){
        return commandService.getCommandByUser(id);
    }


    @PostMapping("/addCommand")
    public long addCommand(@RequestBody CommandDTO commandDTO){
        return commandService.addCommand(commandDTO);
    }
}
