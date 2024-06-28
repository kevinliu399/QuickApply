package com.QuickApply.QuickApply.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.QuickApply.QuickApply.models.Role;

//Finding Role in database



import com.QuickApply.QuickApply.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByAuthority(String authority);
}
