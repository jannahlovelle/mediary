package com.guardea.demo.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.guardea.demo.Entity.Idea;

@Repository
public interface IdeaRepository extends MongoRepository<Idea, String> {
    //add queries here later

}
