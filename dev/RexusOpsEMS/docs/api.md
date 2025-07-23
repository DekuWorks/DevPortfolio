# RexusOpsEMS API Documentation

## Overview
The RexusOpsEMS API provides emergency management system functionality including incident management, responder coordination, and equipment tracking.

## Base URL
- Development: `https://localhost:5001`
- Production: `https://api.rexusops360.com`

## Authentication
The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### Login
**POST** `/api/auth/login`

Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "admin",
  "role": "Admin",
  "tenantId": "tampa-fl",
  "expiresAt": "2024-12-09T20:00:00Z"
}
```

**Response (401 Unauthorized):**
```json
{
  "message": "Invalid credentials"
}
```

#### Register
**POST** `/api/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "username": "newuser",
  "password": "securepassword123",
  "role": "Dispatcher",
  "tenantId": "tampa-fl",
  "fullName": "John Doe",
  "email": "john@rexusops360.com"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "newuser",
  "role": "Dispatcher",
  "tenantId": "tampa-fl",
  "expiresAt": "2024-12-09T20:00:00Z"
}
```

#### Get Current User
**GET** `/api/auth/me`

Get information about the currently authenticated user.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
{
  "id": 1,
  "username": "admin",
  "role": "Admin",
  "tenantId": "tampa-fl",
  "fullName": "System Administrator",
  "email": "admin@rexusops360.com",
  "lastLoginAt": "2024-12-09T12:00:00Z"
}
```

### Incidents Management

#### Get All Incidents
**GET** `/api/incidents`

Retrieve all incidents in the system.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
{
  "incidents": [
    {
      "id": 1,
      "type": "Medical Emergency",
      "location": "123 Main St, Tampa, FL",
      "description": "Patient experiencing chest pain",
      "priority": "High",
      "status": "Active",
      "reportedAt": "2024-12-09T12:00:00Z",
      "assignedResponders": [1, 2],
      "equipment": [1, 3]
    }
  ],
  "count": 1
}
```

#### Get Incident by ID
**GET** `/api/incidents/{id}`

Retrieve a specific incident by its ID.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Parameters:**
- `id` (path): The incident ID

**Response (200 OK):**
```json
{
  "id": 1,
  "type": "Medical Emergency",
  "location": "123 Main St, Tampa, FL",
  "description": "Patient experiencing chest pain",
  "priority": "High",
  "status": "Active",
  "reportedAt": "2024-12-09T12:00:00Z",
  "assignedResponders": [1, 2],
  "equipment": [1, 3]
}
```

**Response (404 Not Found):**
```json
{
  "error": "Incident not found"
}
```

#### Create Incident
**POST** `/api/incidents`

Create a new incident (Admin and Dispatcher roles only).

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "type": "Medical Emergency",
  "location": "123 Main St, Tampa, FL",
  "description": "Patient experiencing chest pain",
  "priority": "High",
  "status": "Active",
  "assignedResponders": [1, 2],
  "equipment": [1, 3]
}
```

**Response (201 Created):**
```json
{
  "message": "Incident created successfully",
  "incident": {
    "id": 1,
    "type": "Medical Emergency",
    "location": "123 Main St, Tampa, FL",
    "description": "Patient experiencing chest pain",
    "priority": "High",
    "status": "Active",
    "reportedAt": "2024-12-09T12:00:00Z",
    "assignedResponders": [1, 2],
    "equipment": [1, 3]
  }
}
```

#### Update Incident
**PUT** `/api/incidents/{id}`

Update an existing incident (Admin and Dispatcher roles only).

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Parameters:**
- `id` (path): The incident ID

**Request Body:**
```json
{
  "type": "Medical Emergency",
  "location": "123 Main St, Tampa, FL",
  "description": "Patient experiencing chest pain - updated",
  "priority": "Medium",
  "status": "Resolved",
  "assignedResponders": [1, 2],
  "equipment": [1, 3]
}
```

**Response (200 OK):**
```json
{
  "message": "Incident updated successfully",
  "incident": {
    "id": 1,
    "type": "Medical Emergency",
    "location": "123 Main St, Tampa, FL",
    "description": "Patient experiencing chest pain - updated",
    "priority": "Medium",
    "status": "Resolved",
    "reportedAt": "2024-12-09T12:00:00Z",
    "assignedResponders": [1, 2],
    "equipment": [1, 3]
  }
}
```

#### Delete Incident
**DELETE** `/api/incidents/{id}`

Delete an incident (Admin role only).

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Parameters:**
- `id` (path): The incident ID

**Response (200 OK):**
```json
{
  "message": "Incident deleted successfully"
}
```

### Responders Management

#### Get All Responders
**GET** `/api/responders`

Retrieve all responders in the system.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "John Smith",
    "role": "EMT",
    "status": "Available",
    "location": "Tampa Station 1",
    "contactNumber": "+1234567890"
  }
]
```

### Equipment Management

#### Get All Equipment
**GET** `/api/equipment`

Retrieve all equipment in the system.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Ambulance 1",
    "type": "Vehicle",
    "status": "Available",
    "location": "Tampa Station 1",
    "lastMaintenance": "2024-12-01T00:00:00Z"
  }
]
```

### Dashboard

#### Get Dashboard Data
**GET** `/api/dashboard`

Retrieve dashboard statistics and overview data.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
{
  "totalIncidents": 15,
  "activeIncidents": 3,
  "availableResponders": 8,
  "availableEquipment": 12,
  "recentActivity": [
    {
      "type": "Incident Created",
      "description": "Medical emergency at 123 Main St",
      "timestamp": "2024-12-09T12:00:00Z"
    }
  ]
}
```

### Health Check

#### Get System Health
**GET** `/api/health`

Check the health status of the API.

**Response (200 OK):**
```json
{
  "status": "Healthy",
  "timestamp": "2024-12-09T12:00:00Z",
  "version": "1.0.0"
}
```

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

## User Roles

- **Admin**: Full system access
- **Dispatcher**: Can create and manage incidents
- **Responder**: Can view assigned incidents and equipment

## Security Features

- JWT-based authentication
- Role-based access control
- Password hashing using SHA256
- CORS protection
- Authorization headers required for protected endpoints

## Rate Limiting
Currently, no rate limiting is implemented. Future versions will include rate limiting to prevent abuse.

## Data Storage
Currently using in-memory storage for demonstration purposes. Production implementation will use a proper database. 