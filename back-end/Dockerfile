# Use an Alpine-based OpenJDK 21 image
FROM eclipse-temurin:21-jdk-alpine

# Set working directory inside the container
WORKDIR /app

# Copy the Spring Boot jar file
COPY target/*.jar app.jar

# Expose the default port
EXPOSE 8080

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
