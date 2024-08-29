package com.QuickApply.QuickApply;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.QuickApply.QuickApply.utils.RSAKeyProperties;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest
public class SecurityConfigurationTest {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    @MockBean
    private RSAKeyProperties rsaKeyProperties;

    @MockBean
    private JwtDecoder jwtDecoder;

    @MockBean
    private JwtEncoder jwtEncoder;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        Mockito.when(rsaKeyProperties.getPublicKey()).thenReturn(Mockito.mock(java.security.interfaces.RSAPublicKey.class));
        Mockito.when(rsaKeyProperties.getPrivateKey()).thenReturn(Mockito.mock(java.security.interfaces.RSAPrivateKey.class));
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test
    void unauthenticatedUser_ShouldBeAbleToAccessAuthEndpoints() throws Exception {
        mockMvc.perform(post("/auth/login")
                .contentType("application/json")
                .content("{\"username\":\"testUser\", \"password\":\"testPassword\"}"))
                .andExpect(status().isOk());
    }

    

    @Test
    @WithMockUser
    void authenticatedUser_ShouldAccessProtectedEndpoints() throws Exception {
        mockMvc.perform(get("/users"))
                .andExpect(status().isOk());
    }
}
