package com.edu.kindergarten.controller;

import com.edu.kindergarten.dto.request.ApiResponse;
import com.edu.kindergarten.dto.request.deductionRequest.DeductionCreateRequestDTO;
import com.edu.kindergarten.dto.response.deductionResponse.DeductionCreateResponse;
import com.edu.kindergarten.service.DeductionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/deduction")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DeductionController {
    final DeductionService deductionService;

    @PostMapping(path = "/{teacherCode}", headers = "apiVersion=v1.0")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ApiResponse<DeductionCreateResponse> createDeduction(@PathVariable String teacherCode,
                                       @RequestBody DeductionCreateRequestDTO request) {
        return ApiResponse.<DeductionCreateResponse>builder()
                .result(deductionService.createDeduction(teacherCode, request))
                .build();
    }

    @GetMapping(path = "/{deductionCode}", headers = "apiVersion=v1.0")
    public ApiResponse<DeductionCreateResponse> getDeduction(@PathVariable Integer deductionCode) {
        return ApiResponse.<DeductionCreateResponse>builder()
                .result(deductionService.getDeduction(deductionCode))
                .build();
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    @PutMapping(path = "/{deductionCode}", headers = "apiVersion=v1.0")
    public ApiResponse<DeductionCreateResponse> updateDeduction(@PathVariable Integer deductionCode,
                                       @RequestBody DeductionCreateRequestDTO request) {
        return ApiResponse.<DeductionCreateResponse>builder()
                .result(deductionService.updateDeduction(deductionCode, request))
                .build();
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    @DeleteMapping(path = "/{deductionCode}", headers = "apiVersion=v1.0")
    public ApiResponse<Void> deleteDeduction(@PathVariable Integer deductionCode) {
        deductionService.deleteDeduction(deductionCode);
        return ApiResponse.<Void>builder().build();
    }

    @GetMapping(path = "/{teacherCode}/{month}/{year}", headers = "apiVersion=v1.0")
    public ApiResponse<List<DeductionCreateResponse>> getDeductionsByTeacherCode(@PathVariable String teacherCode,
                                                                                 @PathVariable Integer month,
                                                                                 @PathVariable Integer year) {
        return ApiResponse.<List<DeductionCreateResponse>>builder()
                .result(deductionService.getDeductionsByTeacherCode(teacherCode, month, year))
                .build();
    }
}
