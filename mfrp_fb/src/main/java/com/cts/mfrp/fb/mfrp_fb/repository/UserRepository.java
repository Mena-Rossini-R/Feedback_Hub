package com.feedbackhub.repository;

import com.feedbackhub.entity.User;
import com.feedbackhub.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    List<User> findByRole(UserRole role);
    List<User> findByRoleAndPodName(UserRole role, String podName);
    List<User> findByRoleAndCohortName(UserRole role, String cohortName);
}
