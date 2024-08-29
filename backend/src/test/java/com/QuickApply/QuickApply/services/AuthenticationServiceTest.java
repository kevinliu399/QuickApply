package com.QuickApply.QuickApply.services;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.QuickApply.QuickApply.User;
import com.QuickApply.QuickApply.models.LoginResponseDTO;
import com.QuickApply.QuickApply.repository.RoleRepository;
import com.QuickApply.QuickApply.UserRepository;

class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private TokenService tokenService;

    @InjectMocks
    private AuthenticationService authenticationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void registerUser_ShouldSaveUser_WhenUsernameIsAvailable() {
      
        String username = "testUser";
        String password = "testPassword";
        String email = "test@example.com";
        String encodedPassword = "encodedPassword";

        when(userRepository.findByUsername(username)).thenReturn(Optional.empty());
        when(passwordEncoder.encode(password)).thenReturn(encodedPassword);
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        
        User result = authenticationService.registerUser(username, password, email);

        
        assertNotNull(result.getId());
        assertEquals(username, result.getUsername());
        assertEquals(encodedPassword, result.getPassword());
        assertEquals(email, result.getEmail());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void registerUser_ShouldThrowException_WhenUsernameExists() {
        
        String username = "testUser";
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(new User()));

        
        RuntimeException exception = assertThrows(RuntimeException.class, () ->
            authenticationService.registerUser(username, "testPassword", "test@example.com")
        );

        assertEquals("Username already exists", exception.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void loginUser_ShouldReturnToken_WhenAuthenticationIsSuccessful() {
        
        String username = "testUser";
        String password = "testPassword";
        String token = "mockedToken";

        User user = new User(new ObjectId(), username, "encodedPassword", "test@example.com", null, null);
        Authentication auth = mock(Authentication.class);

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(auth);
        when(tokenService.generateJwt(auth)).thenReturn(token);
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));

        
        LoginResponseDTO result = authenticationService.loginUser(username, password);

        
        assertEquals(user, result.getUser());
        assertEquals(token, result.getJwt());
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(tokenService).generateJwt(auth);
    }

    @Test
    void loginUser_ShouldReturnEmptyToken_WhenAuthenticationFails() {
        
        String username = "testUser";
        String password = "testPassword";

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
            .thenThrow(new org.springframework.security.core.AuthenticationException("Invalid credentials") {});

        
        LoginResponseDTO result = authenticationService.loginUser(username, password);

        
        assertNull(result.getUser());
        assertEquals("", result.getJwt());
        verify(tokenService, never()).generateJwt(any(Authentication.class));
    }
}
