package com.guardea.demo.Controller;

import com.guardea.demo.Entity.User;
import com.guardea.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User loginRequest) {
        // We will implement JWT generation here in the next step!
        // For now, it's just a placeholder
        return "Logic for checking password and returning JWT goes here";
    }
}