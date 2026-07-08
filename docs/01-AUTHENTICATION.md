# Authentication APIs

This section covers authentication and access key management APIs.

## Table of Contents

- [Login](#login)
- [Create Access Key](#create-access-key)
- [List Access Keys](#list-access-keys)
- [Delete Access Key](#delete-access-key)

---

## Login

Authenticate with the system to obtain an access token.

### Endpoint

```
POST {{host-domain}}/api/v1/auth/login
```

### Authentication

None (public endpoint)

### Headers

| Header | Required | Type | Description |
|--------|----------|------|-------------|
| `X-TENANT-ID` | Yes | string | Tenant identifier |
| `Content-Type` | Yes | string | Must be `application/json` |

### Request Body

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `username` | Yes | string | User's username |
| `password` | Yes | string | User's password |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Authentication successful |
| 401 | Invalid credentials |
| 400 | Bad request |

### Response Schema

```json
{
  "success": true,
  "data": {
    "token": "string",
    "expiresIn": "number",
    "user": {
      "id": "string",
      "username": "string",
      "email": "string"
    }
  }
}
```

### Code Examples

#### cURL

```bash
curl -X POST https://{{host-domain}}/api/v1/auth/login \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "your-username",
    "password": "your-password"
  }'
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/auth/login"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "Content-Type": "application/json"
}
data = {
    "username": "your-username",
    "password": "your-password"
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/auth/login';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'Content-Type': 'application/json'
};
const data = {
  username: 'your-username',
  password: 'your-password'
};

axios.post(url, data, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Create Access Key

Generate a new access key for API authentication.

### Endpoint

```
POST {{host-domain}}/api/v1/auth/access-keys
```

### Authentication

Bearer token required

### Headers

| Header | Required | Type | Description |
|--------|----------|------|-------------|
| `X-TENANT-ID` | Yes | string | Tenant identifier |
| `Authorization` | Yes | string | Bearer token |
| `Content-Type` | Yes | string | Must be `application/json` |

### Request Body

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `name` | Yes | string | Name for the access key |
| `description` | No | string | Description of the access key |
| `permissions` | No | array | Array of permission strings |

### Response Codes

| Code | Description |
|------|-------------|
| 201 | Access key created successfully |
| 401 | Unauthorized |
| 400 | Bad request |

### Response Schema

```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "key": "string",
    "permissions": ["string"],
    "createdAt": "string",
    "expiresAt": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X POST https://{{host-domain}}/api/v1/auth/access-keys \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My API Key",
    "description": "Key for call management",
    "permissions": ["call:read", "call:write"]
  }'
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/auth/access-keys"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "Authorization": "Bearer your-token",
    "Content-Type": "application/json"
}
data = {
    "name": "My API Key",
    "description": "Key for call management",
    "permissions": ["call:read", "call:write"]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/auth/access-keys';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'Authorization': 'Bearer your-token',
  'Content-Type': 'application/json'
};
const data = {
  name: 'My API Key',
  description: 'Key for call management',
  permissions: ['call:read', 'call:write']
};

axios.post(url, data, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## List Access Keys

Retrieve all access keys for the authenticated user.

### Endpoint

```
GET {{host-domain}}/api/v1/auth/access-keys
```

### Authentication

Bearer token required

### Headers

| Header | Required | Type | Description |
|--------|----------|------|-------------|
| `X-TENANT-ID` | Yes | string | Tenant identifier |
| `Authorization` | Yes | string | Bearer token |

### Query Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `page` | No | number | Page number (default: 1) |
| `limit` | No | number | Items per page (default: 20) |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 401 | Unauthorized |

### Response Schema

```json
{
  "success": true,
  "data": {
    "keys": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "permissions": ["string"],
        "createdAt": "string",
        "expiresAt": "string",
        "lastUsed": "string"
      }
    ],
    "pagination": {
      "page": "number",
      "limit": "number",
      "total": "number"
    }
  }
}
```

### Code Examples

#### cURL

```bash
curl -X GET https://{{host-domain}}/api/v1/auth/access-keys?page=1&limit=20 \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "Authorization: Bearer your-token"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/auth/access-keys"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "Authorization": "Bearer your-token"
}
params = {
    "page": 1,
    "limit": 20
}

response = requests.get(url, headers=headers, params=params)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/auth/access-keys';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'Authorization': 'Bearer your-token'
};
const params = {
  page: 1,
  limit: 20
};

axios.get(url, { headers, params })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Delete Access Key

Delete an existing access key.

### Endpoint

```
DELETE {{host-domain}}/api/v1/auth/access-keys/{keyId}
```

### Authentication

Bearer token required

### Headers

| Header | Required | Type | Description |
|--------|----------|------|-------------|
| `X-TENANT-ID` | Yes | string | Tenant identifier |
| `Authorization` | Yes | string | Bearer token |

### Path Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `keyId` | Yes | string | ID of the access key to delete |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Access key deleted successfully |
| 401 | Unauthorized |
| 404 | Access key not found |

### Response Schema

```json
{
  "success": true,
  "message": "Access key deleted successfully"
}
```

### Code Examples

#### cURL

```bash
curl -X DELETE https://{{host-domain}}/api/v1/auth/access-keys/{keyId} \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "Authorization: Bearer your-token"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/auth/access-keys/{keyId}"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "Authorization": "Bearer your-token"
}

response = requests.delete(url, headers=headers)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/auth/access-keys/{keyId}';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'Authorization': 'Bearer your-token'
};

axios.delete(url, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```
