package com.edu.kindergarten.dto.request.deductionRequest;

import com.edu.kindergarten.enums.DeductionType;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import java.time.LocalDate;

@Data
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DeductionCreateRequestDTO {
    LocalDate date;
    DeductionType deductionType;
    Integer amount;
    String description;
}
