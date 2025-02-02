package com.example.application.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FaviconController {

    @RequestMapping("favicon.ico")
    public void returnFavicon() {
        // Just return a 404 or redirect to an actual favicon if you have one
    }
}

