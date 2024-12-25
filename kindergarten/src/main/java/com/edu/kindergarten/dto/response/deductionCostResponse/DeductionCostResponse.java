package com.edu.kindergarten.dto.response.deductionCostResponse;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Data
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DeductionCostResponse {
    Integer deductionCostId;
    Integer deductionCost;
    String deductionType;
}
