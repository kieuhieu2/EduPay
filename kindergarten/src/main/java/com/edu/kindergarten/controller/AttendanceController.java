package com.edu.kindergarten.controller;

import com.edu.kindergarten.dto.request.ApiResponse;
import com.edu.kindergarten.dto.request.attedanceRequest.AttendanceCreateRequestDTO;
import com.edu.kindergarten.dto.response.attendanceResponse.AttendanceCreateResponse;
import com.edu.kindergarten.service.AttendanceService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attendance")
@RequiredArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE, makeFinal=true)
public class AttendanceController {

    final AttendanceService attendanceService;

    @PostMapping(path = "/{teacherCode}", headers = "apiVersion=v1.0")
    public ApiResponse<AttendanceCreateResponse> craeteAttendance(@PathVariable String teacherCode, @RequestBody AttendanceCreateRequestDTO request){
        return ApiResponse.<AttendanceCreateResponse>builder()
                .result(attendanceService.createAttendance(teacherCode, request))
                .build();
    }

    @GetMapping(path = "/{attendanceId}", headers = "apiVersion=v1.0")
    public ApiResponse<AttendanceCreateResponse> getAttendance(@PathVariable Integer attendanceId){
        return ApiResponse.<AttendanceCreateResponse>builder()
                .result(attendanceService.getAttendance(attendanceId))
                .build();
    }

    @PutMapping(path = "/{attendanceId}", headers = "apiVersion=v1.0")
    public ApiResponse<AttendanceCreateResponse> updateAttendance(@PathVariable Integer attendanceId,@RequestBody AttendanceCreateRequestDTO request){
        return ApiResponse.<AttendanceCreateResponse>builder()
                .result(attendanceService.updateAttendance(attendanceId, request))
                .build();
    }

    @DeleteMapping(path = "/{attendanceId}", headers = "apiVersion=v1.0")
    public ApiResponse<Void> deleteAttendance(@PathVariable Integer attendanceId){
        attendanceService.deleteAttendance(attendanceId);
        return ApiResponse.<Void>builder()
                .result(null)
                .build();
    }

    @GetMapping(path = "/{teacherCode}/{month}/{year}", headers = "apiVersion=v1.0")
    public ApiResponse<List<AttendanceCreateResponse>> getAttendanceByTeacherCodeAndMonthAndYear(
                                                        @PathVariable String teacherCode,
                                                        @PathVariable int month,
                                                        @PathVariable int year){
        return ApiResponse.<List<AttendanceCreateResponse>>builder()
                .result(attendanceService.getAttendanceByTeacherCodeAndMonthAndYear(teacherCode, month, year))
                .build();
    }
}
