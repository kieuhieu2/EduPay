package com.edu.kindergarten.repository;

import com.edu.kindergarten.entity.Deduction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DeductionRepository extends JpaRepository<Deduction, Integer> {
    @Query("SELECT d FROM Deduction d " +
            "WHERE d.teacher.teacherCode = :teacherCode " +
            "AND FUNCTION('MONTH', d.date) = :month " +
            "AND FUNCTION('YEAR', d.date) = :year")
    List<Deduction> findByTeacherCodeAndMonthAndYear(String teacherCode, int month, int year);
}
