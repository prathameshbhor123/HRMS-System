package com.complaint.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.complaint.backend.entities.PostComment;

public interface PostCommentRepository extends JpaRepository<PostComment, Long> {
	
    List<PostComment> findByPost_PostIdOrderByCreatedAtDesc(Long postId);

 
 
}
