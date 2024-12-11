package com.example.application.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/admin")
public class AdminController {

}