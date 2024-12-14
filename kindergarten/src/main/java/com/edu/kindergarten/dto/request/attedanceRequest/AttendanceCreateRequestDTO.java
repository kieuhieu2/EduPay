package com.edu.kindergarten.dto.request.attedanceRequest;

import com.edu.kindergarten.enums.LeaveType;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.sql.Time;
import java.time.LocalDate;

@Data
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AttendanceCreateRequestDTO {
    LocalDate date;
    Time checkIn;
    Time checkOut;
    Integer workHours;
    Integer overTimeHours;
    LeaveType leaveType;
}
