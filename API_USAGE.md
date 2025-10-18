# Contact API Usage Examples

## Get All Contacts with Pagination, Search, and Filters

### Base URL

```
GET /api/contact
```

### Query Parameters

| Parameter  | Type    | Default     | Description                        | Valid Values                      |
| ---------- | ------- | ----------- | ---------------------------------- | --------------------------------- |
| `page`     | integer | 1           | Page number for pagination         | >= 1                              |
| `limit`    | integer | 10          | Number of contacts per page        | 1-100                             |
| `search`   | string  | -           | Search term for filtering contacts | Any string                        |
| `searchBy` | string  | "name"      | Field to search by                 | name, email, phone                |
| `type`     | string  | -           | Filter contacts by type            | personal, professional            |
| `sortDir`  | string  | "desc"      | Sort direction                     | asc, desc                         |
| `sortBy`   | string  | "createdAt" | Field to sort by                   | name, email, createdAt, updatedAt |

### Example Requests

#### 1. Basic pagination

```
GET /api/contact?page=1&limit=10
```

#### 2. Search by name

```
GET /api/contact?search=john&searchBy=name
```

#### 3. Search by email

```
GET /api/contact?search=gmail&searchBy=email
```

#### 4. Filter by type

```
GET /api/contact?type=personal
```

#### 5. Sort by name ascending

```
GET /api/contact?sortBy=name&sortDir=asc
```

#### 6. Combined filters

```
GET /api/contact?page=1&limit=5&search=john&type=professional&sortBy=createdAt&sortDir=desc
```

### Response Format

```json
{
  "message": "Contacts retrieved successfully",
  "data": [
    {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "type": "personal",
      "createdAt": "2025-10-18T10:30:45.123Z",
      "updatedAt": "2025-10-18T10:30:45.123Z"
    }
  ],
  "pagination": {
    "total": 25,
    "limit": 10,
    "page": 1,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPrevPage": false,
    "nextPage": 2,
    "prevPage": null
  },
  "filters": {
    "search": "john",
    "searchBy": "name",
    "type": "personal",
    "sortDir": "desc",
    "sortBy": "createdAt"
  },
  "success": true
}
```

### Error Responses

#### Invalid type filter

```json
{
  "message": "Invalid type filter. Must be one of: personal, professional",
  "success": false
}
```

#### General validation error

```json
{
  "message": "Validation error message",
  "success": false
}
```
