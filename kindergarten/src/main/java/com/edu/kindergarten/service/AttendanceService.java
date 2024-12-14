package com.edu.kindergarten.service;

import com.edu.kindergarten.dto.request.attedanceRequest.AttendanceCreateRequestDTO;
import com.edu.kindergarten.dto.response.attendanceResponse.AttendanceCreateResponse;

import java.util.List;

public interface AttendanceService {
    public AttendanceCreateResponse createAttendance(String teacherCode,AttendanceCreateRequestDTO request);
    public AttendanceCreateResponse getAttendance(Integer attendanceId);
    public AttendanceCreateResponse updateAttendance(Integer attendanceId, AttendanceCreateRequestDTO request);
    public void deleteAttendance(Integer attendanceId);
    public List<AttendanceCreateResponse> getAttendanceByTeacherCodeAndMonthAndYear(String teacherCode, int month, int year);
}
