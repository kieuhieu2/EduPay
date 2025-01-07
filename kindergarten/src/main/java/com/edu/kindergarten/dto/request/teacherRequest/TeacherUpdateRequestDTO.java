package com.edu.kindergarten.dto.request.teacherRequest;

import com.edu.kindergarten.enums.Position;
import com.edu.kindergarten.enums.QualificationOfTeacher;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TeacherUpdateRequestDTO {
    String firstName;
    String lastName;
    LocalDate dob;
    String email;
    String address;
    String phone;
    Position position;
    QualificationOfTeacher qualificationOfTeacher;
    Integer experience;

//    List<String> roles;

}
