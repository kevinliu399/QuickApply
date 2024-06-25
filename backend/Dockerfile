FROM maven:3.8.1-openjdk-11 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package

FROM openjdk:11-jre-slim

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

RUN apt-get update && apt-get install -y \
    mongodb-clients && \
    rm -rf /var/lib/apt/lists/*

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]

