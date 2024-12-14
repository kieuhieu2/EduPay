package com.edu.kindergarten.dto.response.teacherResponse;

import com.edu.kindergarten.enums.Position;
import com.edu.kindergarten.enums.QualificationOfTeacher;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Getter
@Setter
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class TeacherResponse {
     String teacherCode;
     String username;
     String firstName;
     String lastName;
     LocalDate dob;
     String email;
     String address;
     String phone;
     Position position;
     QualificationOfTeacher qualificationOfTeacher;
     Integer experience;
}
