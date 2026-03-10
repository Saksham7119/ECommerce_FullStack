package com.ecommerce.project.config;


import com.ecommerce.project.security.jwt.AuthEntryPointJwt;
import com.ecommerce.project.security.jwt.AuthTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

public class WebSecurityConfig {
    @Autowired
    private AuthEntryPointJwt unautharizedHandler;

    @Bean
    public AuthTokenFilter authenticationTokenFiler(){
        return new AuthTokenFilter();
    }

}
