package com.guardea.demo.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String email;
    private String password; // This will be encrypted!
    private String name;
    private String school;
    private String role; // "TEACHER" or "STUDENT"
    
    // Student-specific fields (optional/null for teachers)
    private String studentId; 
    private String teacherId;
    
}