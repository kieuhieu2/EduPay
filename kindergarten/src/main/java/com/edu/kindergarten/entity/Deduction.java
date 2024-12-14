package com.edu.kindergarten.entity;

import com.edu.kindergarten.enums.DeductionType;
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
public class Deduction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer deductionId;

    LocalDate date;

    @Enumerated(EnumType.STRING)
    DeductionType deductionType;
    Integer amount;
    String description;
    Integer sumOfDeduction;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "teacher_code", referencedColumnName = "teacherCode")
    Teacher teacher;
}
