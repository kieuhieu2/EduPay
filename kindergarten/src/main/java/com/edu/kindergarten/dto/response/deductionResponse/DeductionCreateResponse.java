package com.edu.kindergarten.dto.response.deductionResponse;

import com.edu.kindergarten.enums.DeductionType;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Data
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DeductionCreateResponse {
    Long deductionId;
    String date;
    DeductionType deductionType;
    Integer amount;
    String description;
    Integer sumOfDeduction;
}
