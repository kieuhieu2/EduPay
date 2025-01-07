package com.edu.kindergarten.controller;

import com.edu.kindergarten.dto.request.ApiResponse;
import com.edu.kindergarten.dto.request.basicSalaryRequest.BasicSalaryCreateRequestDTO;
import com.edu.kindergarten.dto.response.basicSalaryResponse.BasicSalaryCreateResponse;
import com.edu.kindergarten.service.BasicSalaryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/basicSalary")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BasicSalaryController {
    final BasicSalaryService basicSalaryService;

    @PostMapping(path = "/{teacherCode}", headers = "apiVersion=v1.0")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<BasicSalaryCreateResponse> createBasicSalary(@PathVariable String teacherCode,
                                                                    @RequestBody BasicSalaryCreateRequestDTO request) {
        return ApiResponse.<BasicSalaryCreateResponse>builder()
                .result(basicSalaryService.createBasicSalary(teacherCode, request))
                .build();
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    @GetMapping(path = "/{basicSalaryId}", headers = "apiVersion=v1.0")
    public ApiResponse<BasicSalaryCreateResponse> getBasicSalary(@PathVariable Integer basicSalaryId) {
        return ApiResponse.<BasicSalaryCreateResponse>builder()
                .result(basicSalaryService.getBasicSalary(basicSalaryId))
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(path = "/{basicSalaryId}", headers = "apiVersion=v1.0")
    public ApiResponse<BasicSalaryCreateResponse> updateBasicSalary(@PathVariable Integer basicSalaryId,
                                                                    @RequestBody BasicSalaryCreateRequestDTO request) {
        return ApiResponse.<BasicSalaryCreateResponse>builder()
                .result(basicSalaryService.updateBasicSalary(basicSalaryId, request))
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(path = "/{basicSalaryId}", headers = "apiVersion=v1.0")
    public ApiResponse<String> deleteBasicSalary(@PathVariable Integer basicSalaryId){
        basicSalaryService.deleteBasicSalary(basicSalaryId);
        return ApiResponse.<String>builder()
                .build();
    }

    @GetMapping(path = "/getMyBasicSalary/{teacherCode}", headers = "apiVersion=v1.0")
    public ApiResponse<BasicSalaryCreateResponse> getBasicSalaryByTeacherCode(@PathVariable String teacherCode) {
        return ApiResponse.<BasicSalaryCreateResponse>builder()
                .result(basicSalaryService.getMyBasicSalary(teacherCode))
                .build();
    }

    @GetMapping(path = "/updateAllBasicSalary/{basicSalary}", headers = "apiVersion=v1.0")
    public ApiResponse<String> updateAllBasicSalary(@PathVariable Integer basicSalary) {
        return ApiResponse.<String>builder()
                .result(basicSalaryService.updateAllBasicSalary(basicSalary))
                .build();
    }
}
