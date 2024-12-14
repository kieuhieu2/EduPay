package com.edu.kindergarten.service.implement;

import com.edu.kindergarten.constant.PredefinedRole;
import com.edu.kindergarten.dto.request.managerRequest.ManagerCreateRequestDTO;
import com.edu.kindergarten.dto.response.ManagerResponse.ManagerCreateResponse;
import com.edu.kindergarten.entity.Manager;
import com.edu.kindergarten.entity.Role;
import com.edu.kindergarten.exception.AppException;
import com.edu.kindergarten.exception.ErrorCode;
import com.edu.kindergarten.mapper.ManagerMapper;
import com.edu.kindergarten.repository.ManagerRepository;
import com.edu.kindergarten.repository.RoleRepository;
import com.edu.kindergarten.service.ManagerService;
import com.edu.kindergarten.utils.CustomManagerCodeGenerate;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ManagerServiceImpl implements ManagerService {
    final ManagerRepository managerRepository;
    final ManagerMapper managerMapper;
    final PasswordEncoder passwordEncoder;
    final CustomManagerCodeGenerate customManagerCodeGenerate;
    private final RoleRepository roleRepository;

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public ManagerCreateResponse createManager(ManagerCreateRequestDTO request){
//        Manager manager = managerMapper.toManager(request);
        Manager manager = new Manager();
        manager.setUsername(request.getUsername());
        manager.setFirstName(request.getFirstName());
        manager.setLastName(request.getLastName());
        manager.setDob(request.getDob());
        manager.setEmail(request.getEmail());
        manager.setAddress(request.getAddress());
        manager.setPhone(request.getPhone());
        manager.setQualificationOfManager(request.getQualificationOfManager());

        manager.setManagerCode(customManagerCodeGenerate.generateUniqueId());
        manager.setPassword(passwordEncoder.encode(request.getPassword()));

        HashSet<Role> roles = new HashSet<>();
        roleRepository.findById(PredefinedRole.MANAGER_ROLE).ifPresent(roles::add);
        if (roles.isEmpty()) {
            throw new AppException(ErrorCode.ROLE_NOT_FOUND);
        }
        manager.setRoles(roles);

        try {
            manager = managerRepository.save(manager);
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        return managerMapper.toManagerCreateResponse(manager);
    }

    @Override
    public ManagerCreateResponse getManager(String managerCode){
        Manager manager = managerRepository.findByManagerCode(managerCode)
                .orElseThrow(() -> new AppException(ErrorCode.MANAGER_NOT_FOUND));
        return managerMapper.toManagerCreateResponse(manager);
    }
}
