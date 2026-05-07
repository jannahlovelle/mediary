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
        // 1. Scramble the password
        user.setPassword(encoder.encode(user.getPassword()));
        
        // 2. Default logic: If it's a student, ensure they have a studentId
        // You can add validation here later
        
        return userRepository.save(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}