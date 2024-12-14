package com.edu.kindergarten.service;

import com.edu.kindergarten.dto.request.UserCreationRequest;
import com.edu.kindergarten.dto.request.UserUpdateRequest;
import com.edu.kindergarten.dto.response.UserResponse;

import java.util.List;

public interface UserService {
    public UserResponse createUser(UserCreationRequest request);
    public UserResponse getMyInfo();
    public UserResponse updateUser(String userId, UserUpdateRequest request);
    public List<UserResponse> getUsers();
    public void deleteUser(String userId);
    public UserResponse getUser(String id);
}
