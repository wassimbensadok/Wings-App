package com.wingsshopservice.Repository;

import com.wingsshopservice.Model.CommandItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComItemRepository extends JpaRepository<CommandItem, Long> {
    List<CommandItem> findByCommand_UserIdOrderByCommandIdDesc (long id);
    List<CommandItem> findByCommand_Id (long id);
}
