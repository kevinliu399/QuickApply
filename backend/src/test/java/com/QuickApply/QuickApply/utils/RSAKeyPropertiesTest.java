package com.QuickApply.QuickApply.utils;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class RSAKeyPropertiesTest {

    private RSAKeyProperties rsaKeyProperties;

    @BeforeEach
    public void setUp() {
        rsaKeyProperties = new RSAKeyProperties();
    }

    @Test
    public void testKeyPairGenerated_NotNull() {
        
        RSAPublicKey publicKey = rsaKeyProperties.getPublicKey();
        RSAPrivateKey privateKey = rsaKeyProperties.getPrivateKey();

        assertNotNull(publicKey, "Public key should not be null");
        assertNotNull(privateKey, "Private key should not be null");
    }

    @Test
    public void testKeyPairGenerated_ValidKeys() {
        
        RSAPublicKey publicKey = rsaKeyProperties.getPublicKey();
        RSAPrivateKey privateKey = rsaKeyProperties.getPrivateKey();

        assertTrue(publicKey instanceof RSAPublicKey, "Public key should be an instance of RSAPublicKey");
        assertTrue(privateKey instanceof RSAPrivateKey, "Private key should be an instance of RSAPrivateKey");
    }
}
