package com.edu.kindergarten.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DeductionCost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer deductionCostId;

    String deductionType;
    Integer deductionCost;

}
