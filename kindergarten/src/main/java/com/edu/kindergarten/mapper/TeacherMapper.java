package com.edu.kindergarten.mapper;

import com.edu.kindergarten.dto.request.teacherRequest.TeacherCreateDTO;
import com.edu.kindergarten.dto.request.teacherRequest.TeacherUpdateRequestDTO;
import com.edu.kindergarten.dto.response.teacherResponse.TeacherResponse;
import com.edu.kindergarten.dto.response.teacherResponse.TeacherUpdateResponse;
import com.edu.kindergarten.entity.Teacher;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface TeacherMapper {

    // Map TeacherDTO to Teacher entity (for create)
    Teacher toTeacher(TeacherCreateDTO teacherCreateDTO);

    // Map Teacher entity to TeacherResponse DTO (for response)
    TeacherResponse toTeacherResponse(Teacher teacher);

    TeacherUpdateResponse toTeacherUpdateResponse(Teacher teacher);

    // Update an existing Teacher entity with new TeacherDTO (for update)
    @Mapping(target = "roles", ignore = true)
    void updateTeacher(@MappingTarget Teacher teacher, TeacherUpdateRequestDTO request);
}