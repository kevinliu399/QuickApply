package com.QuickApply.QuickApply.utils;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.security.KeyPair;
import java.security.KeyPairGenerator;

import org.junit.jupiter.api.Test;

public class KeyGeneratorUtilityTest {

    @Test
    public void testGenerateRsaKey_ValidKeyPair() {
        
        KeyPair keyPair = KeyGeneratorUtility.generateRsaKey();

        assertNotNull(keyPair);
        assertNotNull(keyPair.getPrivate());
        assertNotNull(keyPair.getPublic());
    }

    
}

