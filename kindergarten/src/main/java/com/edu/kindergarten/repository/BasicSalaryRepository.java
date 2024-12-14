package com.edu.kindergarten.repository;

import com.edu.kindergarten.entity.BasicSalary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface BasicSalaryRepository extends JpaRepository<BasicSalary, Integer> {
    Optional<BasicSalary> findByBasicSalaryId(Integer basicSalaryId);
    Optional<BasicSalary> findBasicSalaryByTeacher_TeacherCode(String teacherCode);

    @Modifying
    @Query("DELETE FROM BasicSalary bs WHERE bs.basicSalaryId = :basicSalaryId")
    void deleteByBasicSalaryId(Integer basicSalaryId);
}
