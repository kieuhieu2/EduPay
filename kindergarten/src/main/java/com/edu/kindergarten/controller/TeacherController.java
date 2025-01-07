package com.edu.kindergarten.controller;

import com.edu.kindergarten.dto.request.ApiResponse;
import com.edu.kindergarten.dto.request.teacherRequest.TeacherCreateDTO;
import com.edu.kindergarten.dto.request.teacherRequest.TeacherUpdateRequestDTO;
import com.edu.kindergarten.dto.response.teacherResponse.TeacherResponse;
import com.edu.kindergarten.dto.response.teacherResponse.TeacherUpdateResponse;
import com.edu.kindergarten.service.TeacherService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teachers")
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class TeacherController {
    TeacherService teacherService;

    @PostMapping(path = "/", headers = "apiVersion=v1.0")
    public ApiResponse<TeacherResponse> createTeacher(@RequestBody TeacherCreateDTO request) {
        return ApiResponse.<TeacherResponse>builder()
                .result(teacherService.createTeacher(request))
                .build();
    }

    @PutMapping(path = "/{teacherCode}", headers = "apiVersion=v1.0")
    public ApiResponse<TeacherUpdateResponse> updateTeacher(@PathVariable String teacherCode, @RequestBody TeacherUpdateRequestDTO request) {
        return ApiResponse.<TeacherUpdateResponse>builder()
                .result(teacherService.updateTeacher(teacherCode, request))
                .build();
    }

    @DeleteMapping(path = "/{teacherCode}", headers = "apiVersion=v1.0")
    public ApiResponse<Void> deleteTeacher(@PathVariable String teacherCode) {
        teacherService.deleteTeacher(teacherCode);
        return ApiResponse.<Void>builder()
                .result(null)
                .build();
    }

    @GetMapping(path = "/{teacherCode}", headers = "apiVersion=v1.0")
    public ApiResponse<TeacherResponse> getTeacher(@PathVariable String teacherCode) {
        return ApiResponse.<TeacherResponse>builder()
                .result(teacherService.getTeacher(teacherCode))
                .build();
    }

    @GetMapping(path = "/getMyInfo", headers = "apiVersion=v1.0")
    public ApiResponse<TeacherResponse> getMyInfo() {
        return ApiResponse.<TeacherResponse>builder()
                .result(teacherService.getMyInfo())
                .build();
    }

    @GetMapping(path = "/", headers = "apiVersion=v1.0")
    public ApiResponse<List<TeacherResponse>> getAllTeachers() {
        return ApiResponse.<List<TeacherResponse>>builder()
                .result(teacherService.getAllTeachers())
                .build();
    }

}
