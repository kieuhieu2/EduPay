package com.edu.kindergarten.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.edu.kindergarten.dto.request.RoleRequest;
import com.edu.kindergarten.dto.response.RoleResponse;
import com.edu.kindergarten.entity.Role;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Mapping(target = "permissions", ignore = true)
    Role toRole(RoleRequest request);

    RoleResponse toRoleResponse(Role role);
}
