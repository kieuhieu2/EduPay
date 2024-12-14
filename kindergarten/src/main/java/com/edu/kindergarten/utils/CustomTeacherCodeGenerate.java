package com.edu.kindergarten.utils;

import com.edu.kindergarten.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class CustomTeacherCodeGenerate {

    private final TeacherRepository teacherRepository;
    private final Random random = new Random();

    @Autowired
    public CustomTeacherCodeGenerate(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    public String generateUniqueId() {
        int randomNumber;
        String uniqueId;

        do {
            randomNumber = 100 + random.nextInt(900); // Generate random number between 100 and 999
            uniqueId = "GV" + randomNumber;
        } while (!isUnique(uniqueId));

        return uniqueId;
    }

    private boolean isUnique(String id) {
        return !teacherRepository.existsByTeacherCode(id);
    }
}