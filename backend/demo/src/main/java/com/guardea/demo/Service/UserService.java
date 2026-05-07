package com.guardea.demo.Service;

import com.guardea.demo.Entity.User;
import com.guardea.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

     public User registerUser(User user) {
    // 1. Check if email already exists
    if (userRepository.findByEmail(user.getEmail()).isPresent()) {
        // You can create a custom exception, or just throw a RuntimeException
        throw new RuntimeException("Email is already registered!");
    }

    // 2. Hash the password and save
    user.setPassword(encoder.encode(user.getPassword()));
    return userRepository.save(user);
}
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

   
}