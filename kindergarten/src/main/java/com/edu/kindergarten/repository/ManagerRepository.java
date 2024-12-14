package com.edu.kindergarten.repository;

import com.edu.kindergarten.entity.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ManagerRepository extends JpaRepository<Manager, String> {
    Optional<Manager> findByManagerCode(String managerId);
}
