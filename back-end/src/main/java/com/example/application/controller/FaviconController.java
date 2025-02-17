package com.example.application.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FaviconController {

	@GetMapping("favicon.ico")
	public void returnFavicon() {
		// Just return a 404 or redirect to an actual favicon if you have one
	}
}
