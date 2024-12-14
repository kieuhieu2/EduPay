package com.edu.kindergarten.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Uncategorized error", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1002, "User existed", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "Username must be at least {min} characters", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "Password must be at least {min} characters", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "User not existed", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_DOB(1008, "Your age must be at least {min}", HttpStatus.BAD_REQUEST),
    TEACHER_NOT_FOUND(1009, "Teacher not found", HttpStatus.NOT_FOUND),

    MANAGER_NOT_FOUND(1010,"Manager not found" ,HttpStatus.NOT_FOUND ),
    ROLE_NOT_FOUND(1011,"Role not found" ,HttpStatus.NOT_FOUND ),
    ATTENDANCE_NOT_FOUND(1012,"Attendance not found" ,HttpStatus.NOT_FOUND ),
    BASIC_SALARY_NOT_FOUND(1013,"basic salary not found", HttpStatus.NOT_FOUND),
    CONTRACT_NOT_FOUND(1014,"contract not found" ,HttpStatus.NOT_FOUND ),
    DEDUCTION_NOT_FOUND(1015,"deduction not found" ,HttpStatus.NOT_FOUND ),
    SALARY_REPORT_NOT_FOUND(1016,"salary report not found" ,HttpStatus.NOT_FOUND );


    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}
