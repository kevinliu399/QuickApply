# Use an official Maven image to build the application
FROM maven:3.8.5-openjdk-17-slim AS build

ARG MONGO_DATABASE
ARG MONGO_USER
ARG MONGO_PASSWORD
ARG MONGO_CLUSTER

ENV MONGO_DATABASE=${MONGO_DATABASE}
ENV MONGO_USER=${MONGO_USER}
ENV MONGO_PASSWORD=${MONGO_PASSWORD}
ENV MONGO_CLUSTER=${MONGO_CLUSTER}

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml file to download dependencies
COPY pom.xml .

# Download all necessary dependencies
RUN mvn dependency:go-offline

# Copy the rest of the application source code
COPY src ./src

# Package the application
RUN mvn package -DskipTests

# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the packaged jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port the application will run on
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
