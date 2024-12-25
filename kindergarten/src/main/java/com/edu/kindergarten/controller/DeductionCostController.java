package com.edu.kindergarten.controller;

import com.edu.kindergarten.dto.request.ApiResponse;
import com.edu.kindergarten.dto.request.deductionCostRequest.DeductionCostRequest;
import com.edu.kindergarten.dto.response.deductionCostResponse.DeductionCostResponse;
import com.edu.kindergarten.service.DeductionCostService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/deductionCost")
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class DeductionCostController {
    final DeductionCostService deductionCostService;

    @GetMapping(path = "/", headers = "apiVersion=v1.0")
    public ApiResponse<List<DeductionCostResponse>> getDeductionCost(){
        return ApiResponse.<List<DeductionCostResponse>>builder()
                .result(deductionCostService.getDeductionCost())
                .build();
    }

    @PutMapping(path = "/{deductionCostId}", headers = "apiVersion=v1.0")
    public ApiResponse<DeductionCostResponse> updateDeductionCost(@PathVariable Integer deductionCostId,
                                                                  @RequestBody DeductionCostRequest deductionCostRequest){
        return ApiResponse.<DeductionCostResponse>builder()
                .result(deductionCostService.updateDeductionCost(deductionCostId, deductionCostRequest))
                .build();
    }
}
