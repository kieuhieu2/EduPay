package com.edu.kindergarten.mapper;

import com.edu.kindergarten.dto.request.contractRequest.ContractCreateRequestDTO;
import com.edu.kindergarten.dto.response.contractRespon.ContractCreateResponse;
import com.edu.kindergarten.entity.Contract;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ContractMapper {
    Contract toContract(ContractCreateRequestDTO request);

    ContractCreateResponse toContractCreateResponse(Contract contract);

    @Mapping(target = "contractId", ignore = true)
    Contract updateContract(@MappingTarget Contract contract, ContractCreateRequestDTO request);
}
