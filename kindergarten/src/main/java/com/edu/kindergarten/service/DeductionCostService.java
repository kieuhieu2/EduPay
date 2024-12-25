package com.edu.kindergarten.service;

import com.edu.kindergarten.dto.request.deductionCostRequest.DeductionCostRequest;
import com.edu.kindergarten.dto.response.deductionCostResponse.DeductionCostResponse;

import java.util.List;

public interface DeductionCostService {
    List<DeductionCostResponse> getDeductionCost();
    DeductionCostResponse updateDeductionCost(Integer deductionCostId, DeductionCostRequest deductionCostRequest);
}
