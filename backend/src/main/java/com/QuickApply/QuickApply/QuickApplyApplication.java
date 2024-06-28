package com.QuickApply.QuickApply;

import java.util.HashSet;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.QuickApply.QuickApply.repository.RoleRepository;

@SpringBootApplication
public class QuickApplyApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuickApplyApplication.class, args);
	}

	
}