package com.QuickApply.QuickApply;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    private User user;
    private final ObjectId id = new ObjectId();
    private final String username = "testuser";
    private final String password = "password123";
    private final String email = "testuser@example.com";
    private final List<String> commonLinks = List.of("https://link1.com", "https://link2.com");
    private final List<ObjectId> jobIds = List.of(new ObjectId(), new ObjectId());

    @BeforeEach
    void setUp() {
        user = new User(id, username, password, email, commonLinks, jobIds);
    }

    @Test
    void testGetId() {
        assertEquals(id.toHexString(), user.getId());
    }

    @Test
    void testGetUserId() {
        assertEquals(id, user.getUserId());
    }

    @Test
    void testSetUserId() {
        ObjectId newId = new ObjectId();
        user.setUserId(newId);
        assertEquals(newId, user.getUserId());
    }

    @Test
    void testGetUsername() {
        assertEquals(username, user.getUsername());
    }

    @Test
    void testGetPassword() {
        assertEquals(password, user.getPassword());
    }

    @Test
    void testGetEmail() {
        assertEquals(email, user.getEmail());
    }

    @Test
    void testGetCommonLinks() {
        assertEquals(commonLinks, user.getCommonLinks());
    }

    @Test
    void testSetCommonLinks() {
        List<String> newCommonLinks = List.of("https://newlink.com");
        user.setCommonLinks(newCommonLinks);
        assertEquals(newCommonLinks, user.getCommonLinks());
    }

    @Test
    void testGetJobIds() {
        assertEquals(jobIds, user.getJobIds());
    }

    @Test
    void testGetAuthorities() {
        java.util.Collection<? extends GrantedAuthority> authorities = user.getAuthorities();
        assertNotNull(authorities);
        assertEquals(1, authorities.size());
        assertTrue(authorities.contains(new SimpleGrantedAuthority("USER")));
    }

    @Test
    void testIsAccountNonExpired() {
        assertTrue(user.isAccountNonExpired());
    }

    @Test
    void testIsAccountNonLocked() {
        assertTrue(user.isAccountNonLocked());
    }

    @Test
    void testIsCredentialsNonExpired() {
        assertTrue(user.isCredentialsNonExpired());
    }

    @Test
    void testIsEnabled() {
        assertTrue(user.isEnabled());
    }
}
