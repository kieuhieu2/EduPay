package com.edu.kindergarten.mapper;

import com.edu.kindergarten.dto.request.deductionRequest.DeductionCreateRequestDTO;
import com.edu.kindergarten.dto.response.deductionResponse.DeductionCreateResponse;
import com.edu.kindergarten.entity.Deduction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;


@Mapper(componentModel = "spring")
public interface DeductionMapper {
    Deduction toDeduction(DeductionCreateRequestDTO request);

    DeductionCreateResponse toDeductionCreateResponse(Deduction deduction);

    @Mapping(target = "deductionId", ignore = true)
    Deduction updateDeduction(@MappingTarget Deduction deduction, DeductionCreateRequestDTO request);

    List<DeductionCreateResponse> toDeductionCreateResponseList(List<Deduction> deductions);
}
