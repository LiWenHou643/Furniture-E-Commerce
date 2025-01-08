package com.example.application.constants;

import lombok.Getter;

@Getter
public enum ShipmentMethod {
    STANDARD("standard",5),
    EXPRESS("express",3);

    private final String name;
    private final int days;

    // Constructor to set display name and delivery days
    ShipmentMethod(String displayName, int deliveryDays) {
        this.name = displayName;
        this.days = deliveryDays;
    }

    // Method to adjust delivery time based on location (shipping zone)
    public int getAdjustedDeliveryDays(String zone) {
        // This is where you can implement the logic to adjust delivery time based on zones
        int adjustedDays = this.days;

        // Adjust based on zones
        switch (zone.toUpperCase()) {
            case "ZONE_1":
                // For nearby zones, delivery might be faster
                adjustedDays = this.days - 1; // 1 day less for Zone_1
                break;
            case "ZONE_2":
                // For distant zones, delivery might take longer
                adjustedDays = this.days + 2; // 2 extra days for Zone_2
                break;
            case "ZONE_3":
                // For remote zones, delivery might take much longer
                adjustedDays = this.days + 4; // 4 extra days for Zone_3
                break;
            default:
                break;
        }
        return Math.max(adjustedDays, 1);  // Ensure delivery time is at least 1 day
    }
}
