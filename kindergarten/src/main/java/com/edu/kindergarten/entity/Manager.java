package com.edu.kindergarten.entity;

import com.edu.kindergarten.enums.QualificationOfManager;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Manager extends User {

    @Column(nullable = false, unique = true)
    private String managerCode;

    @Enumerated(EnumType.STRING)
    private QualificationOfManager qualificationOfManager;

}
