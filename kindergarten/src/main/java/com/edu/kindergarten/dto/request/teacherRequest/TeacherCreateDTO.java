package com.edu.kindergarten.dto.request.teacherRequest;

import com.edu.kindergarten.enums.Position;
import com.edu.kindergarten.enums.QualificationOfTeacher;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Data
@Getter
@Setter
public class TeacherCreateDTO {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String email;
    private String address;
    private String phone;
    private Position position;
    private QualificationOfTeacher qualificationOfTeacher;
    private Integer experience;
}
