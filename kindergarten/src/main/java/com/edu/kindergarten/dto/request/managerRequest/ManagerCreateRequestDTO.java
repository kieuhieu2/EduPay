package com.edu.kindergarten.dto.request.managerRequest;

import com.edu.kindergarten.enums.QualificationOfManager;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Data
@Getter
@Setter
public class ManagerCreateRequestDTO {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String email;
    private String address;
    private String phone;
    private QualificationOfManager qualificationOfManager;

}
