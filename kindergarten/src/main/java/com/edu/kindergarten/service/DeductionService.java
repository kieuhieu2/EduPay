package com.edu.kindergarten.service;

import com.edu.kindergarten.dto.request.deductionRequest.DeductionCreateRequestDTO;
import com.edu.kindergarten.dto.response.deductionResponse.DeductionCreateResponse;

import java.util.List;

public interface DeductionService {
    public DeductionCreateResponse createDeduction(String teacherCode,
                                                   DeductionCreateRequestDTO request);
    public DeductionCreateResponse getDeduction(Integer deductionId);
    public DeductionCreateResponse updateDeduction(Integer deductionId,
                                                   DeductionCreateRequestDTO response);
    public void deleteDeduction(Integer deductionId);
    public List<DeductionCreateResponse> getDeductionsByTeacherCode(String teacherCode,
                                             Integer month,
                                             Integer year);
}
