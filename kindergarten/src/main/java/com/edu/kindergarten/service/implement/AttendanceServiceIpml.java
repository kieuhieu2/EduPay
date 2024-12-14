package com.edu.kindergarten.service.implement;

import com.edu.kindergarten.dto.request.attedanceRequest.AttendanceCreateRequestDTO;
import com.edu.kindergarten.dto.response.attendanceResponse.AttendanceCreateResponse;
import com.edu.kindergarten.entity.Attendance;
import com.edu.kindergarten.entity.Teacher;
import com.edu.kindergarten.exception.AppException;
import com.edu.kindergarten.exception.ErrorCode;
import com.edu.kindergarten.mapper.AttendanceMapper;
import com.edu.kindergarten.repository.AttendanceRepository;
import com.edu.kindergarten.repository.TeacherRepository;
import com.edu.kindergarten.service.AttendanceService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AttendanceServiceIpml implements AttendanceService {

    final AttendanceRepository attendanceRepository;
    final AttendanceMapper attendanceMapper;
    final TeacherRepository teacherRepository;

    @Override
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public AttendanceCreateResponse createAttendance(String teacherCode, AttendanceCreateRequestDTO request){
        Teacher teacher = teacherRepository.findByTeacherCode(teacherCode)
                .orElseThrow(() -> new AppException(ErrorCode.TEACHER_NOT_FOUND));

        Attendance attendance = attendanceMapper.toAttendance(request);
        if(request.getLeaveType() == null){
            attendance.setLeaveType(null);
        }

        attendance.setTeacher(teacher);
        attendanceRepository.save(attendance);

        return attendanceMapper.toAttendanceCreateResponse(attendance);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public AttendanceCreateResponse getAttendance(Integer attendanceId){
        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new AppException(ErrorCode.ATTENDANCE_NOT_FOUND));

        return attendanceMapper.toAttendanceCreateResponse(attendance);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public AttendanceCreateResponse updateAttendance(Integer attendanceId, AttendanceCreateRequestDTO request){
        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new AppException(ErrorCode.ATTENDANCE_NOT_FOUND));

        attendance = attendanceMapper.updateAttendance(attendance ,request);

        attendanceRepository.save(attendance);
        return attendanceMapper.toAttendanceCreateResponse(attendance);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public void deleteAttendance(Integer attendanceId){
        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new AppException(ErrorCode.ATTENDANCE_NOT_FOUND));

        attendanceRepository.delete(attendance);
    }

    @Override
    public List<AttendanceCreateResponse> getAttendanceByTeacherCodeAndMonthAndYear(String teacherCode,
                                                                              int month,
                                                                              int year) {
        List<Attendance> attendances = attendanceRepository.findByTeacherCodeAndMonthAndYear(teacherCode, month, year);

        return attendanceMapper.toAttendanceCreateResponseList(attendances);
    }
}
