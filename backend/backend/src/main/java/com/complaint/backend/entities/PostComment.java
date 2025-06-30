package com.complaint.backend.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class PostComment {
	 @Id 
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	  private Long commentId;
	  private String content;
	  private LocalDateTime createdAt;
	

	  @ManyToOne
	  @JoinColumn(name="post_id")
	  private Post post;

	  @ManyToOne
	  @JoinColumn(name="user_id")
	  private User user;

	  public Long getCommentId() {
		  return commentId;
	  }

	  public void setCommentId(Long commentId) {
		  this.commentId = commentId;
	  }

	  public String getContent() {
		  return content;
	  }

	  public void setContent(String content) {
		  this.content = content;
	  }

	  public LocalDateTime getCreatedAt() {
		  return createdAt;
	  }

	  public void setCreatedAt(LocalDateTime createdAt) {
		  this.createdAt = createdAt;
	  }

	  public Post getPost() {
		  return post;
	  }

	  public void setPost(Post post) {
		  this.post = post;
	  }

	  public User getUser() {
		  return user;
	  }

	  public void setUser(User user) {
		  this.user = user;
	  }

	  	  
}
