# Quickapply

## Introduction

**Quickapply** is a web application designed to help users keep track of their job applications. With Quickapply, users can easily manage details such as job title, company name, application status, important dates, and more. The application also supports user authentication and registration to ensure each user's data is secure and unique.


## Features

- **Application Tracking**: Keep track of job titles, company names, application statuses, add custom notes/descriptions, important dates, and tags for better usability and filtering.
- **User Authentication and Registration**: Ensure security and unique job tracking for each user.
- **Common Links Storage**: Store and easily access common links for GitHub, LinkedIn, email, and others for easy copy-pasting.

## Tech Stack

- **Backend**: SpringBoot
- **Frontend**: React, Typescript
- **Database**: MongoDB (hosted on MongoDB Atlas)
- **Containerization**: Docker
- **Hosting**: AWS EC2 instance

## Installation

### Prerequisites
- Java JDK
- Node.js
- Docker
- MongoDB Atlas account
- AWS EC2 instance

### Backend

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/quickapply-backend.git
   cd quickapply-backend
   ```

2. Build the SpringBoot application:
   ```sh
   ./mvnw clean install
   ```

3. Run the Docker container:
   ```sh
   docker build -t quickapply-backend .
   docker run -p 8080:8080 quickapply-backend
   ```

### Frontend

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/quickapply-frontend.git
   cd quickapply-frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the application:
   ```sh
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` or visit the website.
2. Register a new user account or log in with existing credentials.
3. Start adding your job applications and manage them efficiently!

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. You can look at the list of open issues or create your own

---
