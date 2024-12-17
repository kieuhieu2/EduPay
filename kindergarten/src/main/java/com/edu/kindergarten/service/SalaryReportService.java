package com.edu.kindergarten.service;

import com.edu.kindergarten.dto.request.salaryReportRequest.CustomerFeedbackRequest;
import com.edu.kindergarten.dto.request.salaryReportRequest.GetMySalaryReportDTO;
import com.edu.kindergarten.dto.request.salaryReportRequest.SalaryReportCreateRequestDTO;
import com.edu.kindergarten.dto.response.salaryReportCreateResponse.CustomerFeedbackResponse;
import com.edu.kindergarten.dto.response.salaryReportCreateResponse.GetMySalaryReportResponse;
import com.edu.kindergarten.dto.response.salaryReportCreateResponse.SalaryReportCreateResponse;

import java.util.List;

public interface SalaryReportService {
    SalaryReportCreateResponse createSalaryReport(String teacherCode,SalaryReportCreateRequestDTO request);
    SalaryReportCreateResponse getSalaryReport(Integer salaryReportId);
    SalaryReportCreateResponse updateSalaryReport(Integer salaryReportId,SalaryReportCreateRequestDTO request);
    void deleteSalaryReport(Integer salaryReportId);
    GetMySalaryReportResponse getMySalaryReport(String teacherCode, Integer month, Integer year);
    CustomerFeedbackResponse createCustomerFeedback(Integer salaryReportId, CustomerFeedbackRequest request);
    CustomerFeedbackResponse getCustomerFeedback(Integer salaryReportId);
    List<CustomerFeedbackResponse> getCustomerFeedbacks();
}
