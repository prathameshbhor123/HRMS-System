package com.complaint.backend.dtos;

import java.util.Date;

public class AssetRequestDTO {
    private Long employeeId;
    private Long assetId;
    private Date expectedReturnDate;
    private String reason;
    private String urgency;

    // Getters and Setters
    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public Long getAssetId() { return assetId; }
    public void setAssetId(Long assetId) { this.assetId = assetId; }

    public Date getExpectedReturnDate() { return expectedReturnDate; }
    public void setExpectedReturnDate(Date expectedReturnDate) { this.expectedReturnDate = expectedReturnDate; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getUrgency() { return urgency; }
    public void setUrgency(String urgency) { this.urgency = urgency; }
}