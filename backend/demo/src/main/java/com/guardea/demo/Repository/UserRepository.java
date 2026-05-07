package com.guardea.demo.Repository;

import com.guardea.demo.Entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    // This allows us to check if an email is already taken or to find a user for login
    Optional<User> findByEmail(String email);
}
