package com.guardea.demo.Service;

import com.guardea.demo.Entity.Idea;
import com.guardea.demo.Repository.IdeaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class IdeaService {
    
    @Autowired
    private IdeaRepository ideaRepository;

    public List<Idea> getAllIdeas() {
        return ideaRepository.findAll();
    }

    public Idea saveIdea(Idea idea) {
        return ideaRepository.save(idea);
    }

    public void deleteIdea(String id) { // Changed Long to String
        ideaRepository.deleteById(id);
    }
}