# Help Desk System API Documentation

## Base URL
`http://localhost:3000/api` (development environment)

## Authentication
This API uses JWT (JSON Web Token) authentication. For protected endpoints, include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling
All endpoints return a consistent error format:

```json
{
  "success": false,
  "message": "Error description"
}
```

## User Roles
- `admin`: Full access to all features
- `agent`: Access to handle tickets and limited user management
- `client`: Basic access to create and view their own tickets

## Endpoints

### Authentication

#### Register User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Auth Required**: No
- **Description**: Register a new user
- **Request Body**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "message": "User registered successfully.",
    "data": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "client",
      "createdAt": "2025-04-14T12:00:00.000Z",
      "updatedAt": "2025-04-14T12:00:00.000Z"
    }
  }
  ```

#### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Auth Required**: No
- **Description**: Authenticate user and get token
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "message": "Login successful.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "client",
      "createdAt": "2025-04-14T12:00:00.000Z",
      "updatedAt": "2025-04-14T12:00:00.000Z"
    }
  }
  ```

#### Get Current User
- **URL**: `/auth/me`
- **Method**: `GET`
- **Auth Required**: Yes
- **Description**: Get current user info
- **Response**: 
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "client",
      "createdAt": "2025-04-14T12:00:00.000Z",
      "updatedAt": "2025-04-14T12:00:00.000Z"
    }
  }
  ```

### Users

#### Get All Users
- **URL**: `/users`
- **Method**: `GET`
- **Auth Required**: Yes (Admin only)
- **Description**: Get list of all users
- **Response**: 
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "firstName": "Admin",
        "lastName": "User",
        "email": "admin@example.com",
        "role": "admin",
        "createdAt": "2025-04-14T12:00:00.000Z",
        "updatedAt": "2025-04-14T12:00:00.000Z"
      },
      {
        "id": 2,
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "role": "client",
        "createdAt": "2025-04-14T12:00:00.000Z",
        "updatedAt": "2025-04-14T12:00:00.000Z"
      }
    ]
  }
  ```

#### Get User by ID
- **URL**: `/users/:id`
- **Method**: `GET`
- **Auth Required**: Yes (Admin can access any user, others can only access themselves)
- **URL Parameters**: `id=[integer]` User ID
- **Description**: Get user details by ID
- **Response**: 
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "client",
      "createdAt": "2025-04-14T12:00:00.000Z",
      "updatedAt": "2025-04-14T12:00:00.000Z",
      "Teams": [
        {
          "id": 1,
          "name": "Support Team",
          "description": "Main support team",
          "createdAt": "2025-04-14T12:00:00.000Z",
          "updatedAt": "2025-04-14T12:00:00.000Z",
          "UserTeams": {
            "createdAt": "2025-04-14T12:00:00.000Z",
            "updatedAt": "2025-04-14T12:00:00.000Z",
            "UserId": 1,
            "TeamId": 1
          }
        }
      ]
    }
  }
  ```

#### Create User
- **URL**: `/users`
- **Method**: `POST`
- **Auth Required**: Yes (Admin only)
- **Description**: Create a new user
- **Request Body**:
  ```json
  {
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "password": "securepassword",
    "role": "agent"
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "message": "User created successfully.",
    "data": {
      "id": 3,
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane@example.com",
      "role": "agent",
      "createdAt": "2025-04-14T12:00:00.000Z",
      "updatedAt": "2025-04-14T12:00:00.000Z"
    }
  }
  ```

#### Update User
- **URL**: `/users/:id`
- **Method**: `PUT`
- **Auth Required**: Yes (Admin can update any user, others can only update themselves)
- **URL Parameters**: `id=[integer]` User ID
- **Description**: Update user details
- **Request Body**:
  ```json
  {
    "firstName": "Jane",
    "lastName": "Johnson",
    "email": "jane.johnson@example.com"
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "message": "User updated successfully.",
    "data": {
      "id": 3,
      "firstName": "Jane",
      "lastName": "Johnson",
      "email": "jane.johnson@example.com",
      "role": "agent",
      "createdAt": "2025-04-14T12:00:00.000Z",
      "updatedAt": "2025-04-14T12:30:00.000Z"
    }
  }
  ```

#### Delete User
- **URL**: `/users/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes (Admin only)
- **URL Parameters**: `id=[integer]` User ID
- **Description**: Delete a user
- **Response**: 
  ```json
  {
    "success": true,
    "message": "User deleted successfully."
  }
  ```

### Teams

#### Get All Teams
- **URL**: `/teams`
- **Method**: `GET`
- **Auth Required**: Yes
- **Description**: Get list of all teams
- **Response**: 
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "name": "Support Team",
        "description": "Main support team",
        "createdAt": "2025-04-14T12:00:00.000Z",
        "updatedAt": "2025-04-14T12:00:00.000Z",
        "Users": [
          {
            "id": 1,
            "firstName": "John",
            "lastName": "Doe",
            "email": "john@example.com",
            "role": "agent",
            "UserTeams": {
              "createdAt": "2025-04-14T12:00:00.000Z",
              "updatedAt": "2025-04-14T12:00:00.000Z",
              "UserId": 1,
              "TeamId": 1
            }
          }
        ]
      }
    ]
  }
  ```

#### Get Team by ID
- **URL**: `/teams/:id`
- **Method**: `GET`
- **Auth Required**: Yes
- **URL Parameters**: `id=[integer]` Team ID
- **Description**: Get team details by ID
- **Response**: 
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "name": "Support Team",
      "description": "Main support team",
      "createdAt": "2025-04-14T12:00:00.000Z",
      "updatedAt": "2025-04-14T12:00:00.000Z",
      "Users": [
        {
          "id": 1,
          "firstName": "John",
          "lastName": "Doe",
          "email": "john@example.com",
          "role": "agent",
          "UserTeams": {
            "createdAt": "2025-04-14T12:00:00.000Z",
            "updatedAt": "2025-04-14T12:00:00.000Z",
            "UserId": 1,
            "TeamId": 1
          }
        }
      ]
    }
  }
  ```

#### Create Team
- **URL**: `/teams`
- **Method**: `POST`
- **Auth Required**: Yes (Admin only)
- **Description**: Create a new team
- **Request Body**:
  ```json
  {
    "name": "Technical Support",
    "description": "Team for technical issues",
    "userIds": [1, 3]
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "message": "Team created successfully.",
    "data": {
      "id": 2,
      "name": "Technical Support",
      "description": "Team for technical issues",
      "createdAt": "2025-04-14T13:00:00.000Z",
      "updatedAt": "2025-04-14T13:00:00.000Z",
      "Users": [
        {
          "id": 1,
          "firstName": "John",
          "lastName": "Doe",
          "email": "john@example.com",
          "role": "agent"
        },
        {
          "id": 3,
          "firstName": "Jane",
          "lastName": "Johnson",
          "email": "jane.johnson@example.com",
          "role": "agent"
        }
      ]
    }
  }
  ```

#### Update Team
- **URL**: `/teams/:id`
- **Method**: `PUT`
- **Auth Required**: Yes (Admin only)
- **URL Parameters**: `id=[integer]` Team ID
- **Description**: Update team details
- **Request Body**:
  ```json
  {
    "name": "Technical Support Team",
    "description": "Team handling all technical support issues",
    "userIds": [3, 4]
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "message": "Team updated successfully.",
    "data": {
      "id": 2,
      "name": "Technical Support Team",
      "description": "Team handling all technical support issues",
      "createdAt": "2025-04-14T13:00:00.000Z",
      "updatedAt": "2025-04-14T13:30:00.000Z",
      "Users": [
        {
          "id": 3,
          "firstName": "Jane",
          "lastName": "Johnson",
          "email": "jane.johnson@example.com",
          "role": "agent"
        },
        {
          "id": 4,
          "firstName": "Mike",
          "lastName": "Wilson",
          "email": "mike@example.com",
          "role": "agent"
        }
      ]
    }
  }
  ```

#### Delete Team
- **URL**: `/teams/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes (Admin only)
- **URL Parameters**: `id=[integer]` Team ID
- **Description**: Delete a team
- **Response**: 
  ```json
  {
    "success": true,
    "message": "Team deleted successfully."
  }
  ```
