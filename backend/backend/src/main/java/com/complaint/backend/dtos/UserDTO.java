package com.complaint.backend.dtos;

import com.complaint.backend.enums.UserRole;


import lombok.Data;
import org.springframework.web.multipart.MultipartFile;


@Data

public class UserDTO {
private Long id;
private String name;
private String email;
private String password;
private String role;
private String department;
private String faceEmbedding;
    private MultipartFile faceImage;
    private UserRole userRole;

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public void setFaceImage(MultipartFile faceImage) {
        this.faceImage = faceImage;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public MultipartFile getFaceImage() {
        return faceImage;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public Long getId() {
        return id;
    }

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getFaceEmbedding() {
		return faceEmbedding;
	}

	public void setFaceEmbedding(String faceEmbedding) {
		this.faceEmbedding = faceEmbedding;
	}
    


}