package com.QuickApply.QuickApply.services;



import java.util.HashSet;
import java.util.Set;
import java.util.List;
import java.util.ArrayList;

import javax.naming.AuthenticationException;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.QuickApply.QuickApply.Jobs;
import com.QuickApply.QuickApply.User;
import com.QuickApply.QuickApply.models.LoginResponseDTO;
import com.QuickApply.QuickApply.models.Role;
import com.QuickApply.QuickApply.repository.RoleRepository;
import com.mongodb.DuplicateKeyException;
import com.QuickApply.QuickApply.UserRepository;

import jakarta.transaction.Transactional;

//in order to register a new user to database, accessed by authentication controller

@Service
@Transactional
public class AuthenticationService {
  
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;



    //POST JWT TOKENS CODE
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService TokenService;


    public User registerUser(String username, String password, String email) {

      System.out.println( "In the register user");
        
      if (userRepository.findByUsername(username).isPresent()) {
        throw new RuntimeException("Username already exists");
      }
      
        String encodedPassword = passwordEncoder.encode(password);
        // Role userRole = roleRepository.findByAuthority("USER").get();

        // Set<Role> authorities = new HashSet<>();

        // authorities.add(userRole);

        ObjectId id = new ObjectId();

        List<String> commonLinks = new ArrayList<String>();

        List<Jobs> jobIds = new ArrayList<Jobs>();

        return userRepository.save(new User(id, username, encodedPassword, email, commonLinks, jobIds ));

      
        
       

    
    }



    //LOGIN METHOD
    // look for a username and password and check that they are proper, generate a authToken ,
    // send to Token service and spit out a token
    public LoginResponseDTO loginUser(String username, String password){
        try{
          System.out.println("Attempting to authenticate user: " + username);
            Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
            );

            System.out.println("Authentication successful for user: " + username);

            String token = TokenService.generateJwt(auth);

            System.out.println("Generated token for user: " + username);

            return new LoginResponseDTO(userRepository.findByUsername(username).get(), token);


        } catch (org.springframework.security.core.AuthenticationException e) {
            return new LoginResponseDTO(null, "");
        }

    }

}

