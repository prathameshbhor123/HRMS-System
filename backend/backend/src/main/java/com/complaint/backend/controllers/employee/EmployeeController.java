package com.complaint.backend.controllers.employee;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.complaint.backend.dtos.CommentDTO;
import com.complaint.backend.dtos.LeaveBalanceDTO;
import com.complaint.backend.dtos.LeaveManagementDTO;
import com.complaint.backend.dtos.TaskDTO;
import com.complaint.backend.enums.LeaveApplicationStatus;
import com.complaint.backend.services.employee.EmployeeService;

import lombok.RequiredArgsConstructor;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/employee")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {
    private final EmployeeService employeeService;

    @GetMapping("/tasks/{id}")
    public ResponseEntity<?> getTasksByUserId(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getTasksByUserId(id));
    }

    @PutMapping("/task/{id}/{status}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @PathVariable String status){
        TaskDTO updatedTaskDTO = employeeService.updateTask(id, status);
        if (updatedTaskDTO == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(updatedTaskDTO);

    }


    @GetMapping("/task/{id}")
    public ResponseEntity<?> getTasksById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getTaskById(id));
    }


    @PostMapping("/task/comment")
    public ResponseEntity<?> createComment(@RequestParam Long taskId, @RequestParam Long postedBy, @RequestBody String content ){
        CommentDTO createCommentDTO = employeeService.createComment(taskId, postedBy, content);
        if (createCommentDTO == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(createCommentDTO);

    }


    @GetMapping("/task/{taskId}/comments")
    public ResponseEntity<?> getCommentByTask(@PathVariable Long taskId) {
        return ResponseEntity.ok(employeeService.getCommentsByTask(taskId));
    }


    // employee controller for levemanagement;




    //Get all leaves by employee ID

    @GetMapping("/leave/user/{userId}")
    public ResponseEntity<List<LeaveManagementDTO>> getLeavesByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(employeeService.getAllLeavesByUser(userId));
    }


    @PostMapping("/leave/createleave")
    public ResponseEntity<LeaveManagementDTO> createLeave(@RequestBody LeaveManagementDTO dto) {
        LeaveManagementDTO createdLeave = employeeService.createLeave(dto);
        return new ResponseEntity<>(createdLeave, HttpStatus.CREATED);
    }


    // fetching leave balance

    @GetMapping("/leave-balance/{userId}")
    public LeaveBalanceDTO getLeaveBalance(@PathVariable Long userId) {
        return employeeService.getLeaveBalanceByUserId(userId);
    }

    //Count leaves by user and status

    @GetMapping("/leave/user/{userId}/count")
    public ResponseEntity<Long> countLeavesByStatus(
            @PathVariable Long userId,
            @RequestParam LeaveApplicationStatus leaveStatus) {
        return ResponseEntity.ok(employeeService.countLeavesByUserAndStatus(userId, leaveStatus));
    }

    // Filter leaves by type

    @GetMapping("/leave/user/{userId}/type")
    public ResponseEntity<List<LeaveManagementDTO>> getLeavesByType(
            @PathVariable Long userId,
            @RequestParam String leaveType) {
        return ResponseEntity.ok(employeeService.getLeavesByUserAndLeaveType(userId, leaveType));
    }

    // Filter leaves by date range

    @GetMapping("/leave/user/{userId}/date-range")
    public ResponseEntity<List<LeaveManagementDTO>> getLeavesByDateRange(
            @PathVariable Long userId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        return ResponseEntity.ok(employeeService.getLeavesByUserAndDateRange(userId, startDate, endDate));
    }

    // Get all leaves (all users) by status

    @GetMapping("/leave/leaveStatus")
    public ResponseEntity<List<LeaveManagementDTO>> getLeavesByStatus(
            @RequestParam LeaveApplicationStatus leaveStatus) {
        return ResponseEntity.ok(employeeService.getLeavesByStatus(leaveStatus));
    }

    //Count all leaves by status (global)

    @GetMapping("/leave/leaveStatus/count")
    public ResponseEntity<Long> countAllLeavesByStatus(
            @RequestParam LeaveApplicationStatus leaveStatus) {
        return ResponseEntity.ok(employeeService.countAllLeavesByStatus(leaveStatus));
    }

    // All leaves (all users) in a date range

    @GetMapping("/leave/date-range")
    public ResponseEntity<List<LeaveManagementDTO>> getAllLeavesInDateRange(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        return ResponseEntity.ok(employeeService.getAllLeavesInDateRange(startDate, endDate));
    }


}
