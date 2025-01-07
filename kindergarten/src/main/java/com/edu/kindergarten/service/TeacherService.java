package com.edu.kindergarten.service;

import com.edu.kindergarten.dto.request.teacherRequest.TeacherCreateDTO;
import com.edu.kindergarten.dto.request.teacherRequest.TeacherUpdateRequestDTO;
import com.edu.kindergarten.dto.response.teacherResponse.TeacherResponse;
import com.edu.kindergarten.dto.response.teacherResponse.TeacherUpdateResponse;

import java.util.List;

public interface TeacherService {
    public TeacherResponse createTeacher(TeacherCreateDTO request);
    public TeacherUpdateResponse updateTeacher(String teacherCode, TeacherUpdateRequestDTO request);
    public void deleteTeacher(String teacherCode);
    public TeacherResponse getTeacher(String teacherCode);
    public TeacherResponse getMyInfo();
    public List<TeacherResponse> getAllTeachers();
}
