package com.QuickApply.QuickApply.services;


import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

//creates the jwt token

@Service
public class TokenService {
  
  @Autowired
  private JwtEncoder jwtEncoder;

  

  @Autowired
  private JwtDecoder jwtDecoder;

  public String generateJwt(Authentication auth){

    Instant now = Instant.now();

    String scope = auth.getAuthorities().stream()
      .map(GrantedAuthority::getAuthority)
      .collect(Collectors.joining(" "));

    JwtClaimsSet claims = JwtClaimsSet.builder()
      .issuer("self")
      .issuedAt(now)
      .subject(auth.getName())
      .claim("roles", scope)
      .build();


      // encode a new jet token, to encode it use, self, issued at and getName, scope ^^^
      //getTokenValue returns the value that can be passed back to the frontend
    return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    
    
  }

  
}

