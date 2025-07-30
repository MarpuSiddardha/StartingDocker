package com.siddardha.StartingDocker.Repository;

import com.siddardha.StartingDocker.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
