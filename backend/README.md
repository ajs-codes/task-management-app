### Task Management API Backend

- [Task Management API Backend](#task-management-api-backend)
  - [1. Overview](#1-overview)
  - [2. Features](#2-features)
  - [3. Prerequisites](#3-prerequisites)
  - [4. Environment Variables](#4-environment-variables)
  - [5. Setup Instructions](#5-setup-instructions)
  - [6. Local Tools and Setup](#6-local-tools-and-setup)
  - [7. Additional Notes](#7-additional-notes)

#### 1. Overview

This project is the backend for a Task Management API built with Node.js, Express.js, and Sequelize (with PostgreSQL). It includes features such as user authentication (JWT), task CRUD operations, input validation (using express-validator), and logging (with morgan).

#### 2. Features

- RESTful API for task management.
- User authentication and authorization using JWT.
- Input validations on request bodies, query parameters, and route parameters.
- Pagination and filtering for task listings.
- Secure CORS configuration to restrict access to the frontend.
- Logging of HTTP requests.

#### 3. Prerequisites

- **Node.js** (v14 or higher)
- **PostgreSQL** (installed and running locally)
- **npm** (Node Package Manager)
- **Git** (for version control)
- **Postman** (or any API testing tool)

#### 4. Environment Variables

Create a `.env` file in the root of the backend directory with the following variables:

    PORT=5000
    DB_HOST=localhost
    DB_NAME=your_database_name
    DB_USER=your_database_username
    DB_PASS=your_database_password
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES_IN=1h
    FRONTEND_URL=http://localhost:5173 (if you are running the frontend in local using vite)

#### 5. Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd task-management-app/backend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Database Setup:**

- Ensure PostgreSQL is installed and running on your machine.

- Create a PostgreSQL database with the name specified in the .env file (DB_NAME).

- The application uses Sequelize to sync models with the database automatically. If you prefer migrations, set them up accordingly.

4. **Run the Server:**

   For development with auto-reloading:

   ```bash
    npm run dev
   ```

   Or to run normally:

   ```bash
   npm start
   ```

5. **Test the API:**

Use Postman or a similar API testing tool to verify endpoints:

- Base URL: http://localhost:5000/api

- Authentication endpoints: /auth/register and /auth/login

- Task endpoints: /tasks

#### 6. Local Tools and Setup

- Node.js & npm: For running the backend server and managing dependencies.

- PostgreSQL: For storing application data.

- Postman: For testing API endpoints.

- Git: For source control.

#### 7. Additional Notes

- The project follows the MVC pattern to keep the codebase modular and maintainable.

- Logging is implemented with morgan to track incoming HTTP requests.

- Future enhancements might include API documentation (using tools like Swagger) and automated testing.
