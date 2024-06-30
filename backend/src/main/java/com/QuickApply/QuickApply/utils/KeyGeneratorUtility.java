package com.QuickApply.QuickApply.utils;


//generates RSA keys that then allows us to setup JWT s
// WHAT IT DOES

import java.security.KeyPair;
import java.security.KeyPairGenerator;

public class KeyGeneratorUtility {

    public static KeyPair generateRsaKey(){

        KeyPair keyPair;

        try{
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");

            //2048 bits
            keyPairGenerator.initialize(2048);

            //key pair itself
            keyPair = keyPairGenerator.generateKeyPair();
        } catch(Exception e){
            throw new IllegalStateException();
        }

        return keyPair;
    }
    
}
