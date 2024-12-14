package com.edu.kindergarten.entity;

import com.edu.kindergarten.enums.LeaveType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.sql.Time;
import java.time.LocalDate;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer attendanceId;

    LocalDate date;
    Time checkIn;
    Time checkOut;
    Integer workHours;
    Integer overTimeHours;

    @Enumerated(EnumType.STRING)
    LeaveType leaveType;

    Integer dailyOvertimePay;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "teacher_code", referencedColumnName = "teacherCode")
    Teacher teacher;
}
