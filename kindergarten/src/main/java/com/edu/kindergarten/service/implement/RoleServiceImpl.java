package com.edu.kindergarten.service.implement;

import java.util.HashSet;
import java.util.List;

import com.edu.kindergarten.service.RoleService;
import org.springframework.stereotype.Service;

import com.edu.kindergarten.dto.request.RoleRequest;
import com.edu.kindergarten.dto.response.RoleResponse;
import com.edu.kindergarten.mapper.RoleMapper;
import com.edu.kindergarten.repository.PermissionRepository;
import com.edu.kindergarten.repository.RoleRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleServiceImpl implements RoleService {
    RoleRepository roleRepository;
    PermissionRepository permissionRepository;
    RoleMapper roleMapper;

    public RoleResponse create(RoleRequest request) {
        var role = roleMapper.toRole(request);

        var permissions = permissionRepository.findAllById(request.getPermissions());
        role.setPermissions(new HashSet<>(permissions));

        role = roleRepository.save(role);
        return roleMapper.toRoleResponse(role);
    }

    public List<RoleResponse> getAll() {
        return roleRepository.findAll().stream().map(roleMapper::toRoleResponse).toList();
    }

    public void delete(String role) {
        roleRepository.deleteById(role);
    }
}