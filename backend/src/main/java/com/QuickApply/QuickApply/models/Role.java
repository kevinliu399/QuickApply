package com.QuickApply.QuickApply.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;

@Document(collection = "roles")
public class Role implements GrantedAuthority {

    @Id
    private String roleId;
    
    private String authority;

    public Role() {
        super();
    }

    public Role(String authority) {
        this.authority = authority;
    }

    public Role(String roleId, String authority) {
        this.roleId = roleId;
        this.authority = authority;
    }

    @Override
    public String getAuthority() {
        return this.authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public String getRoleId() {
        return this.roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }
}
