package com.wingsshopservice.Services;

import com.wingsshopservice.DTO.CommandDTO;
import com.wingsshopservice.Feign.UserServiceFeign;
import com.wingsshopservice.Model.Command;
import com.wingsshopservice.Model.CommandItem;
import com.wingsshopservice.Model.CommandStatus;
import com.wingsshopservice.Model.User;
import com.wingsshopservice.Repository.ComItemRepository;
import com.wingsshopservice.Repository.CommandRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Service
public class CommandService {
    @Autowired
    CommandRepository commandRepository;

    @Autowired
    ComItemRepository comItemRepository;

    private  final UserServiceFeign userServiceFeign;

    public CommandService(UserServiceFeign userServiceFeign) {
        this.userServiceFeign = userServiceFeign;
    }

    public long addCommand(CommandDTO commandDTO){
        Command command = new Command();
        command.setTotalPrice(commandDTO.getTotalPrice());
        Date date = new Date();
        command.setDate(date);
        command.setStatus(CommandStatus.pending);
        command.setUserId(commandDTO.getUserId());
        command.setDeliveryId(commandDTO.getDeliveryId());
        return commandRepository.save(command).getId();
    }

    public List<Command> getCommandByUser(long id){
        return commandRepository.findByUserIdOrderByIdDesc(id);

    }

    public List<Command> getCommand(){
        List<Command> commandList = commandRepository.findAllByOrderByIdDesc();
        for (Command command : commandList){
            User user = userServiceFeign.GetUserById(command.getUserId());
            command.setUser(user);
        }
        return commandList;
    }
}
