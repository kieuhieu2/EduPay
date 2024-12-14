package com.edu.kindergarten.service.implement;

import com.edu.kindergarten.entity.DeductionCost;
import com.edu.kindergarten.repository.DeductionCostRepository;
import com.edu.kindergarten.service.DeductionCostService;
import jakarta.annotation.PostConstruct;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import java.util.Arrays;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DeductionCostServiceImpl implements DeductionCostService {
    final DeductionCostRepository deductionCostRepository;

    @PostConstruct
    public void initializeDefaultDeductionCosts(){
        if(deductionCostRepository.count() == 0){
            DeductionCost late = new DeductionCost();
            late.setDeductionType("LATE");
            late.setDeductionCost(100000);

            DeductionCost tg = new DeductionCost();
            tg.setDeductionType("UNAPPROVED_ABSENCE");
            tg.setDeductionCost(200000);

            deductionCostRepository.saveAll(Arrays.asList(late, tg));
        }
    }
}
