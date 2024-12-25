package com.edu.kindergarten.entity;

import com.edu.kindergarten.enums.ContractType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer contractId;

    @Enumerated(EnumType.STRING)
    ContractType contractType;

    LocalDate startDate;
    LocalDate endDate;
    Integer salaryOfMonth;

    Integer annualLeaveDaysInMonth;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "teacher_code", referencedColumnName = "teacherCode")
    Teacher teacher;
}
