package com.edu.kindergarten.service.implement;

import com.edu.kindergarten.dto.request.deductionRequest.DeductionCreateRequestDTO;
import com.edu.kindergarten.dto.response.deductionResponse.DeductionCreateResponse;
import com.edu.kindergarten.entity.Deduction;
import com.edu.kindergarten.entity.Teacher;
import com.edu.kindergarten.exception.AppException;
import com.edu.kindergarten.exception.ErrorCode;
import com.edu.kindergarten.mapper.DeductionMapper;
import com.edu.kindergarten.repository.DeductionRepository;
import com.edu.kindergarten.repository.TeacherRepository;
import com.edu.kindergarten.service.DeductionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DeductionServiceIpml implements DeductionService {
    final DeductionRepository deductionRepository;
    final TeacherRepository teacherRepository;
    final DeductionMapper deductionMapper;

    @Override
    public DeductionCreateResponse createDeduction(String teacherCode, DeductionCreateRequestDTO request) {
        Teacher teacher = teacherRepository.findByTeacherCode(teacherCode)
                .orElseThrow(() -> new AppException(ErrorCode.TEACHER_NOT_FOUND));

        Deduction deduction = deductionMapper.toDeduction(request);
        if(request.getDate() == null) {
            deduction.setDate(LocalDate.now());
        }
        if(request.getAmount() == null){
            deduction.setAmount(1);
        }
        deduction.setTeacher(teacher);

        deductionRepository.save(deduction);

        return deductionMapper.toDeductionCreateResponse(deduction);
    }

    @Override
    public DeductionCreateResponse getDeduction(Integer deductionId) {
        return deductionMapper.toDeductionCreateResponse(
                deductionRepository.findById(deductionId)
                        .orElseThrow(() -> new AppException(ErrorCode.DEDUCTION_NOT_FOUND))
                );
    }

    @Override
    public DeductionCreateResponse updateDeduction(Integer deductionId, DeductionCreateRequestDTO request) {
        Deduction deduction = deductionRepository.findById(deductionId)
                .orElseThrow(() -> new AppException(ErrorCode.DEDUCTION_NOT_FOUND));

        deduction = deductionMapper.updateDeduction(deduction, request);
        if(request.getDate() == null) {
            deduction.setDate(LocalDate.now());
        }

        deductionRepository.save(deduction);

        return deductionMapper.toDeductionCreateResponse(deduction);

    }

    @Override
    public void deleteDeduction(Integer deductionId) {
        Deduction deduction = deductionRepository.findById(deductionId)
                .orElseThrow(() -> new AppException(ErrorCode.DEDUCTION_NOT_FOUND));

        deductionRepository.delete(deduction);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public List<DeductionCreateResponse> getDeductionsByTeacherCode(String teacherCode,
                                                                    Integer month,
                                                                    Integer year) {
        List<Deduction> deduction = deductionRepository.findByTeacherCodeAndMonthAndYear(teacherCode,
                                                                                        month, year);
        return deductionMapper.toDeductionCreateResponseList(deduction);
    }
}
