package com.edu.kindergarten.dto.response.teacherResponse;

import com.edu.kindergarten.enums.Position;
import com.edu.kindergarten.enums.QualificationOfTeacher;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TeacherUpdateResponse {
    String teacherCode;
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
