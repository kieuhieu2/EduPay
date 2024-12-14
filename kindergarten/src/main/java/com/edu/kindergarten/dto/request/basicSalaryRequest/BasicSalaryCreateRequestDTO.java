package com.edu.kindergarten.dto.request.basicSalaryRequest;

import com.edu.kindergarten.enums.PaymentType;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Data
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BasicSalaryCreateRequestDTO {
    Integer basicSalary;
    Integer fixed_allowances;
    Integer overtimeRate;
    PaymentType paymentType;
    Integer overtimePayPerHour;
}
