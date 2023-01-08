package com.wings.wingsuserservice.repository;

import com.wings.wingsuserservice.models.Role;
import com.wings.wingsuserservice.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmail(String email);
  Optional<User> getAllByEmail(String email);
  Boolean existsByEmail(String email);
  @Query("select u from User u where u.firstName = :firstName and u.lastName = :lastName")
  Optional<User> findByFirstNameAndFirstName(@Param("firstName") String firstName, @Param("lastName") String lastName);

}
