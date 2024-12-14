package com.edu.kindergarten.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class CustomManagerCodeGenerate {


    public String generateUniqueId() {
        Random random = new Random();
        int randomNumber;

        do {
            randomNumber = 10 + random.nextInt(90); // Tạo số ngẫu nhiên từ 10 đến 99
        } while (!isUnique("VP" + randomNumber));

        return "VP" + randomNumber;
    }

    private static boolean isUnique(String id) {
        // Kiểm tra trong cơ sở dữ liệu
//
        return true;
    }
}
