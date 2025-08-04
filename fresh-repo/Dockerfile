# Build stage
FROM maven:3.8.7-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code and resources
COPY src/ /app/src/

# Build the application
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the built JAR file
COPY --from=build /app/target/*.jar app.jar

# Environment variables will be injected by Kubernetes

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
