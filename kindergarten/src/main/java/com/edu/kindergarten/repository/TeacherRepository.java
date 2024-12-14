package com.edu.kindergarten.repository;

import com.edu.kindergarten.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TeacherRepository extends JpaRepository<Teacher, String> {
    boolean existsByTeacherCode(String teacherId);

    @Query("SELECT t FROM Teacher t WHERE t.teacherCode = :teacherCode")
    Optional<Teacher> findByTeacherCode(String teacherCode);

    Optional<Teacher> findByUsername(String username);
}
