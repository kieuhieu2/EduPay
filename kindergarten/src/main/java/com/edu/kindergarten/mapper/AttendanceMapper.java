package com.edu.kindergarten.mapper;

import com.edu.kindergarten.dto.request.attedanceRequest.AttendanceCreateRequestDTO;
import com.edu.kindergarten.dto.response.attendanceResponse.AttendanceCreateResponse;
import com.edu.kindergarten.entity.Attendance;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AttendanceMapper {
    Attendance toAttendance(AttendanceCreateRequestDTO request);

    AttendanceCreateResponse toAttendanceCreateResponse(Attendance attendance);

    @Mapping(target = "attendanceId", ignore = true)
    Attendance updateAttendance(@MappingTarget Attendance attendance, AttendanceCreateRequestDTO request);

    List<AttendanceCreateResponse> toAttendanceCreateResponseList(List<Attendance> attendances);
}
