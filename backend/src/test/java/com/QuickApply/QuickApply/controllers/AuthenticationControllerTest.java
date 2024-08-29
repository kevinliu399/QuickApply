package com.QuickApply.QuickApply.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.QuickApply.QuickApply.User;
import com.QuickApply.QuickApply.models.LoginResponseDTO;
import com.QuickApply.QuickApply.models.RegistrationDTO;
import com.QuickApply.QuickApply.services.AuthenticationService;
import com.QuickApply.QuickApply.services.TokenService;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import com.fasterxml.jackson.databind.ObjectMapper;

class AuthenticationControllerTest {

    private MockMvc mockMvc;

    @Mock
    private AuthenticationService authenticationService;

    @Mock
    private TokenService tokenService;

    @InjectMocks
    private AuthenticationController authenticationController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(authenticationController).build();
    }

    @Test
    void registerUser_ShouldReturnUser_WhenRegistrationIsSuccessful() throws Exception {
        RegistrationDTO registrationDTO = new RegistrationDTO("testUser", "testPassword", "test@example.com");
        User user = new User(new ObjectId(), "testUser", "encodedPassword", "test@example.com", null, null);

        when(authenticationService.registerUser(any(String.class), any(String.class), any(String.class))).thenReturn(user);

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(registrationDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("testUser"))
                .andExpect(jsonPath("$.email").value("test@example.com"));
    }

    @Test
    void loginUser_ShouldReturnToken_WhenLoginIsSuccessful() throws Exception {
        RegistrationDTO loginDTO = new RegistrationDTO("testUser", "testPassword", "test@example.com");
        User user = new User(new ObjectId(), "testUser", "encodedPassword", "test@example.com", null, null);
        String token = "mockedToken";

        when(authenticationService.loginUser(any(String.class), any(String.class)))
            .thenReturn(new LoginResponseDTO(user, token));

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(loginDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user.username").value("testUser"))
                .andExpect(jsonPath("$.jwt").value(token));
    }

    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

