package com.complaint.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.complaint.backend.entities.Note;
import com.complaint.backend.entities.User;

public interface NoteRepository extends JpaRepository<Note, Long>{
	
	List<Note>findAll();
	List<Note>findByUser(User user);
	List<Note>findByUserId(Long userId);
    List<Note> findAllByOrderByCreatedAtDesc();


}
