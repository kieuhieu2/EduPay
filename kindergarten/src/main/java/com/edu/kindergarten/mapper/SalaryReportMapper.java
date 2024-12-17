package com.edu.kindergarten.mapper;

import com.edu.kindergarten.dto.request.salaryReportRequest.SalaryReportCreateRequestDTO;
import com.edu.kindergarten.dto.response.salaryReportCreateResponse.CustomerFeedbackResponse;
import com.edu.kindergarten.dto.response.salaryReportCreateResponse.GetMySalaryReportResponse;
import com.edu.kindergarten.dto.response.salaryReportCreateResponse.SalaryReportCreateResponse;
import com.edu.kindergarten.entity.SalaryReport;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SalaryReportMapper {
    SalaryReport toSalaryReport(SalaryReportCreateRequestDTO request);

    SalaryReportCreateResponse toSalaryReportCreateResponse(SalaryReport salaryReport);

    GetMySalaryReportResponse toGetMySalaryReportResponse(SalaryReport salaryReport);
    CustomerFeedbackResponse toCustomerFeedbackResponse(SalaryReport salaryReport);
    List<CustomerFeedbackResponse> toCustomerFeedbackResponses(List<SalaryReport> salaryReports);

    @Mapping(target = "salaryReportId", ignore = true)
    void updateSalaryReport(@MappingTarget SalaryReport salaryReport, SalaryReportCreateRequestDTO request);
}
