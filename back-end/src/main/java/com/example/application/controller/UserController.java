//package com.example.application.controller;
//
//import com.example.application.dto.request.UpdateProfileRequest;
//import com.example.application.dto.response.ApiResponse;
//import com.example.application.dto.response.PersonResponse;
//import lombok.AccessLevel;
//import lombok.RequiredArgsConstructor;
//import lombok.experimental.FieldDefaults;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequiredArgsConstructor
//@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
//@RequestMapping("/user")
//public class UserController {
//
//    PersonService personService;
//
//    @GetMapping
//    @PreAuthorize("hasAuthority('SCOPE_USER')")
//    public ApiResponse<PersonResponse> getUser() {
//        String username = SecurityContextHolder.getContext().getAuthentication().getName();
//        var response = personService.getPersonByEmail(username);
//        return ApiResponse.<PersonResponse>builder().message("User get successfully").data(response).build();
//    }
//
//    @PutMapping(value = "/update")
//    @PreAuthorize("hasAuthority('SCOPE_USER')")
//    public ApiResponse<PersonResponse> updateUser(@RequestBody UpdateProfileRequest request) {
//        String username = SecurityContextHolder.getContext().getAuthentication().getName();
//        var response = personService.updatePerson(username, request);
//        return ApiResponse.<PersonResponse>builder().message("User get successfully").data(response).build();
//    }
//}