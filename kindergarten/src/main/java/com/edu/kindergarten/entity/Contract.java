package com.edu.kindergarten.entity;

import com.edu.kindergarten.enums.ContractType;
import com.edu.kindergarten.enums.HolidayPublic;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;

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

    @Enumerated(EnumType.STRING)
    HolidayPublic holidayPublic;

    Integer annualLeaveDaysInMonth;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "teacher_code", referencedColumnName = "teacherCode")
    Teacher teacher;
}
