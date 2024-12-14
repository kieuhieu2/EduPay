package com.edu.kindergarten.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.edu.kindergarten.dto.request.UserCreationRequest;
import com.edu.kindergarten.dto.request.UserUpdateRequest;
import com.edu.kindergarten.dto.response.UserResponse;
import com.edu.kindergarten.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest request);

    UserResponse toUserResponse(User user);

    @Mapping(target = "roles", ignore = true)
    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
