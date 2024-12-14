package com.edu.kindergarten.dto.request.contractRequest;

import com.edu.kindergarten.enums.ContractType;
import com.edu.kindergarten.enums.HolidayPublic;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ContractCreateRequestDTO {
    ContractType contractType;
    LocalDate startDate;
    LocalDate endDate;
    Integer salaryOfMonth;
    HolidayPublic holidayPublic;
    Integer annualLeaveDaysInMonth;
}
