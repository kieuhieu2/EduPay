package com.edu.kindergarten.controller;

import com.edu.kindergarten.dto.request.ApiResponse;
import com.edu.kindergarten.dto.request.contractRequest.ContractCreateRequestDTO;
import com.edu.kindergarten.dto.response.contractRespon.ContractCreateResponse;
import com.edu.kindergarten.service.ContractService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contract")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ContractController {
    final ContractService contractService;

    @PostMapping(path = "/{teacherCode}", headers = "apiVersion=v1.0")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ApiResponse<ContractCreateResponse> createContract(@PathVariable String teacherCode,
                                                              @RequestBody ContractCreateRequestDTO request) {
        return ApiResponse.<ContractCreateResponse>builder()
                .result(contractService.createContract(teacherCode, request))
                .build();
    }

    @GetMapping(path = "/{contractId}", headers = "apiVersion=v1.0")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ApiResponse<ContractCreateResponse> getContract(@PathVariable Integer contractId){
        return ApiResponse.<ContractCreateResponse>builder()
                .result(contractService.getContract(contractId))
                .build();
    }

    @PutMapping(path = "/{contractId}", headers = "apiVersion=v1.0")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ApiResponse<ContractCreateResponse> updateContract(@PathVariable Integer contractId,
                                                              @RequestBody ContractCreateRequestDTO request) {
        return ApiResponse.<ContractCreateResponse>builder()
                .result(contractService.updateContract(contractId, request))
                .build();
    }

    @DeleteMapping(path = "/{contractId}", headers = "apiVersion=v1.0")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ApiResponse<Void> deleteContract(@PathVariable Integer contractId) {
        contractService.deleteContract(contractId);
        return ApiResponse.<Void>builder().build();
    }
}
