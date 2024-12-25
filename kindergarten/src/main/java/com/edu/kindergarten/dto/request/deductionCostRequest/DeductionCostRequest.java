package com.edu.kindergarten.dto.request.deductionCostRequest;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class DeductionCostRequest {
    Integer deductionCost;
    String deductionType;
}
