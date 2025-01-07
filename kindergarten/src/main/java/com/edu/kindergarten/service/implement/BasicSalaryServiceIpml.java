package com.edu.kindergarten.service.implement;

import com.edu.kindergarten.dto.request.basicSalaryRequest.BasicSalaryCreateRequestDTO;
import com.edu.kindergarten.dto.response.basicSalaryResponse.BasicSalaryCreateResponse;
import com.edu.kindergarten.entity.BasicSalary;
import com.edu.kindergarten.entity.Teacher;
import com.edu.kindergarten.exception.AppException;
import com.edu.kindergarten.exception.ErrorCode;
import com.edu.kindergarten.mapper.BasicSalaryMapper;
import com.edu.kindergarten.repository.BasicSalaryRepository;
import com.edu.kindergarten.repository.TeacherRepository;
import com.edu.kindergarten.service.BasicSalaryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BasicSalaryServiceIpml implements BasicSalaryService {

    final BasicSalaryRepository basicSalaryRepository;
    final BasicSalaryMapper basicSalaryMapper;
    final TeacherRepository teacherRepository;

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public BasicSalaryCreateResponse createBasicSalary(String teacherCode ,BasicSalaryCreateRequestDTO request){
        Teacher teacher = teacherRepository.findByTeacherCode(teacherCode)
                .orElseThrow(() -> new AppException(ErrorCode.TEACHER_NOT_FOUND));

        BasicSalary basicSalary = basicSalaryMapper.toBasicSalary(request);
        basicSalary.setTeacher(teacher);
        basicSalary.setOvertimePayPerHour(request.getOvertimePayPerHour());
        basicSalary = basicSalaryRepository.save(basicSalary);

        return basicSalaryMapper.toBasicSalaryCreateResponse(basicSalary);
    }

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public BasicSalaryCreateResponse getBasicSalary(Integer basicSalaryId){
        return basicSalaryRepository.findByBasicSalaryId(basicSalaryId)
                .map(basicSalaryMapper::toBasicSalaryCreateResponse)
                .orElseThrow(() -> new AppException(ErrorCode.BASIC_SALARY_NOT_FOUND));
    }

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public BasicSalaryCreateResponse updateBasicSalary(Integer basicSalaryId, BasicSalaryCreateRequestDTO request){
        BasicSalary basicSalary = basicSalaryRepository.findById(basicSalaryId)
                .orElseThrow(() -> new AppException(ErrorCode.BASIC_SALARY_NOT_FOUND));

        basicSalary = basicSalaryMapper.updateBasicSalary(basicSalary ,request);
        basicSalary = basicSalaryRepository.save(basicSalary);

        return basicSalaryMapper.toBasicSalaryCreateResponse(basicSalary);
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteBasicSalary(Integer basicSalaryId) {
        BasicSalary basicSalary = basicSalaryRepository.findById(basicSalaryId)
                .orElseThrow(() -> new AppException(ErrorCode.BASIC_SALARY_NOT_FOUND));

        basicSalaryRepository.deleteByBasicSalaryId(basicSalaryId);
    }

    @Override
    public BasicSalaryCreateResponse getMyBasicSalary(String teacherCode) {
        BasicSalary basicSalary = basicSalaryRepository.findBasicSalaryByTeacher_TeacherCode(teacherCode)
                .orElseThrow(() -> new AppException(ErrorCode.BASIC_SALARY_NOT_FOUND));
        return basicSalaryMapper.toBasicSalaryCreateResponse(basicSalary);
    }

    @Override
    public String updateAllBasicSalary(Integer basicSalary) {
        basicSalaryRepository.updateAllBasicSalary(basicSalary);
        return "sucess";
    }
}
