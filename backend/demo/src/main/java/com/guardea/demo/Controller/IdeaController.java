package com.guardea.demo.Controller;

import com.guardea.demo.Entity.Idea;
import com.guardea.demo.Service.IdeaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/ideas")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class IdeaController {

    @Autowired
    private IdeaService ideaService;

    @GetMapping
    public List<Idea> getIdeas() {
        System.out.println("-----> GET request received at /api/ideas");
        return ideaService.getAllIdeas();
    }

    @PostMapping
    public Idea createIdea(@RequestBody Idea idea) {
        System.out.println("Received Idea: " + idea.getTitle() + " from " + idea.getStudentName());
        return ideaService.saveIdea(idea);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteIdea(@PathVariable String id) { // Changed Long to String
        ideaService.deleteIdea(id);
        return ResponseEntity.ok().build();
    }
}