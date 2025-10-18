# Swagger Authentication Guide

## How to Test Contact API with JWT Token in Swagger

### Step 1: Access Swagger Documentation
Navigate to: `http://localhost:4000/api/docs`

### Step 2: Get JWT Token

#### Option A: Register a New User
1. Find the `POST /api/users/register` endpoint
2. Click "Try it out"
3. Enter user details:
```json
{
  "name": "Test User",
  "email": "test@example.com", 
  "password": "12345678"
}
```
4. Click "Execute"
5. Copy the token from the response (if login returns token) or proceed to login

#### Option B: Login with Existing User
1. Find the `POST /api/users/login` endpoint
2. Click "Try it out"
3. Enter credentials:
```json
{
  "email": "test@example.com",
  "password": "12345678"
}
```
4. Click "Execute"
5. Copy the JWT token from the response

### Step 3: Authorize in Swagger
1. Look for the **"Authorize"** button (🔒 lock icon) at the top of the Swagger page
2. Click the "Authorize" button
3. In the popup window:
   - **Field**: `bearerAuth (http, Bearer)`
   - **Value**: Enter your JWT token (WITHOUT "Bearer " prefix)
   - **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
4. Click "Authorize"
5. Click "Close"

### Step 4: Test Contact Endpoints

#### Create a New Contact
1. Find `POST /api/contact/new`
2. Click "Try it out"
3. Enter contact data:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "type": "Personal"
}
```
4. Click "Execute"

#### Get All Contacts with Filters
1. Find `GET /api/contact`
2. Click "Try it out"
3. Set query parameters:
   - `page`: 1
   - `limit`: 10
   - `search`: john
   - `searchBy`: name
   - `type`: Personal
   - `sortDir`: desc
   - `sortBy`: createdAt
4. Click "Execute"

### Authentication Status Indicators

- **🔒 Locked**: Endpoint requires authentication
- **🔓 Unlocked**: Authentication not required
- **Green "Authorize"**: Successfully authenticated
- **Red errors**: Token expired or invalid

### Troubleshooting

#### Common Issues:
1. **401 Unauthorized**: 
   - Check if token is correctly entered
   - Ensure token hasn't expired
   - Verify token doesn't include "Bearer " prefix

2. **403 Forbidden**:
   - Token might be invalid
   - User might not have permission

3. **Token Format**:
   - ✅ Correct: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - ❌ Wrong: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### API Query Examples

#### Basic Pagination:
```
GET /api/contact?page=1&limit=5
```

#### Search by Name:
```
GET /api/contact?search=john&searchBy=name
```

#### Filter by Type:
```
GET /api/contact?type=Professional
```

#### Combined Query:
```
GET /api/contact?page=2&limit=10&search=doe&searchBy=name&type=Personal&sortBy=createdAt&sortDir=desc
```

### Response Format

#### Successful Response:
```json
{
  "message": "Contacts retrieved successfully",
  "data": [...],
  "pagination": {
    "total": 25,
    "limit": 10,
    "page": 2,
    "totalPages": 3
  },
  "filters": {
    "search": "john",
    "searchBy": "name",
    "type": "Personal",
    "sortDir": "desc",
    "sortBy": "createdAt"
  },
  "success": true
}
```