# Quiz Application

## Overview

The Quiz Application is a web-based platform for managing quiz questions and their multiple-choice options. It allows users to:

- **Create Quiz Questions**: Add new quiz questions along with multiple-choice options.
- **Fetch Quiz Questions**: Retrieve all existing quiz questions and their associated options.
- **Delete Quiz Questions**: Remove quiz questions and their options from the database.

## API Endpoints

### Authentication

- **POST /auth/register**
  - Register a new user.

- **POST /auth/login**
  - Log in a user and receive a JWT token.

- **GET /auth/profile**
  - Get user profile information (requires JWT token in the `Authorization` header).

### Quiz Questions

- **POST /questions**
  - Create a new quiz question with options.

- **GET /questions**
  - Fetch all quiz questions with their options.

- **DELETE /questions/:id**
  - Delete a quiz question and its options by ID.
  - Replace `:id` with the ID of the question to delete.

## Error Handling

Errors are handled by middleware. In case of invalid input or server errors, appropriate HTTP status codes and error messages are returned.


