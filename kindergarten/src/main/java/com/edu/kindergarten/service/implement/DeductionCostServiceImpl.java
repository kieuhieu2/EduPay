package com.edu.kindergarten.service.implement;

import com.edu.kindergarten.dto.request.deductionCostRequest.DeductionCostRequest;
import com.edu.kindergarten.dto.response.deductionCostResponse.DeductionCostResponse;
import com.edu.kindergarten.entity.DeductionCost;
import com.edu.kindergarten.mapper.DeductionCostMapper;
import com.edu.kindergarten.repository.DeductionCostRepository;
import com.edu.kindergarten.service.DeductionCostService;
import jakarta.annotation.PostConstruct;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DeductionCostServiceImpl implements DeductionCostService {
    final DeductionCostRepository deductionCostRepository;
    final DeductionCostMapper deductionCostMapper;

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

    @Override
    public List<DeductionCostResponse> getDeductionCost() {
        List<DeductionCost> deductionCosts = deductionCostRepository.findAll();

        return deductionCostMapper.toDeductionCostResponse(deductionCosts);
    }

    @Override
    public DeductionCostResponse updateDeductionCost(Integer deductionCostId,DeductionCostRequest deductionCostRequest) {
        DeductionCost deductionCost = deductionCostRepository.findById(deductionCostId)
                .orElseThrow(() -> new RuntimeException("Deduction cost not found"));

        DeductionCost res = deductionCostMapper.updateDeductionCost(deductionCost, deductionCostRequest);
        deductionCostRepository.save(res);

        return deductionCostMapper.to1DeductionCostResponse(res);
    }
}
