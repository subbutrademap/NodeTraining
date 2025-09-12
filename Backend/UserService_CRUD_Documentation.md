# UserService CRUD Operations Documentation

## Overview
This document provides comprehensive documentation for the UserService CRUD (Create, Read, Update, Delete) operations implemented in the Node.js backend application. This documentation is designed for training purposes and covers all aspects of user management functionality.

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Database Schema](#database-schema)
3. [Query Utility](#query-utility)
4. [CRUD Operations](#crud-operations)
5. [Error Handling](#error-handling)
6. [Usage Examples](#usage-examples)
7. [Best Practices](#best-practices)

## Architecture Overview

The UserService follows a layered architecture pattern:

```
Controller Layer (API Routes)
    ↓
Service Layer (UserService)
    ↓
Data Access Layer (MySQLDO)
    ↓
Database (MySQL)
```

### Key Components:
- **UserService.js**: Business logic layer containing CRUD operations
- **QueryUtility.js**: Centralized query management
- **MySQLDO.js**: Data access layer for database operations
- **Utility.js**: Helper functions for password hashing and JWT tokens

## Database Schema

### Users Table Structure
```sql
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    userName VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    userRole VARCHAR(50) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Field Descriptions:
- **id**: Primary key, auto-increment
- **firstName**: User's first name (required)
- **lastName**: User's last name (required)
- **userName**: Unique username for login (required)
- **password**: Hashed password (required)
- **phoneNumber**: Contact phone number (required)
- **email**: Unique email address (required)
- **userRole**: User's role/permission level (required)
- **createdAt**: Record creation timestamp
- **updatedAt**: Last update timestamp

## Query Utility

The `QueryUtility.js` file centralizes all database queries for maintainability and consistency.

### Available Queries:
```javascript
const QueryUtility = {
    users: {
        getAllUsers: "SELECT id, firstName, lastName, userName, phoneNumber, email, userRole FROM Users",
        updateUser: "UPDATE Users SET firstName = ?, lastName = ?, userName = ?, phoneNumber = ?, email = ?, userRole = ? WHERE id = ?",
        deleteUser: "DELETE FROM Users WHERE id = ?",
        checkUserExists: "SELECT id FROM Users WHERE id = ?"
    }
};
```

### Benefits of Query Utility:
- **Centralized Management**: All queries in one place
- **Consistency**: Standardized query format
- **Maintainability**: Easy to update queries
- **Reusability**: Queries can be shared across services

## CRUD Operations

### 1. CREATE - User Registration (`addUser`)

**Purpose**: Register a new user in the system

**Method Signature**:
```javascript
async addUser(userPayload)
```

**Parameters**:
- `userPayload` (Object): User data containing:
  - `firstName` (string): User's first name
  - `lastName` (string): User's last name
  - `userName` (string): Unique username
  - `password` (string): Plain text password
  - `phoneNumber` (string): Contact number
  - `email` (string): Email address
  - `userRole` (string): User role

**Process Flow**:
1. Check if username or email already exists
2. Hash the password using bcrypt
3. Insert user data into database
4. Return success/error response

**Return Format**:
```javascript
// Success
{
    error: null,
    message: "User Registered Successfully"
}

// Error (thrown)
"userName already Exists" | "Email already Registered"
```

**Example Usage**:
```javascript
const userData = {
    firstName: "John",
    lastName: "Doe",
    userName: "johndoe",
    password: "password123",
    phoneNumber: "1234567890",
    email: "john@example.com",
    userRole: "user"
};

const result = await userService.addUser(userData);
```

### 2. READ - Get All Users (`getUsers`)

**Purpose**: Retrieve all users from the database

**Method Signature**:
```javascript
async getUsers()
```

**Parameters**: None

**Process Flow**:
1. Execute SELECT query to get all users
2. Return user data (excluding sensitive information like passwords)

**Return Format**:
```javascript
// Success
{
    error: null,
    data: [
        {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            userName: "johndoe",
            phoneNumber: "1234567890",
            email: "john@example.com",
            userRole: "user"
        },
        // ... more users
    ]
}
```

**Example Usage**:
```javascript
const result = await userService.getUsers();
console.log(result.data); // Array of users
```

### 3. UPDATE - Update User (`updateUser`)

**Purpose**: Update an existing user's information

**Method Signature**:
```javascript
async updateUser(userId, userPayload)
```

**Parameters**:
- `userId` (number): ID of the user to update
- `userPayload` (Object): Updated user data

**Process Flow**:
1. Execute UPDATE query with provided data
2. Check if any rows were affected
3. Return appropriate success/error response

**Return Format**:
```javascript
// Success
{
    error: null,
    message: "User updated successfully"
}

// No user found
{
    error: "No user found with the given ID",
    message: null
}
```

**Example Usage**:
```javascript
const userId = 1;
const updatedData = {
    firstName: "Jane",
    lastName: "Smith",
    userName: "janesmith",
    phoneNumber: "0987654321",
    email: "jane@example.com",
    userRole: "admin"
};

const result = await userService.updateUser(userId, updatedData);
```

### 4. DELETE - Delete User (`deleteUser`)

**Purpose**: Remove a user from the system

**Method Signature**:
```javascript
async deleteUser(userId)
```

**Parameters**:
- `userId` (number): ID of the user to delete

**Process Flow**:
1. Check if user exists
2. Execute DELETE query
3. Verify deletion was successful
4. Return appropriate response

**Return Format**:
```javascript
// Success
{
    error: null,
    message: "User deleted successfully"
}

// Error (thrown)
"User not found" | "Failed to delete user"
```

**Example Usage**:
```javascript
const userId = 1;
const result = await userService.deleteUser(userId);
```

### 5. AUTHENTICATION - User Login (`authenticateUser`)

**Purpose**: Authenticate user login credentials

**Method Signature**:
```javascript
async authenticateUser(loginPayload)
```

**Parameters**:
- `loginPayload` (Object): Login credentials
  - `userName` (string): Username
  - `password` (string): Plain text password

**Process Flow**:
1. Find user by username
2. Compare provided password with stored hash
3. Generate JWT token if credentials are valid
4. Return token and user details

**Return Format**:
```javascript
// Success
{
    error: null,
    data: {
        token: "jwt_token_string",
        userDetails: {
            userName: "johndoe",
            firstName: "John",
            lastName: "Doe",
            userRole: "user"
        }
    }
}

// Error (thrown)
"Invalid Password" | "User not found on the system"
```

## Error Handling

### Error Handling Strategy
The UserService implements consistent error handling across all methods:

1. **Try-Catch Blocks**: All methods wrapped in try-catch
2. **Error Propagation**: Errors are thrown to be handled by calling code
3. **Consistent Return Format**: Success/error responses follow standard format
4. **Database Error Handling**: Database errors are caught and re-thrown with context

### Common Error Scenarios:
- **Database Connection Issues**: Network or connection problems
- **Validation Errors**: Invalid input data
- **Duplicate Data**: Username/email already exists
- **Not Found**: User doesn't exist
- **Authentication Failures**: Invalid credentials

### Error Response Format:
```javascript
// Service Level Errors (thrown)
throw new Error("Error message");

// Success/Error Response Format
{
    error: null | "Error message",
    data: resultData | null,
    message: "Success message" | null
}
```

## Usage Examples

### Complete CRUD Example
```javascript
const UserService = require('./UserService');
const userService = new UserService();

async function crudExample() {
    try {
        // CREATE - Add new user
        const newUser = {
            firstName: "Alice",
            lastName: "Johnson",
            userName: "alicej",
            password: "securepass123",
            phoneNumber: "5551234567",
            email: "alice@example.com",
            userRole: "user"
        };
        
        const createResult = await userService.addUser(newUser);
        console.log("Create:", createResult.message);
        
        // READ - Get all users
        const usersResult = await userService.getUsers();
        console.log("Read:", usersResult.data.length, "users found");
        
        // UPDATE - Update user (assuming user ID 1 exists)
        const updateData = {
            firstName: "Alice",
            lastName: "Smith",
            userName: "alicesmith",
            phoneNumber: "5559876543",
            email: "alice.smith@example.com",
            userRole: "admin"
        };
        
        const updateResult = await userService.updateUser(1, updateData);
        console.log("Update:", updateResult.message);
        
        // DELETE - Delete user
        const deleteResult = await userService.deleteUser(1);
        console.log("Delete:", deleteResult.message);
        
    } catch (error) {
        console.error("CRUD Operation Error:", error.message);
    }
}

crudExample();
```

### Authentication Example
```javascript
async function authenticationExample() {
    try {
        const loginData = {
            userName: "johndoe",
            password: "password123"
        };
        
        const authResult = await userService.authenticateUser(loginData);
        console.log("Login successful!");
        console.log("Token:", authResult.data.token);
        console.log("User:", authResult.data.userDetails);
        
    } catch (error) {
        console.error("Authentication failed:", error.message);
    }
}
```

## Best Practices

### 1. Security Best Practices
- **Password Hashing**: Always hash passwords using bcrypt
- **Input Validation**: Validate all input data
- **SQL Injection Prevention**: Use parameterized queries
- **JWT Tokens**: Use secure token generation for authentication

### 2. Code Organization
- **Separation of Concerns**: Keep business logic in service layer
- **Query Centralization**: Use QueryUtility for all database queries
- **Error Handling**: Implement consistent error handling
- **Async/Await**: Use modern async patterns

### 3. Database Best Practices
- **Parameterized Queries**: Prevent SQL injection
- **Connection Management**: Properly manage database connections
- **Transaction Handling**: Use transactions for complex operations
- **Indexing**: Ensure proper database indexing

### 4. API Design
- **Consistent Response Format**: Standardize success/error responses
- **HTTP Status Codes**: Use appropriate status codes
- **Input Validation**: Validate all inputs at API level
- **Documentation**: Maintain up-to-date API documentation

### 5. Testing Considerations
- **Unit Tests**: Test individual methods
- **Integration Tests**: Test database interactions
- **Error Scenarios**: Test error handling paths
- **Mock Data**: Use mock data for testing

## Common Pitfalls and Solutions

### 1. Password Security
**Problem**: Storing plain text passwords
**Solution**: Always hash passwords using bcrypt before storing

### 2. SQL Injection
**Problem**: Concatenating user input into SQL queries
**Solution**: Use parameterized queries with placeholders

### 3. Error Handling
**Problem**: Not handling database errors properly
**Solution**: Implement comprehensive try-catch blocks

### 4. Connection Management
**Problem**: Not closing database connections
**Solution**: Use connection pooling and proper cleanup

### 5. Input Validation
**Problem**: Not validating user input
**Solution**: Validate all inputs before processing

## Conclusion

This UserService implementation provides a solid foundation for user management in a Node.js application. The CRUD operations are well-structured, secure, and follow best practices for database interactions and error handling.

Key takeaways for students:
1. **Layered Architecture**: Separate concerns into different layers
2. **Security First**: Always prioritize security in user management
3. **Error Handling**: Implement robust error handling
4. **Code Organization**: Keep code clean and maintainable
5. **Testing**: Write comprehensive tests for all operations

This documentation serves as a comprehensive guide for understanding and implementing CRUD operations in a Node.js backend application.
