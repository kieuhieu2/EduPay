package com.edu.kindergarten.repository;

import com.edu.kindergarten.dto.response.attendanceResponse.AttendanceCreateResponse;
import com.edu.kindergarten.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Integer > {
    @Query("SELECT a FROM Attendance a " +
            "WHERE a.teacher.teacherCode = :teacherCode " +
            "AND FUNCTION('MONTH', a.date) = :month " +
            "AND FUNCTION('YEAR', a.date) = :year")
    List<Attendance> findByTeacherCodeAndMonthAndYear(String teacherCode, int month, int year);
}
