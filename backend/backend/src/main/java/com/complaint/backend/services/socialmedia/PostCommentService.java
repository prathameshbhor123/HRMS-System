package com.complaint.backend.services.socialmedia;

import java.util.List;

import com.complaint.backend.dtos.PostCommentDTO;

public interface PostCommentService {
	PostCommentDTO saveComment(PostCommentDTO postCommentDTO);
    void deleteComment(Long commentId); 
    List<PostCommentDTO> findByPost_PostIdOrderByCreatedAtDesc(Long postId);

}
