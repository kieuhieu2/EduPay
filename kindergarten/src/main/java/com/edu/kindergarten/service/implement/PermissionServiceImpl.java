package com.edu.kindergarten.service.implement;

import java.util.List;

import com.edu.kindergarten.service.PermissionService;
import org.springframework.stereotype.Service;

import com.edu.kindergarten.dto.request.PermissionRequest;
import com.edu.kindergarten.dto.response.PermissionResponse;
import com.edu.kindergarten.entity.Permission;
import com.edu.kindergarten.mapper.PermissionMapper;
import com.edu.kindergarten.repository.PermissionRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PermissionServiceImpl implements PermissionService {
    PermissionRepository permissionRepository;
    PermissionMapper permissionMapper;

    public PermissionResponse create(PermissionRequest request) {
        Permission permission = permissionMapper.toPermission(request);
        permission = permissionRepository.save(permission);
        return permissionMapper.toPermissionResponse(permission);
    }

    public List<PermissionResponse> getAll() {
        var permissions = permissionRepository.findAll();
        return permissions.stream().map(permissionMapper::toPermissionResponse).toList();
    }

    public void delete(String permission) {
        permissionRepository.deleteById(permission);
    }
}