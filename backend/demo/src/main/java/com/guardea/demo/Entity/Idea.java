package com.guardea.demo.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // This replaces manual Getters and Setters (Lombok)
@NoArgsConstructor // <--- ADD THIS
@AllArgsConstructor
@Document(collection = "ideas")
public class Idea {
    
    @Id
    private String id;
    private String title;
    private String description;
    private String studentName;
    private boolean isDuplicate = false; // The AI will toggle this
    // Getters and Setters
}
