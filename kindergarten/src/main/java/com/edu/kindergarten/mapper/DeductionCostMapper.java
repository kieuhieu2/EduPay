package com.edu.kindergarten.mapper;

import com.edu.kindergarten.dto.request.deductionCostRequest.DeductionCostRequest;
import com.edu.kindergarten.dto.response.deductionCostResponse.DeductionCostResponse;
import com.edu.kindergarten.entity.DeductionCost;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DeductionCostMapper {
    DeductionCostResponse to1DeductionCostResponse(DeductionCost deductionCost);
    List<DeductionCostResponse> toDeductionCostResponse(List<DeductionCost> deductionCosts);

    @Mapping(target = "deductionCostId", ignore = true)
    DeductionCost updateDeductionCost(@MappingTarget DeductionCost deductionCost, DeductionCostRequest deductionCostRequest);
}
