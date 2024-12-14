package com.edu.kindergarten.dto.response.attendanceResponse;

import com.edu.kindergarten.enums.LeaveType;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.sql.Time;
import java.time.LocalDate;

@Getter
@Setter
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AttendanceCreateResponse {
    private String attendanceId;
    LocalDate date;
    Time checkIn;
    Time checkOut;
    Integer workHours;
    Integer overTimeHours;
    LeaveType leaveType;
}
