package com.edu.kindergarten.controller;

import com.edu.kindergarten.dto.request.ApiResponse;
import com.edu.kindergarten.dto.request.managerRequest.ManagerCreateRequestDTO;
import com.edu.kindergarten.dto.response.ManagerResponse.ManagerCreateResponse;
import com.edu.kindergarten.service.ManagerService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/manager")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ManagerController {
    final ManagerService managerService;

    @PostMapping(path = "/", headers = "apiVersion=v1.0")
    public ApiResponse<ManagerCreateResponse> createManager(@RequestBody ManagerCreateRequestDTO request){
        return ApiResponse.<ManagerCreateResponse>builder()
                .result(managerService.createManager(request))
                .build();
    }

    @GetMapping(path = "/{managerCode}", headers = "apiVersion=v1.0")
    public ApiResponse<ManagerCreateResponse> getManager(@PathVariable String managerCode){
        return ApiResponse.<ManagerCreateResponse>builder()
                .result(managerService.getManager(managerCode))
                .build();
    }
}
