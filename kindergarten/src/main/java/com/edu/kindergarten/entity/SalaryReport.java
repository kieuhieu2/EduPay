package com.edu.kindergarten.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class SalaryReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer salaryReportId;

    Integer month;
    Integer year;
    Integer workDaysInMonth;
    Integer totalOverTimeHours;
    Integer totalDeduction;
    Integer bonusInMonth;
    Integer netSalary;
    LocalDate payDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "teacher_code", referencedColumnName = "teacherCode")
    Teacher teacher;
}
