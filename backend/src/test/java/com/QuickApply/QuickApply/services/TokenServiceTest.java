package com.QuickApply.QuickApply.services;

import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.Instant;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;

class TokenServiceTest {

    @Mock
    private JwtEncoder jwtEncoder;

    @Mock
    private Authentication auth;

    @InjectMocks
    private TokenService tokenService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void generateJwt_ShouldReturnToken() {
        
        Instant now = Instant.now();
        String expectedTokenValue = "mockedTokenValue";

        when(auth.getName()).thenReturn("testUser");

        JwtClaimsSet expectedClaims = JwtClaimsSet.builder()
            .issuer("self")
            .issuedAt(now)
            .subject("testUser")
            .claim("roles", "USER")
            .build();

        Jwt mockJwt = mock(Jwt.class);
        when(jwtEncoder.encode(argThat(params -> {
            JwtClaimsSet claims = params.getClaims();
            return claims.getClaimAsString("iss").equals("self") &&
                   claims.getSubject().equals("testUser") &&
                   claims.getClaim("roles").equals("USER");
        }))).thenReturn(mockJwt);

        when(mockJwt.getTokenValue()).thenReturn(expectedTokenValue);

        
        String token = tokenService.generateJwt(auth);

        
        assertEquals(expectedTokenValue, token);
        verify(jwtEncoder).encode(any(JwtEncoderParameters.class));
    }
}
