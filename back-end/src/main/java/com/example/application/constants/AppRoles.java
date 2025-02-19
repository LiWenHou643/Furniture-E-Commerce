package com.example.application.constants;

public enum AppRoles {
    USER("USER"),
    ADMIN("ADMIN"),
    MANAGER("MANAGER");

    private final String name;

    AppRoles(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public static AppRoles fromName(String name) {
        for (AppRoles role : values()) {
            if (role.name.equalsIgnoreCase(name)) {
                return role;
            }
        }
        throw new IllegalArgumentException("Invalid role: " + name);
    }
}
