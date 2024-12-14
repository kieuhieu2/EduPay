package com.edu.kindergarten.entity;

import com.edu.kindergarten.enums.Position;
import com.edu.kindergarten.enums.QualificationOfTeacher;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Teacher extends User {

    @Column(nullable = false, unique = true)
    private String teacherCode;

    @Enumerated(EnumType.STRING)
    private Position position;

    @Enumerated(EnumType.STRING)
    private QualificationOfTeacher qualificationOfTeacher;

    private Integer experience;

    @OneToOne(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
    private BasicSalary basicSalary;

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SalaryReport> salaryReports;

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Attendance> attendances;

    @OneToOne(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
    private Contract contract;

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Deduction> deductions;

}
