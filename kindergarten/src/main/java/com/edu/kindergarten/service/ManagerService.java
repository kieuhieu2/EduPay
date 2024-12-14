package com.edu.kindergarten.service;

import com.edu.kindergarten.dto.request.managerRequest.ManagerCreateRequestDTO;
import com.edu.kindergarten.dto.response.ManagerResponse.ManagerCreateResponse;

public interface ManagerService{
    public ManagerCreateResponse createManager(ManagerCreateRequestDTO request);
    public ManagerCreateResponse getManager(String managerCode);
}
