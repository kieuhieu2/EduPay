package com.edu.kindergarten.service;

import com.edu.kindergarten.dto.request.RoleRequest;
import com.edu.kindergarten.dto.response.RoleResponse;

import java.util.List;

public interface RoleService {
    public RoleResponse create(RoleRequest request);
    public List<RoleResponse> getAll();
    public void delete(String role);
}
