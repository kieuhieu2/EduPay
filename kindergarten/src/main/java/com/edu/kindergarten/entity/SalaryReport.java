package com.edu.kindergarten.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

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
    String customerFeedback;
    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    Boolean isReadByAdmin = false;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "teacher_code", referencedColumnName = "teacherCode")
    Teacher teacher;
}
