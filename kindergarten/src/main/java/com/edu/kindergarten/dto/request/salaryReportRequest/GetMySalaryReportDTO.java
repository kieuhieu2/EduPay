package com.edu.kindergarten.dto.request.salaryReportRequest;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Data
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GetMySalaryReportDTO {
    Integer month;
    Integer year;
}
