package com.edu.kindergarten.service.implement;

import com.edu.kindergarten.constant.PredefinedRole;
import com.edu.kindergarten.dto.request.teacherRequest.TeacherCreateDTO;
import com.edu.kindergarten.dto.request.teacherRequest.TeacherUpdateRequestDTO;
import com.edu.kindergarten.dto.response.teacherResponse.TeacherResponse;
import com.edu.kindergarten.dto.response.teacherResponse.TeacherUpdateResponse;
import com.edu.kindergarten.entity.Role;
import com.edu.kindergarten.entity.Teacher;
import com.edu.kindergarten.exception.AppException;
import com.edu.kindergarten.exception.ErrorCode;
import com.edu.kindergarten.mapper.TeacherMapper;
import com.edu.kindergarten.repository.PermissionRepository;
import com.edu.kindergarten.repository.RoleRepository;
import com.edu.kindergarten.repository.TeacherRepository;
import com.edu.kindergarten.service.TeacherService;
import com.edu.kindergarten.utils.CustomTeacherCodeGenerate;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;


@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {

    final TeacherRepository teacherRepository;
    final PermissionRepository permissionRepository;
    final RoleRepository roleRepository;
    final TeacherMapper teacherMapper;
    final PasswordEncoder passwordEncoder;
    final CustomTeacherCodeGenerate customTeacherCodeGenerate;

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public TeacherResponse createTeacher(TeacherCreateDTO request){

    Teacher teacher = teacherMapper.toTeacher(request);
    teacher.setTeacherCode(customTeacherCodeGenerate.generateUniqueId());
//    teacher.setTeacher_id(teacher.getTeacher_id());
    teacher.setPassword(passwordEncoder.encode((request.getPassword())));

    HashSet<Role> roles = new HashSet<>();
    roleRepository.findById(PredefinedRole.TEACHER_ROLE).ifPresent(roles::add);
    if (roles.isEmpty()) {
        throw new AppException(ErrorCode.ROLE_NOT_FOUND);
    }
    teacher.setRoles(roles);

    try{
        teacher = teacherRepository.save(teacher);
    } catch (DataIntegrityViolationException exception) {
        throw new AppException(ErrorCode.USER_EXISTED);
    }

    return teacherMapper.toTeacherResponse(teacher);

    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public TeacherUpdateResponse updateTeacher(String teacherCode, TeacherUpdateRequestDTO request) {
        Teacher teacher = teacherRepository.findByTeacherCode(teacherCode)
                .orElseThrow(() -> new AppException(ErrorCode.TEACHER_NOT_FOUND));

        teacherMapper.updateTeacher(teacher, request);

        try {
            teacher = teacherRepository.save(teacher);
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        return teacherMapper.toTeacherUpdateResponse(teacher);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteTeacher(String teacherCode) {
        Teacher teacher = teacherRepository.findByTeacherCode(teacherCode)
                .orElseThrow(() -> new AppException(ErrorCode.TEACHER_NOT_FOUND));
        teacherRepository.delete(teacher);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public TeacherResponse getTeacher(String teacherCode) {
        return teacherMapper.toTeacherResponse(
                teacherRepository.findByTeacherCode(teacherCode)
                        .orElseThrow(() -> new AppException(ErrorCode.TEACHER_NOT_FOUND)));
    }

    @Override
    public TeacherResponse getMyInfo() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Teacher teacher = teacherRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return teacherMapper.toTeacherResponse(teacher);
    }

    @Override
    public List<TeacherResponse> getAllTeachers() {
        List<Teacher> teachers = teacherRepository.findAll();
        return teacherMapper.toListTeacherResponse(teachers);
    }
}
