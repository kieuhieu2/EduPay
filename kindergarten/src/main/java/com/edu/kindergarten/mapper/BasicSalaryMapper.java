package com.edu.kindergarten.mapper;

import com.edu.kindergarten.dto.request.basicSalaryRequest.BasicSalaryCreateRequestDTO;
import com.edu.kindergarten.dto.response.basicSalaryResponse.BasicSalaryCreateResponse;
import com.edu.kindergarten.entity.BasicSalary;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BasicSalaryMapper {
    BasicSalary toBasicSalary(BasicSalaryCreateRequestDTO request);

    BasicSalaryCreateResponse toBasicSalaryCreateResponse(BasicSalary basicSalary);

    @Mapping(target = "basicSalaryId", ignore = true)
    BasicSalary updateBasicSalary(@MappingTarget BasicSalary basicSalary, BasicSalaryCreateRequestDTO request);
}
