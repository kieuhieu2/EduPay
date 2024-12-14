package com.edu.kindergarten.mapper;

import org.mapstruct.Mapper;

import com.edu.kindergarten.dto.request.PermissionRequest;
import com.edu.kindergarten.dto.response.PermissionResponse;
import com.edu.kindergarten.entity.Permission;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest request);

    PermissionResponse toPermissionResponse(Permission permission);
}
