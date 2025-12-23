# Kronus CRM API Documentation

Base URL: `http://localhost:5000/api`

## Table of Contents
- [Authentication](#authentication)
- [Users](#users)
- [Leads](#leads)
- [Error Handling](#error-handling)

---

## Authentication

### Register User
**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass@123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "USER",
      "isActive": true
    },
    "token": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

---

### Login
**POST** `/auth/login`

Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass@123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "USER"
    },
    "token": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

---

### Get Current User
**GET** `/auth/me`

Get authenticated user's information.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER",
    "department": "Sales"
  }
}
```

---

### Forgot Password
**POST** `/auth/forgot-password`

Request password reset email.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

---

### Reset Password
**PUT** `/auth/reset-password/:token`

Reset password using token from email.

**Request Body:**
```json
{
  "password": "NewSecurePass@123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

---

### Change Password
**PUT** `/auth/change-password`

Change password for authenticated user.

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "currentPassword": "OldPass@123",
  "newPassword": "NewPass@123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## Users

### Get User Profile
**GET** `/users/profile`

Get current user's profile.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "role": "USER",
    "department": "Sales",
    "designation": "Sales Rep"
  }
}
```

---

### Update User Profile
**PUT** `/users/profile`

Update current user's profile.

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "department": "Marketing",
  "designation": "Marketing Manager"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

---

### Get All Users
**GET** `/users`

Get all users with pagination and filters. (Admin/Manager only)

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search term
- `role`: Filter by role (SUPER_ADMIN, ADMIN, MANAGER, USER)
- `isActive`: Filter by active status (true/false)
- `sortBy`: Sort field (default: createdAt)
- `sortOrder`: Sort order (asc/desc, default: desc)

**Example:**
```
GET /users?page=1&limit=10&role=USER&search=john
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user_id",
        "email": "user@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "role": "USER"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 10
    }
  }
}
```

---

### Get User by ID
**GET** `/users/:id`

Get specific user by ID. (Admin/Manager only)

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER",
    "_count": {
      "createdLeads": 10,
      "assignedLeads": 5
    }
  }
}
```

---

### Create User
**POST** `/users`

Create new user. (Admin only)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "firstName": "Jane",
  "lastName": "Smith",
  "phone": "+1234567890",
  "role": "USER",
  "department": "Sales",
  "designation": "Sales Representative"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User created successfully. Welcome email sent with temporary password.",
  "data": {
    "id": "user_id",
    "email": "newuser@example.com",
    "firstName": "Jane",
    "lastName": "Smith",
    "role": "USER"
  }
}
```

---

### Update User
**PUT** `/users/:id`

Update user information. (Admin only)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "MANAGER",
  "isActive": true
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "role": "MANAGER"
  }
}
```

---

### Delete User
**DELETE** `/users/:id`

Deactivate user. (Admin only)

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

### Get User Statistics
**GET** `/users/stats`

Get user statistics. (Admin/Manager only)

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalUsers": 50,
    "activeUsers": 45,
    "inactiveUsers": 5,
    "usersByRole": {
      "SUPER_ADMIN": 1,
      "ADMIN": 5,
      "MANAGER": 10,
      "USER": 34
    }
  }
}
```

---

## Leads

### Get All Leads
**GET** `/leads`

Get all leads with pagination and filters.

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search term
- `status`: Filter by status (NEW, CONTACTED, QUALIFIED, etc.)
- `priority`: Filter by priority (LOW, MEDIUM, HIGH, URGENT)
- `source`: Filter by source (WEBSITE, REFERRAL, etc.)
- `assignedToId`: Filter by assigned user
- `createdById`: Filter by creator
- `startDate`: Filter by creation date start
- `endDate`: Filter by creation date end
- `sortBy`: Sort field (default: createdAt)
- `sortOrder`: Sort order (asc/desc, default: desc)

**Example:**
```
GET /leads?page=1&limit=10&status=NEW&priority=HIGH
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "leads": [
      {
        "id": "lead_id",
        "firstName": "John",
        "lastName": "Customer",
        "email": "customer@example.com",
        "phone": "+1234567890",
        "company": "Company Inc",
        "status": "NEW",
        "priority": "HIGH",
        "estimatedValue": 50000,
        "createdBy": {
          "id": "user_id",
          "firstName": "Agent",
          "lastName": "Name"
        },
        "assignedTo": {
          "id": "user_id",
          "firstName": "Sales",
          "lastName": "Rep"
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 100,
      "itemsPerPage": 10
    }
  }
}
```

---

### Get Lead by ID
**GET** `/leads/:id`

Get specific lead with activities.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "lead_id",
    "firstName": "John",
    "lastName": "Customer",
    "email": "customer@example.com",
    "phone": "+1234567890",
    "company": "Company Inc",
    "status": "NEW",
    "priority": "HIGH",
    "estimatedValue": 50000,
    "notes": "Interested in enterprise plan",
    "createdBy": {
      "id": "user_id",
      "firstName": "Agent",
      "lastName": "Name"
    },
    "activities": [
      {
        "id": "activity_id",
        "type": "CALL",
        "title": "Follow-up call",
        "description": "Discussed requirements",
        "date": "2024-01-15T10:00:00Z"
      }
    ]
  }
}
```

---

### Create Lead
**POST** `/leads`

Create new lead.

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Customer",
  "email": "customer@example.com",
  "phone": "+1234567890",
  "company": "Company Inc",
  "position": "CEO",
  "source": "WEBSITE",
  "status": "NEW",
  "priority": "HIGH",
  "estimatedValue": 50000,
  "notes": "Interested in enterprise plan",
  "assignedToId": "user_id",
  "city": "New York",
  "country": "USA"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "id": "lead_id",
    "firstName": "John",
    "lastName": "Customer",
    "email": "customer@example.com",
    "status": "NEW"
  }
}
```

---

### Update Lead
**PUT** `/leads/:id`

Update lead information.

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "status": "CONTACTED",
  "priority": "URGENT",
  "notes": "Updated after first call",
  "estimatedValue": 75000
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Lead updated successfully",
  "data": {
    "id": "lead_id",
    "status": "CONTACTED",
    "priority": "URGENT"
  }
}
```

---

### Delete Lead
**DELETE** `/leads/:id`

Delete lead. (Admin only)

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Lead deleted successfully"
}
```

---

### Assign Lead
**PUT** `/leads/:id/assign`

Assign lead to user. (Admin/Manager only)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "assignedToId": "user_id"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Lead assignment updated successfully",
  "data": {
    "id": "lead_id",
    "assignedTo": {
      "id": "user_id",
      "firstName": "Sales",
      "lastName": "Rep"
    }
  }
}
```

---

### Get Lead Statistics
**GET** `/leads/stats`

Get lead statistics and analytics.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalLeads": 100,
    "totalEstimatedValue": 5000000,
    "leadsByStatus": {
      "NEW": 20,
      "CONTACTED": 30,
      "QUALIFIED": 15,
      "PROPOSAL": 10,
      "WON": 15,
      "LOST": 10
    },
    "leadsByPriority": {
      "LOW": 10,
      "MEDIUM": 40,
      "HIGH": 35,
      "URGENT": 15
    },
    "leadsBySource": {
      "WEBSITE": 40,
      "REFERRAL": 30,
      "SOCIAL_MEDIA": 20,
      "EMAIL_CAMPAIGN": 10
    }
  }
}
```

---

## Error Handling

All errors follow this format:

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "Error message"
    }
  ]
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `429` - Too Many Requests (Rate Limited)
- `500` - Internal Server Error

### Common Error Examples

**Validation Error (422):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "email": "Please provide a valid email address"
    },
    {
      "password": "Password must be at least 8 characters long"
    }
  ]
}
```

**Unauthorized (401):**
```json
{
  "success": false,
  "message": "Not authorized to access this route. Please login."
}
```

**Forbidden (403):**
```json
{
  "success": false,
  "message": "User role 'USER' is not authorized to access this route"
}
```

**Not Found (404):**
```json
{
  "success": false,
  "message": "Lead not found"
}
```

**Rate Limited (429):**
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

---

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer {your_jwt_token}
```

Token is received upon successful login or registration.

---

## Rate Limits

- General API: 100 requests per 15 minutes
- Auth endpoints (login, register, forgot password): 5 requests per 15 minutes

---

## Data Enums

### User Roles
- `SUPER_ADMIN`
- `ADMIN`
- `MANAGER`
- `USER`

### Lead Status
- `NEW`
- `CONTACTED`
- `QUALIFIED`
- `PROPOSAL`
- `NEGOTIATION`
- `WON`
- `LOST`
- `INACTIVE`

### Lead Priority
- `LOW`
- `MEDIUM`
- `HIGH`
- `URGENT`

### Lead Source
- `WEBSITE`
- `REFERRAL`
- `SOCIAL_MEDIA`
- `EMAIL_CAMPAIGN`
- `COLD_CALL`
- `EVENT`
- `PARTNER`
- `OTHER`

### Activity Type
- `CALL`
- `EMAIL`
- `MEETING`
- `NOTE`
- `TASK`
- `FOLLOW_UP`
