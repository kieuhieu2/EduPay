package com.edu.kindergarten.dto.request.salaryReportRequest;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SalaryReportCreateRequestDTO {
    Integer month;
    Integer year;
    Integer workDaysInMonth;
    Integer totalOverTimeHours;
    Integer totalDeduction;
    Integer bonusInMonth;
    Integer netSalary;
    LocalDate payDate;

}
