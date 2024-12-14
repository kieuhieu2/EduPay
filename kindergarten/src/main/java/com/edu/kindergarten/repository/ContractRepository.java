package com.edu.kindergarten.repository;

import com.edu.kindergarten.entity.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface ContractRepository extends JpaRepository<Contract, Integer> {

    @Modifying
    @Transactional
    @Query("DELETE FROM Contract c WHERE c.contractId = :contractId")
    void deleteByContractId(Integer contractId);
}
