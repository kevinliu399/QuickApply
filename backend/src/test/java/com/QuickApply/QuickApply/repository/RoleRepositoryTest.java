package com.QuickApply.QuickApply.repository;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;

import com.QuickApply.QuickApply.models.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.Optional;

@ExtendWith(SpringExtension.class)
@DataMongoTest
public class RoleRepositoryTest {

    @Autowired
    private RoleRepository roleRepository;

    @BeforeEach
    public void setUp() {
        roleRepository.deleteAll(); 
        roleRepository.save(new Role("USER"));
        roleRepository.save(new Role("ADMIN"));
    }

    @Test
    public void testFindByAuthority_UserRoleExists() {
        Optional<Role> role = roleRepository.findByAuthority("USER");
        assertTrue(role.isPresent());
        assertTrue(role.get().getAuthority().equals("USER"));
    }

    
}
