package com.edu.kindergarten.dto.response.contractRespon;

import com.edu.kindergarten.enums.ContractType;
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
public class ContractCreateResponse {
    Integer contractId;
    ContractType contractType;
    LocalDate startDate;
    LocalDate endDate;
    Integer salaryOfMonth;
    Integer annualLeaveDaysInMonth;
}
