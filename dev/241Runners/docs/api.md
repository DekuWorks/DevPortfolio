# 241Runners API Documentation

## Overview
The 241Runners API provides authentication, user management, and individual tracking functionality for the 241 Runners Awareness platform.

## Base URL
- Development: `https://localhost:5001`
- Production: `https://api.241runnersawareness.org`

## Authentication
The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### Register User
**POST** `/api/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "phoneNumber": "+1234567890",
  "fullName": "John Doe",
  "role": "user",
  "relationshipToRunner": "parent",
  "address": "123 Main St",
  "city": "Anytown",
  "state": "CA",
  "zipCode": "12345",
  "emergencyContactName": "Jane Doe",
  "emergencyContactPhone": "+1234567891",
  "emergencyContactRelationship": "spouse",
  "individual": {
    "fullName": "Child Doe",
    "dateOfBirth": "2010-01-01",
    "gender": "male",
    "emergencyContact": {
      "name": "Jane Doe",
      "phone": "+1234567891"
    }
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Registration successful. Please check your email and phone for verification codes.",
  "user": {
    "userId": "guid",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "user",
    "emailVerified": false,
    "phoneVerified": false
  },
  "requiresVerification": true
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "User with this email already exists."
}
```

#### Login
**POST** `/api/auth/login`

Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": "guid",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "user",
    "emailVerified": true,
    "phoneVerified": true
  },
  "requiresVerification": false
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Invalid email or password."
}
```

#### Google Login
**POST** `/api/auth/google-login`

Authenticate using Google OAuth.

**Request Body:**
```json
{
  "idToken": "google-id-token-here"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Google login successful.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": "guid",
    "email": "user@gmail.com",
    "fullName": "John Doe",
    "role": "user"
  }
}
```

#### Verify Email
**POST** `/api/auth/verify-email`

Verify email address with verification token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "token": "verification-token-here"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Email verified successfully."
}
```

#### Verify Phone
**POST** `/api/auth/verify-phone`

Verify phone number with SMS code.

**Request Body:**
```json
{
  "phoneNumber": "+1234567890",
  "code": "123456"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Phone verified successfully."
}
```

#### Resend Verification
**POST** `/api/auth/resend-verification`

Resend verification codes via email and SMS.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Verification codes sent successfully."
}
```

### Individuals Management

#### Get All Individuals
**GET** `/api/individual`

Retrieve all individuals in the system.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
[
  {
    "individualId": "guid",
    "fullName": "Child Doe",
    "dateOfBirth": "2010-01-01T00:00:00Z",
    "gender": "male",
    "dateAdded": "2024-12-09T12:00:00Z",
    "emergencyContacts": [
      {
        "name": "Jane Doe",
        "phone": "+1234567891"
      }
    ]
  }
]
```

#### Create Individual
**POST** `/api/individual`

Create a new individual record.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "fullName": "Child Doe",
  "dateOfBirth": "2010-01-01",
  "gender": "male",
  "emergencyContacts": [
    {
      "name": "Jane Doe",
      "phone": "+1234567891"
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "individualId": "guid",
  "fullName": "Child Doe",
  "dateOfBirth": "2010-01-01T00:00:00Z",
  "gender": "male",
  "dateAdded": "2024-12-09T12:00:00Z",
  "emergencyContacts": [
    {
      "name": "Jane Doe",
      "phone": "+1234567891"
    }
  ]
}
```

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid or missing token |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

## User Roles

- **user**: Standard user account
- **parent**: Parent of a runner
- **coach**: Running coach
- **medical**: Medical professional
- **admin**: System administrator

## Security Features

- JWT-based authentication
- Password hashing using bcrypt
- Email and phone verification
- Google OAuth integration
- Role-based access control
- CORS protection

## Rate Limiting
Currently, no rate limiting is implemented. Future versions will include rate limiting to prevent abuse.

## Third-Party Services
- **SendGrid**: Email delivery service
- **Twilio**: SMS delivery service
- **Google OAuth**: Authentication service 