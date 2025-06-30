package com.complaint.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.complaint.backend.entities.Issue;

public interface IssueRepository extends JpaRepository<Issue, Long>{


    List<Issue> findAll(); 
    List<Issue> findByUserId(Long userId); 
    List<Issue> findByStatus(String status);
    List<Issue> findAllByOrderByCreatedAtDesc();

}
