# Settings APIs

This section covers phone number and sound file management APIs.

## Table of Contents

- [List Phone Numbers](#list-phone-numbers)
- [Add Phone Number](#add-phone-number)
- [Delete Phone Number](#delete-phone-number)
- [Upload Sound File](#upload-sound-file)
- [List Sound Files](#list-sound-files)
- [Delete Sound File](#delete-sound-file)

---

## List Phone Numbers

Retrieve all phone numbers configured for the tenant.

### Endpoint

```
GET {{host-domain}}/api/v1/settings/phone-numbers
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
| `status` | No | string | Filter by status (active/inactive) |

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
    "phoneNumbers": [
      {
        "id": "string",
        "number": "string",
        "countryCode": "string",
        "type": "string",
        "status": "string",
        "createdAt": "string"
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
curl -X GET https://{{host-domain}}/api/v1/settings/phone-numbers?page=1&limit=20 \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "Authorization: Bearer your-token"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/settings/phone-numbers"
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

const url = 'https://{{host-domain}}/api/v1/settings/phone-numbers';
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

## Add Phone Number

Add a new phone number to the tenant's configuration.

### Endpoint

```
POST {{host-domain}}/api/v1/settings/phone-numbers
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
| `number` | Yes | string | Phone number |
| `countryCode` | Yes | string | Country code (e.g., +1) |
| `type` | Yes | string | Type of number (voice/sms) |
| `label` | No | string | Label for the phone number |

### Response Codes

| Code | Description |
|------|-------------|
| 201 | Phone number added successfully |
| 401 | Unauthorized |
| 400 | Bad request |

### Response Schema

```json
{
  "success": true,
  "data": {
    "id": "string",
    "number": "string",
    "countryCode": "string",
    "type": "string",
    "label": "string",
    "status": "active",
    "createdAt": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X POST https://{{host-domain}}/api/v1/settings/phone-numbers \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json" \
  -d '{
    "number": "1234567890",
    "countryCode": "+1",
    "type": "voice",
    "label": "Main Line"
  }'
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/settings/phone-numbers"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "Authorization": "Bearer your-token",
    "Content-Type": "application/json"
}
data = {
    "number": "1234567890",
    "countryCode": "+1",
    "type": "voice",
    "label": "Main Line"
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/settings/phone-numbers';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'Authorization': 'Bearer your-token',
  'Content-Type': 'application/json'
};
const data = {
  number: '1234567890',
  countryCode: '+1',
  type: 'voice',
  label: 'Main Line'
};

axios.post(url, data, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Delete Phone Number

Remove a phone number from the tenant's configuration.

### Endpoint

```
DELETE {{host-domain}}/api/v1/settings/phone-numbers/{phoneNumberId}
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
| `phoneNumberId` | Yes | string | ID of the phone number to delete |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Phone number deleted successfully |
| 401 | Unauthorized |
| 404 | Phone number not found |

### Response Schema

```json
{
  "success": true,
  "message": "Phone number deleted successfully"
}
```

### Code Examples

#### cURL

```bash
curl -X DELETE https://{{host-domain}}/api/v1/settings/phone-numbers/{phoneNumberId} \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "Authorization: Bearer your-token"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/settings/phone-numbers/{phoneNumberId}"
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

const url = 'https://{{host-domain}}/api/v1/settings/phone-numbers/{phoneNumberId}';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'Authorization': 'Bearer your-token'
};

axios.delete(url, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Upload Sound File

Upload a sound file for use in campaigns and calls.

### Endpoint

```
POST {{host-domain}}/api/v1/settings/sound-files
```

### Authentication

Bearer token required

### Headers

| Header | Required | Type | Description |
|--------|----------|------|-------------|
| `X-TENANT-ID` | Yes | string | Tenant identifier |
| `Authorization` | Yes | string | Bearer token |
| `Content-Type` | Yes | string | Must be `multipart/form-data` |

### Request Body (multipart/form-data)

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `file` | Yes | file | Audio file (MP3, WAV) |
| `name` | Yes | string | Name for the sound file |
| `description` | No | string | Description of the sound file |
| `category` | No | string | Category (greeting/prompt/music) |

### Response Codes

| Code | Description |
|------|-------------|
| 201 | Sound file uploaded successfully |
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
    "category": "string",
    "url": "string",
    "duration": "number",
    "size": "number",
    "format": "string",
    "createdAt": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X POST https://{{host-domain}}/api/v1/settings/sound-files \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "Authorization: Bearer your-token" \
  -F "file=@/path/to/audio.mp3" \
  -F "name=Greeting Message" \
  -F "description=Main greeting for IVR" \
  -F "category=greeting"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/settings/sound-files"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "Authorization": "Bearer your-token"
}
files = {
    "file": open("/path/to/audio.mp3", "rb")
}
data = {
    "name": "Greeting Message",
    "description": "Main greeting for IVR",
    "category": "greeting"
}

response = requests.post(url, headers=headers, files=files, data=data)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const url = 'https://{{host-domain}}/api/v1/settings/sound-files';
const form = new FormData();
form.append('file', fs.createReadStream('/path/to/audio.mp3'));
form.append('name', 'Greeting Message');
form.append('description', 'Main greeting for IVR');
form.append('category', 'greeting');

const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'Authorization': 'Bearer your-token',
  ...form.getHeaders()
};

axios.post(url, form, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## List Sound Files

Retrieve all sound files for the tenant.

### Endpoint

```
GET {{host-domain}}/api/v1/settings/sound-files
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
| `category` | No | string | Filter by category |

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
    "soundFiles": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "category": "string",
        "url": "string",
        "duration": "number",
        "size": "number",
        "format": "string",
        "createdAt": "string"
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
curl -X GET https://{{host-domain}}/api/v1/settings/sound-files?page=1&limit=20 \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "Authorization: Bearer your-token"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/settings/sound-files"
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

const url = 'https://{{host-domain}}/api/v1/settings/sound-files';
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

## Delete Sound File

Delete a sound file from the tenant's configuration.

### Endpoint

```
DELETE {{host-domain}}/api/v1/settings/sound-files/{soundFileId}
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
| `soundFileId` | Yes | string | ID of the sound file to delete |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Sound file deleted successfully |
| 401 | Unauthorized |
| 404 | Sound file not found |

### Response Schema

```json
{
  "success": true,
  "message": "Sound file deleted successfully"
}
```

### Code Examples

#### cURL

```bash
curl -X DELETE https://{{host-domain}}/api/v1/settings/sound-files/{soundFileId} \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "Authorization: Bearer your-token"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/settings/sound-files/{soundFileId}"
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

const url = 'https://{{host-domain}}/api/v1/settings/sound-files/{soundFileId}';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'Authorization': 'Bearer your-token'
};

axios.delete(url, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```
