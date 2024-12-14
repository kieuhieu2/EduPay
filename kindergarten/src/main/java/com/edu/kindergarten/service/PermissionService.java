package com.edu.kindergarten.service;

import com.edu.kindergarten.dto.request.PermissionRequest;
import com.edu.kindergarten.dto.response.PermissionResponse;

import java.util.List;

public interface PermissionService {
    public PermissionResponse create(PermissionRequest request);
    public List<PermissionResponse> getAll();
    public void delete(String permission);
}
