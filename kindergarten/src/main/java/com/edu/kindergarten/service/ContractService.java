package com.edu.kindergarten.service;

import com.edu.kindergarten.dto.request.contractRequest.ContractCreateRequestDTO;
import com.edu.kindergarten.dto.response.contractRespon.ContractCreateResponse;

public interface ContractService {
    public ContractCreateResponse createContract(String teacherCode, ContractCreateRequestDTO request);
    public ContractCreateResponse getContract(Integer contractId);
    public ContractCreateResponse updateContract(Integer contractId, ContractCreateRequestDTO request);
    public void deleteContract(Integer contractId);
}
