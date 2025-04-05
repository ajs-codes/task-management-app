- [Task Management App](#task-management-app)
  - [Overview](#overview)
  - [Features](#features)
  - [Documentation for Local Setup and Demo](#documentation-for-local-setup-and-demo)

## Task Management App

This repository contains a Task Management Application built with a split project structure including separate folders for the Frontend and Backend.

### Overview

The goal of this project is to create a Task Management Application that allows users to manage their tasks efficiently. It consists of:

- Backend: A RESTful API built using Node.js and a database (SQL) to handle CRUD operations on tasks.

- Frontend: A React.js application that provides a user interface to interact with the API.

The project was designed to be completed within a maximum of 2 days, focusing on core functionalities including user authentication, task categorization, and task status tracking.

### Features

- User Authentication: Backend provides registration and login endpoints with JWT; Frontend offers login/registration forms with validation.

- Task CRUD Operations: Backend RESTful API handles create, read, update, and delete for tasks; Frontend displays a dashboard for managing tasks.

- Task Data Management: Backend defines detailed user and task schemas; Frontend renders task details including name, description, dates, and status.

- Pagination & Filtering: Backend supports pagination and filtering of tasks; Frontend includes a paginated dashboard and a search bar for filtering by title or status.

- Error Handling & Validation: Backend implements comprehensive error handling and input validation; Frontend enforces form validations for a smooth user experience.

### Documentation for Local Setup and Demo

For more detailed information about local setup and demo, please refer to the individual README files in the following directories:

[Backend](./backend/README.md)
[Frontend](./frontend/README.md)
