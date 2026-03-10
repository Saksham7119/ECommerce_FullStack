package com.ecommerce.project.repository;

import com.ecommerce.project.model.AppRole;
import com.ecommerce.project.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public interface RoleRepository extends JpaRepository<Role , Long> {
    Optional<Role> findByRoleName(AppRole appRole);
}
