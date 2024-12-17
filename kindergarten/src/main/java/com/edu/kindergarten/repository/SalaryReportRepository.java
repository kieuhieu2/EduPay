package com.edu.kindergarten.repository;

import com.edu.kindergarten.entity.SalaryReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SalaryReportRepository extends JpaRepository<SalaryReport, Integer> {
    @Query("SELECT sr FROM SalaryReport sr JOIN sr.teacher t WHERE t.teacherCode = ?1 AND sr.month = ?2 AND sr.year = ?3")
    Optional<SalaryReport> findByTeacherCodeAndMonthAndYear(String teacherCode, Integer month, Integer year);

    List<SalaryReport> findByIsReadByAdmin(Boolean isReadByAdmin);

    List<SalaryReport> findTop5ByIsReadByAdmin(Boolean isReadByAdmin);
}
