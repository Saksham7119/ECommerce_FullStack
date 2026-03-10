package com.ecommerce.project.controller;

import com.ecommerce.project.model.AppRole;
import com.ecommerce.project.model.Role;
import com.ecommerce.project.model.User;
import com.ecommerce.project.repository.RoleRepository;
import com.ecommerce.project.repository.UserRepository;
import com.ecommerce.project.security.jwt.JwtUtils;
import com.ecommerce.project.security.request.LoginRequest;
import com.ecommerce.project.security.request.SignupRequest;
import com.ecommerce.project.security.response.MessageResponse;
import com.ecommerce.project.security.response.UserInfoResponse;
import com.ecommerce.project.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest){

        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                   UsernamePasswordAuthenticationToken.unauthenticated(
                           loginRequest.getUsername(),
                           loginRequest.getPassword()
                   )
            );
        }
        catch (AuthenticationException e){
            Map<String , Object> map = new HashMap<>();
            map.put("message" , "Bad Credentials");
            map.put("status" , false);

            return new ResponseEntity<>(map , HttpStatus.NOT_FOUND);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(role -> role.getAuthority())
                .toList();

        UserInfoResponse loginResponse = new UserInfoResponse(
                userDetails.getId() ,userDetails.getUsername() , roles , jwtCookie.toString());

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE ,
                jwtCookie.toString())
                .body(loginResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(
            @Valid @RequestBody SignupRequest signupRequest) {

        String username = signupRequest.getUsername().trim();
        String email = signupRequest.getEmail().trim();

        if (userRepository.existsByUserName(username)) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Username Already Exists!"));
        }

        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Email Already Exists!"));
        }

        User user = new User(
                username,
                email,
                passwordEncoder.encode(signupRequest.getPassword())
        );

        Set<Role> roles = new HashSet<>();
        Set<String> strRoles = signupRequest.getRoles();

        if (strRoles == null || strRoles.isEmpty()) {
            roles.add(roleRepository.findByRoleName(AppRole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Role not found")));
        } else {
            strRoles.forEach(role -> {
                switch (role.toLowerCase()){
                    case "admin":
                        Role adminRole = roleRepository.findByRoleName(AppRole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Role Not Found!"));
                        roles.add(adminRole);
                        break;

                    case "seller":
                        Role sellerRole = roleRepository.findByRoleName(AppRole.ROLE_SELLER)
                                .orElseThrow(() -> new RuntimeException("Role Not Found!"));
                        roles.add(sellerRole);
                        break;

                    default:
                        Role userRole = roleRepository.findByRoleName(AppRole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Role Not Found!"));
                        roles.add(userRole);
                        break;
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(
                new MessageResponse("User Registered Successfully!")
        );
    }
    @GetMapping("/username")
    public String getUsername(Authentication authentication){
        if(authentication!=null) {
            String username = authentication.getName();
            return username;
        }
        else {
            return "NULL";
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserDetails(Authentication authentication){
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(role -> role.getAuthority())
                .toList();

        UserInfoResponse loginResponse = new UserInfoResponse(
                userDetails.getId() ,userDetails.getUsername() , roles);

        return ResponseEntity.ok().body(loginResponse);
    }

    @PostMapping("/signout")
    public ResponseEntity<?> signoutUser(UserDetailsImpl userDetails){
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie(userDetails);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE , cookie.toString())
                .body(new MessageResponse("You have been signed out!"));
    }
}
