package com.complaint.backend.dtos;

import java.time.LocalDateTime;
import java.util.List;

import com.complaint.backend.entities.Comment;
import com.complaint.backend.entities.User;

public class PostDTO {
	 private Long postId;  
	 
	 private Long userId;
	  private String UserName;
	  private String content;
	  private int likes;
	  private String imageUrl;
	  private LocalDateTime createdAt;
	  private User user;
	  private List<Comment> comments;
	  public Long getPostId() {
		  return postId;
	  }
	  public void setPostId(Long postId) {
		  this.postId = postId;
	  }
	  public String getUserName() {
		  return UserName;
	  }
	  public void setUserName(String userName) {
		  UserName = userName;
	  }
	  public String getContent() {
		  return content;
	  }
	  public void setContent(String content) {
		  this.content = content;
	  }
	  public int getLikes() {
		  return likes;
	  }
	  public void setLikes(int likes) {
		  this.likes = likes;
	  }
	  public String getImageUrl() {
		  return imageUrl;
	  }
	  public void setImageUrl(String imageUrl) {
		  this.imageUrl = imageUrl;
	  }
	  public LocalDateTime getCreatedAt() {
		  return createdAt;
	  }
	  public void setCreatedAt(LocalDateTime createdAt) {
		  this.createdAt = createdAt;
	  }
	  public User getUser() {
		  return user;
	  }
	  public void setUser(User user) {
		  this.user = user;
	  }
	  public List<Comment> getComments() {
		  return comments;
	  }
	  public void setComments(List<Comment> comments) {
		  this.comments = comments;
	  }
	  public Long getUserId() {
		  return userId;
	  }
	  public void setUserId(Long userId) {
		  this.userId = userId;
	  }

	  
	  
}
