package com.complaint.backend.repositories;

import com.complaint.backend.entities.AssetAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AssetAssignmentRepository extends JpaRepository<AssetAssignment, Long> {
    List<AssetAssignment> findByEmployeeId(Long employeeId);
    List<AssetAssignment> findByAssetId(Long assetId);
    List<AssetAssignment> findByStatus(String status);

    @Query("SELECT aa FROM AssetAssignment aa " +
            "JOIN FETCH aa.asset a " +
            "JOIN FETCH aa.employee e " +  // This ensures employee data is loaded
            "WHERE aa.status = 'ACTIVE'")
    List<AssetAssignment> findActiveAssignmentsWithDetails();

    @Query("SELECT aa FROM AssetAssignment aa " +
            "JOIN FETCH aa.asset " +
            "JOIN FETCH aa.employee " +
            "WHERE aa.status = 'ACTIVE' AND aa.actualReturnDate IS NULL")
    List<AssetAssignment> findPendingReturnsWithDetails();



    void deleteByAssetId(Long assetId);

    List<AssetAssignment> findByStatusAndActualReturnDateIsNull(String active);
}