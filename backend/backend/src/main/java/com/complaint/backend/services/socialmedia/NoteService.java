package com.complaint.backend.services.socialmedia;

import java.util.List;

import com.complaint.backend.dtos.NoteDTO;
import com.complaint.backend.entities.User;

public interface NoteService {

	List<NoteDTO>findAll();
	List<NoteDTO>findByUser(User user);
	List<NoteDTO>findByUserId(Long userId);
    List<NoteDTO> findAllByOrderByCreatedAtDesc();
    public void deleteNote(Long noteId);
    public NoteDTO createNote(NoteDTO noteDto);  

}
