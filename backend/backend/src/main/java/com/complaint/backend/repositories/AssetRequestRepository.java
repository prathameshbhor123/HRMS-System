package com.complaint.backend.repositories;

import com.complaint.backend.entities.AssetRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AssetRequestRepository extends JpaRepository<AssetRequest, Long> {
    List<AssetRequest> findByStatus(String status);
    List<AssetRequest> findByEmployeeId(Long employeeId);

    @Query("SELECT r FROM AssetRequest r JOIN FETCH r.employee JOIN FETCH r.asset WHERE r.status = 'PENDING'")
    List<AssetRequest> findPendingRequestsWithDetails();

    @Modifying
    @Query("DELETE FROM AssetRequest ar WHERE ar.asset.id = :assetId")
    void deleteByAssetId(@Param("assetId") Long assetId);
}