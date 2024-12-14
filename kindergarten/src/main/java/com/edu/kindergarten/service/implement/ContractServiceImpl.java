package com.edu.kindergarten.service.implement;

import com.edu.kindergarten.dto.request.contractRequest.ContractCreateRequestDTO;
import com.edu.kindergarten.dto.response.contractRespon.ContractCreateResponse;
import com.edu.kindergarten.entity.Contract;
import com.edu.kindergarten.entity.Teacher;
import com.edu.kindergarten.exception.AppException;
import com.edu.kindergarten.mapper.ContractMapper;
import com.edu.kindergarten.repository.ContractRepository;
import com.edu.kindergarten.repository.TeacherRepository;
import com.edu.kindergarten.service.ContractService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import com.edu.kindergarten.exception.ErrorCode;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ContractServiceImpl implements ContractService {
    final ContractRepository contractRepository;
    final TeacherRepository teacherRepository;
    final ContractMapper contractMapper;

    @Override
    public ContractCreateResponse createContract(String teacherCode, ContractCreateRequestDTO request) {
        Teacher teacher = teacherRepository.findByTeacherCode(teacherCode)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        Contract contract = contractMapper.toContract(request);
        contract.setTeacher(teacher);

        contractRepository.save(contract);

        return contractMapper.toContractCreateResponse(contract);
    }

    @Override
    public ContractCreateResponse getContract(Integer contractId) {
        return contractRepository.findById(contractId)
                .map(contractMapper::toContractCreateResponse)
                .orElseThrow(() -> new AppException(ErrorCode.CONTRACT_NOT_FOUND));
    }

    @Override
    public ContractCreateResponse updateContract(Integer contractId, ContractCreateRequestDTO request) {
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new AppException(ErrorCode.CONTRACT_NOT_FOUND));

        contract = contractMapper.updateContract(contract, request);

        contractRepository.save(contract);

        return contractMapper.toContractCreateResponse(contract);
    }

    @Override
    public void deleteContract(Integer contractId) {
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new AppException(ErrorCode.CONTRACT_NOT_FOUND));

        contractRepository.deleteByContractId(contractId);
    }
}
