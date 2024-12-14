package com.edu.kindergarten.dto.response.basicSalaryResponse;

import com.edu.kindergarten.enums.PaymentType;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class BasicSalaryCreateResponse {
    Integer basicSalary;
    Integer fixed_allowances;
    Integer overtimeRate;
    PaymentType paymentType;
    Integer overtimePayPerHour;
}
