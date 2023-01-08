package com.wingsshopservice.Repository;

import com.wingsshopservice.Model.Command;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommandRepository extends JpaRepository<Command, Long> {
    List<Command> findByUserIdOrderByIdDesc(long id);
    List<Command> findAllByOrderByIdDesc();
}
