package com.edu.kindergarten.service.implement;

import com.edu.kindergarten.dto.request.salaryReportRequest.SalaryReportCreateRequestDTO;
import com.edu.kindergarten.dto.response.salaryReportCreateResponse.GetMySalaryReportResponse;
import com.edu.kindergarten.dto.response.salaryReportCreateResponse.SalaryReportCreateResponse;
import com.edu.kindergarten.entity.SalaryReport;
import com.edu.kindergarten.entity.Teacher;
import com.edu.kindergarten.exception.AppException;
import com.edu.kindergarten.exception.ErrorCode;
import com.edu.kindergarten.mapper.SalaryReportMapper;
import com.edu.kindergarten.repository.SalaryReportRepository;
import com.edu.kindergarten.repository.TeacherRepository;
import com.edu.kindergarten.service.SalaryReportService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SalaryReportServiceImpl implements SalaryReportService {
    SalaryReportRepository salaryReportRepository;
    SalaryReportMapper salaryReportMapper;
    TeacherRepository teacherRepository;

    @Override
    public SalaryReportCreateResponse createSalaryReport(String teacherCode,SalaryReportCreateRequestDTO request) {
        SalaryReport salaryReport = salaryReportMapper.toSalaryReport(request);
        if(request.getBonusInMonth() == 0){
            salaryReport.setBonusInMonth(0);
        }

        Teacher teacher = teacherRepository.findByTeacherCode(teacherCode)
                .orElseThrow(() -> new AppException(ErrorCode.TEACHER_NOT_FOUND));
        salaryReport.setTeacher(teacher);

        salaryReportRepository.save(salaryReport);
        return salaryReportMapper.toSalaryReportCreateResponse(salaryReport);
    }

    @Override
    public SalaryReportCreateResponse getSalaryReport(Integer salaryReportId) {
        return salaryReportMapper.toSalaryReportCreateResponse(salaryReportRepository.findById(salaryReportId)
                .orElseThrow(() -> new AppException(ErrorCode.SALARY_REPORT_NOT_FOUND)));
    }

    @Override
    public SalaryReportCreateResponse updateSalaryReport(Integer salaryReportId ,SalaryReportCreateRequestDTO request) {
        SalaryReport salaryReport = salaryReportRepository.findById(salaryReportId)
                .orElseThrow(() -> new AppException(ErrorCode.SALARY_REPORT_NOT_FOUND));

        salaryReportMapper.updateSalaryReport(salaryReport, request);

        if(request.getBonusInMonth() == 0){
            salaryReport.setBonusInMonth(0);
        }

        salaryReportRepository.save(salaryReport);
        return salaryReportMapper.toSalaryReportCreateResponse(salaryReport);
    }

    @Override
    public void deleteSalaryReport(Integer salaryReportId) {
        salaryReportRepository.deleteById(salaryReportId);
    }

    @Override
    public GetMySalaryReportResponse getMySalaryReport(String teacherCode, Integer month, Integer year) {
        Teacher teacher = teacherRepository.findByTeacherCode(teacherCode)
                .orElseThrow(() -> new AppException(ErrorCode.TEACHER_NOT_FOUND));

        SalaryReport salaryReport = salaryReportRepository.findByTeacherCodeAndMonthAndYear(teacher.getTeacherCode(), month, year)
                .orElseThrow(() -> new AppException(ErrorCode.SALARY_REPORT_NOT_FOUND));

        return salaryReportMapper.toGetMySalaryReportResponse(salaryReport);
    }
}
