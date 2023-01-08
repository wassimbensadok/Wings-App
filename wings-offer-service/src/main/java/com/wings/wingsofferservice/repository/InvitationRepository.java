package com.wings.wingsofferservice.repository;

import com.wings.wingsofferservice.Models.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {
 List<Invitation> findByDeliveryIdOrderByIdDesc(long id);
 List<Invitation> findByUserIdOrderByIdDesc(long id);

}
