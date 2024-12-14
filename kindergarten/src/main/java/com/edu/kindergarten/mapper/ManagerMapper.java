package com.edu.kindergarten.mapper;

import com.edu.kindergarten.dto.response.ManagerResponse.ManagerCreateResponse;
import com.edu.kindergarten.entity.Manager;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ManagerMapper {
    //map DTO to entity for create
//    Manager toManager(ManagerCreateRequestDTO managerCreateRequestDTO);

    //map entity to DTO for response
    ManagerCreateResponse toManagerCreateResponse(Manager manager);

//    Manager toManager(ManagerCreateRequestDTO request);

    //update an existing entity with new DTO for update
//    @Mapping(target = "roles", ignore = true)
//    void updateManager(Manager manager, ManagerCreateRequestDTO request);
}
