package com.edu.kindergarten.controller;

import com.edu.kindergarten.dto.request.ApiResponse;
import com.edu.kindergarten.dto.request.salaryReportRequest.SalaryReportCreateRequestDTO;
import com.edu.kindergarten.dto.response.salaryReportCreateResponse.GetMySalaryReportResponse;
import com.edu.kindergarten.dto.response.salaryReportCreateResponse.SalaryReportCreateResponse;
import com.edu.kindergarten.service.SalaryReportService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/salaryReport")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SalaryReportController {
    SalaryReportService salaryReportService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(path = "/{teacherCode}", headers = "apiVersion=v1.0")
    public ApiResponse<SalaryReportCreateResponse> createSalaryReport(@PathVariable String teacherCode,
                                                                      @RequestBody SalaryReportCreateRequestDTO request) {
        return ApiResponse.<SalaryReportCreateResponse>builder()
                .result(salaryReportService.createSalaryReport(teacherCode, request))
                .build();
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    @GetMapping(path = "/{salaryReportId}", headers = "apiVersion=v1.0")
    public ApiResponse<SalaryReportCreateResponse> getSalaryReport(@PathVariable Integer salaryReportId) {
        return ApiResponse.<SalaryReportCreateResponse>builder()
                .result(salaryReportService.getSalaryReport(salaryReportId))
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(path = "/{salaryReportId}", headers = "apiVersion=v1.0")
    public ApiResponse<SalaryReportCreateResponse> updateSalaryReport(@PathVariable Integer salaryReportId, @RequestBody SalaryReportCreateRequestDTO request) {
        return ApiResponse.<SalaryReportCreateResponse>builder()
                .result(salaryReportService.updateSalaryReport(salaryReportId, request))
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(path = "/{salaryReportId}", headers = "apiVersion=v1.0")
    public ApiResponse<Void> deleteSalaryReport(@PathVariable Integer salaryReportId) {
        salaryReportService.deleteSalaryReport(salaryReportId);
        return ApiResponse.<Void>builder().build();
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    @GetMapping(path = "/{teacherCode}/{month}/{year}", headers = "apiVersion=v1.0")
    public ApiResponse<GetMySalaryReportResponse> getMySalary(@PathVariable String teacherCode,
                                                              @PathVariable Integer month,
                                                              @PathVariable Integer year) {
        return ApiResponse.<GetMySalaryReportResponse>builder()
                .result(salaryReportService.getMySalaryReport(teacherCode, month, year))
                .build();
    }
}
