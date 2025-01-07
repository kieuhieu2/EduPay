package com.edu.kindergarten.service;

import com.edu.kindergarten.dto.request.basicSalaryRequest.BasicSalaryCreateRequestDTO;
import com.edu.kindergarten.dto.response.basicSalaryResponse.BasicSalaryCreateResponse;

public interface BasicSalaryService {
    public BasicSalaryCreateResponse createBasicSalary(String teacherCode ,BasicSalaryCreateRequestDTO request);
    public BasicSalaryCreateResponse getBasicSalary(Integer basicSalaryId);
    public BasicSalaryCreateResponse updateBasicSalary(Integer basicSalaryId, BasicSalaryCreateRequestDTO request);
    public void deleteBasicSalary(Integer basicSalaryId);
    public BasicSalaryCreateResponse getMyBasicSalary(String teacherCode);
    public String updateAllBasicSalary(Integer basicSalary);
}
