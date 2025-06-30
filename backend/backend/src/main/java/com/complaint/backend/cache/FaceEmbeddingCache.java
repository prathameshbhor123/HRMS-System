package com.complaint.backend.cache;

import com.complaint.backend.entities.User;
import com.complaint.backend.enums.UserRole;
import com.complaint.backend.repositories.UserRepository;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class FaceEmbeddingCache {

    private final ConcurrentHashMap<String, List<Float>> cache = new ConcurrentHashMap<>();
    private final UserRepository userRepository;

    public FaceEmbeddingCache(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void loadCacheOnStartup() {
        System.out.println("📦 Loading face embeddings from database into cache...");

        List<User> employees = userRepository.findAllByUserRole(UserRole.EMPLOYEE);
        for (User user : employees) {
            if (user.getFaceEmbedding() != null && !user.getFaceEmbedding().isEmpty()) {
                try {
                    List<Float> embedding = parseEmbeddingString(user.getFaceEmbedding());
                    cache.put(user.getEmail(), embedding);
                    System.out.println("✅ Cached: " + user.getEmail());
                } catch (Exception e) {
                    System.err.println("⚠️ Failed to parse embedding for " + user.getEmail());
                    e.printStackTrace();
                }
            }
        }

        System.out.println("✅ Face embedding cache initialized. Total: " + cache.size());
    }

    private List<Float> parseEmbeddingString(String embeddingStr) {
        List<Float> embeddingList = new ArrayList<>();
        if (embeddingStr != null && !embeddingStr.trim().isEmpty()) {
            embeddingStr = embeddingStr.replaceAll("\\[|\\]", "");
            String[] parts = embeddingStr.split(",");
            for (String part : parts) {
                embeddingList.add(Float.parseFloat(part.trim()));
            }
        }
        return embeddingList;
    }

    public void put(String email, List<Float> embedding) {
        cache.put(email, embedding);
    }

    public List<Float> get(String email) {
        return cache.get(email);
    }

    public boolean contains(String email) {
        return cache.containsKey(email);
    }

    public Map<String, List<Float>> getAll() {
        return cache;
    }
}
