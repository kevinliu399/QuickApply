package com.QuickApply.QuickApply;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.hibernate.mapping.Collection;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.QuickApply.QuickApply.models.Role;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

// Refer to Jobs for documentation
@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails{
    @Id
    private ObjectId id;
    private String username;
    private String password;
    private String email;
    private List<String> commonLinks;
    private List<Jobs> jobIds;
    // private Set<Role> authorities;
   

    public String getId() {
        return id != null ? id.toHexString() : null;
    }


    // public User(ObjectId userId, String username, String password, String email, List<String> commonLinks) {
	// 	super();
	// 	this.id = userId;
	// 	this.username = username;
	// 	this.password = password;
    //     this.email = email;
    //     this.commonLinks = commonLinks;
    //     this.jobIds = jobIds;
        
    //     // this.authorities = new HashSet<>();
       
		
	// }

    public ObjectId getUserId() {
        return this.id;
    }

    public void setUserId(ObjectId userId) {
        this.id = userId;
    }

    // public void setAuthorities(Set<Role> authorities) {
    //     this.authorities = authorities;
    // }

    @Override
    public java.util.Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("USER"));
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

   
    public String getEmail() {
        return this.email;
    }

   
    public List<String> getCommonLinks() {
        return this.commonLinks;
    }

   
    public List<Jobs> getJobIds() {
        return this.jobIds;
    }

    
    
}
