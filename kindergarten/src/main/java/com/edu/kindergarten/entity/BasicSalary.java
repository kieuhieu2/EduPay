package com.edu.kindergarten.entity;

import com.edu.kindergarten.enums.PaymentType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class BasicSalary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer basicSalaryId;

    Integer basicSalary;
    Integer fixed_allowances;
    Integer overtimeRate;
    Integer OvertimePayPerHour;

    @Enumerated(EnumType.STRING)
    PaymentType paymentType;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "teacher_code", referencedColumnName = "teacherCode")
    Teacher teacher;
}
