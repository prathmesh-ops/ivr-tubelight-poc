# Campaign Management APIs

This section covers contact and agent operations for campaign management.

## Table of Contents

- [Create Campaign](#create-campaign)
- [List Campaigns](#list-campaigns)
- [Get Campaign Details](#get-campaign-details)
- [Update Campaign](#update-campaign)
- [Delete Campaign](#delete-campaign)
- [Add Contact to Campaign](#add-contact-to-campaign)
- [List Campaign Contacts](#list-campaign-contacts)
- [Update Contact](#update-contact)
- [Delete Contact](#delete-contact)
- [Start Campaign](#start-campaign)
- [Stop Campaign](#stop-campaign)
- [Get Campaign Status](#get-campaign-status)
- [Assign Agent to Campaign](#assign-agent-to-campaign)
- [Remove Agent from Campaign](#remove-agent-from-campaign)
- [List Campaign Agents](#list-campaign-agents)

---

## Create Campaign

Create a new calling campaign.

### Endpoint

```
POST {{host-domain}}/api/v1/campaigns
```

### Authentication

Access key required

### Headers

| Header | Required | Type | Description |
|--------|----------|------|-------------|
| `X-TENANT-ID` | Yes | string | Tenant identifier |
| `access-key` | Yes | string | Access key for authentication |
| `Content-Type` | Yes | string | Must be `application/json` |

### Request Body

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `name` | Yes | string | Campaign name |
| `description` | No | string | Campaign description |
| `type` | Yes | string | Campaign type (outbound/inbound) |
| `soundFileId` | No | string | ID of the sound file to use |
| `settings` | No | object | Campaign settings (retry logic, etc.) |

### Response Codes

| Code | Description |
|------|-------------|
| 201 | Campaign created successfully |
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
    "type": "string",
    "soundFileId": "string",
    "status": "draft",
    "settings": {},
    "createdAt": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X POST https://{{host-domain}}/api/v1/campaigns \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sales Campaign Q1",
    "description": "Q1 sales outreach campaign",
    "type": "outbound",
    "soundFileId": "sound-file-123",
    "settings": {
      "maxRetries": 3,
      "retryInterval": 300
    }
  }'
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/campaigns"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "access-key": "your-access-key",
    "Content-Type": "application/json"
}
data = {
    "name": "Sales Campaign Q1",
    "description": "Q1 sales outreach campaign",
    "type": "outbound",
    "soundFileId": "sound-file-123",
    "settings": {
        "maxRetries": 3,
        "retryInterval": 300
    }
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/campaigns';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key',
  'Content-Type': 'application/json'
};
const data = {
  name: 'Sales Campaign Q1',
  description: 'Q1 sales outreach campaign',
  type: 'outbound',
  soundFileId: 'sound-file-123',
  settings: {
    maxRetries: 3,
    retryInterval: 300
  }
};

axios.post(url, data, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## List Campaigns

Retrieve all campaigns for the tenant.

### Endpoint

```
GET {{host-domain}}/api/v1/campaigns
```

### Authentication

Access key required

### Headers

| Header | Required | Type | Description |
|--------|----------|------|-------------|
| `X-TENANT-ID` | Yes | string | Tenant identifier |
| `access-key` | Yes | string | Access key for authentication |

### Query Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `page` | No | number | Page number (default: 1) |
| `limit` | No | number | Items per page (default: 20) |
| `status` | No | string | Filter by status (draft/active/completed) |
| `type` | No | string | Filter by type (outbound/inbound) |

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
    "campaigns": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "type": "string",
        "status": "string",
        "contactCount": "number",
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
curl -X GET https://{{host-domain}}/api/v1/campaigns?page=1&limit=20 \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/campaigns"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "access-key": "your-access-key"
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

const url = 'https://{{host-domain}}/api/v1/campaigns';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key'
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

## Get Campaign Details

Retrieve detailed information about a specific campaign.

### Endpoint

```
GET {{host-domain}}/api/v1/campaigns/{campaignId}
```

### Authentication

Access key required

### Headers

| Header | Required | Type | Description |
|--------|----------|------|-------------|
| `X-TENANT-ID` | Yes | string | Tenant identifier |
| `access-key` | Yes | string | Access key for authentication |

### Path Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `campaignId` | Yes | string | ID of the campaign |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 401 | Unauthorized |
| 404 | Campaign not found |

### Response Schema

```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "type": "string",
    "soundFileId": "string",
    "status": "string",
    "settings": {},
    "contactCount": "number",
    "completedCount": "number",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X GET https://{{host-domain}}/api/v1/campaigns/{campaignId} \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/campaigns/{campaignId}"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "access-key": "your-access-key"
}

response = requests.get(url, headers=headers)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/campaigns/{campaignId}';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key'
};

axios.get(url, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Update Campaign

Update an existing campaign.

### Endpoint

```
PATCH {{host-domain}}/api/v1/campaigns/{campaignId}
```

### Authentication

Access key required

### Headers

| Header | Required | Type | Description |
|--------|----------|------|-------------|
| `X-TENANT-ID` | Yes | string | Tenant identifier |
| `access-key` | Yes | string | Access key for authentication |
| `Content-Type` | Yes | string | Must be `application/json` |

### Path Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `campaignId` | Yes | string | ID of the campaign |

### Request Body

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `name` | No | string | Campaign name |
| `description` | No | string | Campaign description |
| `soundFileId` | No | string | ID of the sound file to use |
| `settings` | No | object | Campaign settings |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Campaign updated successfully |
| 401 | Unauthorized |
| 404 | Campaign not found |

### Response Schema

```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "soundFileId": "string",
    "settings": {},
    "updatedAt": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X PATCH https://{{host-domain}}/api/v1/campaigns/{campaignId} \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Campaign Name",
    "description": "Updated description"
  }'
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/campaigns/{campaignId}"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "access-key": "your-access-key",
    "Content-Type": "application/json"
}
data = {
    "name": "Updated Campaign Name",
    "description": "Updated description"
}

response = requests.patch(url, headers=headers, json=data)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/campaigns/{campaignId}';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key',
  'Content-Type': 'application/json'
};
const data = {
  name: 'Updated Campaign Name',
  description: 'Updated description'
};

axios.patch(url, data, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Delete Campaign

Delete a campaign.

### Endpoint

```
DELETE {{host-domain}}/api/v1/campaigns/{campaignId}
```

### Authentication

Access key required

### Headers

| Header | Required | Type | Description |
|--------|----------|------|-------------|
| `X-TENANT-ID` | Yes | string | Tenant identifier |
| `access-key` | Yes | string | Access key for authentication |

### Path Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `campaignId` | Yes | string | ID of the campaign |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Campaign deleted successfully |
| 401 | Unauthorized |
| 404 | Campaign not found |

### Response Schema

```json
{
  "success": true,
  "message": "Campaign deleted successfully"
}
```

### Code Examples

#### cURL

```bash
curl -X DELETE https://{{host-domain}}/api/v1/campaigns/{campaignId} \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/campaigns/{campaignId}"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "access-key": "your-access-key"
}

response = requests.delete(url, headers=headers)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/campaigns/{campaignId}';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key'
};

axios.delete(url, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Add Contact to Campaign

Add a contact to a campaign.

### Endpoint

```
POST {{host-domain}}/api/v1/campaigns/{campaignId}/contacts
```

### Authentication

Access key required

### Headers

| Header | Required | Type | Description |
|--------|----------|------|-------------|
| `X-TENANT-ID` | Yes | string | Tenant identifier |
| `access-key` | Yes | string | Access key for authentication |
| `Content-Type` | Yes | string | Must be `application/json` |

### Path Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `campaignId` | Yes | string | ID of the campaign |

### Request Body

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `phoneNumber` | Yes | string | Contact phone number |
| `name` | No | string | Contact name |
| `email` | No | string | Contact email |
| `metadata` | No | object | Custom metadata |

### Response Codes

| Code | Description |
|------|-------------|
| 201 | Contact added successfully |
| 401 | Unauthorized |
| 404 | Campaign not found |

### Response Schema

```json
{
  "success": true,
  "data": {
    "id": "string",
    "phoneNumber": "string",
    "name": "string",
    "email": "string",
    "metadata": {},
    "status": "pending",
    "addedAt": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X POST https://{{host-domain}}/api/v1/campaigns/{campaignId}/contacts \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key" \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "metadata": {
      "customerType": "premium"
    }
  }'
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/campaigns/{campaignId}/contacts"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "access-key": "your-access-key",
    "Content-Type": "application/json"
}
data = {
    "phoneNumber": "+1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "metadata": {
        "customerType": "premium"
    }
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/campaigns/{campaignId}/contacts';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key',
  'Content-Type': 'application/json'
};
const data = {
  phoneNumber: '+1234567890',
  name: 'John Doe',
  email: 'john@example.com',
  metadata: {
    customerType: 'premium'
  }
};

axios.post(url, data, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## List Campaign Contacts

Retrieve all contacts for a specific campaign.

### Endpoint

```
GET {{host-domain}}/api/v1/campaigns/{campaignId}/contacts
```

### Authentication

Access key required

### Headers

| Header | Required | Type | Description |
|--------|----------|------|-------------|
| `X-TENANT-ID` | Yes | string | Tenant identifier |
| `access-key` | Yes | string | Access key for authentication |

### Path Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `campaignId` | Yes | string | ID of the campaign |

### Query Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `page` | No | number | Page number (default: 1) |
| `limit` | No | number | Items per page (default: 20) |
| `status` | No | string | Filter by status (pending/completed/failed) |

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
    "contacts": [
      {
        "id": "string",
        "phoneNumber": "string",
        "name": "string",
        "email": "string",
        "status": "string",
        "callCount": "number",
        "lastCallAt": "string",
        "addedAt": "string"
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
curl -X GET https://{{host-domain}}/api/v1/campaigns/{campaignId}/contacts?page=1&limit=20 \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/campaigns/{campaignId}/contacts"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "access-key": "your-access-key"
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

const url = 'https://{{host-domain}}/api/v1/campaigns/{campaignId}/contacts';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key'
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

## Update Contact

Update a contact in a campaign.

### Endpoint

```
PATCH {{host-domain}}/api/v1/campaigns/{campaignId}/contacts/{contactId}
```

### Authentication

Access key required

### Headers

| Header | Required | Type | Description |
|--------|----------|------|-------------|
| `X-TENANT-ID` | Yes | string | Tenant identifier |
| `access-key` | Yes | string | Access key for authentication |
| `Content-Type` | Yes | string | Must be `application/json` |

### Path Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `campaignId` | Yes | string | ID of the campaign |
| `contactId` | Yes | string | ID of the contact |

### Request Body

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `name` | No | string | Contact name |
| `email` | No | string | Contact email |
| `metadata` | No | object | Custom metadata |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Contact updated successfully |
| 401 | Unauthorized |
| 404 | Contact not found |

### Response Schema

```json
{
  "success": true,
  "data": {
    "id": "string",
    "phoneNumber": "string",
    "name": "string",
    "email": "string",
    "metadata": {},
    "updatedAt": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X PATCH https://{{host-domain}}/api/v1/campaigns/{campaignId}/contacts/{contactId} \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "email": "updated@example.com"
  }'
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/campaigns/{campaignId}/contacts/{contactId}"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "access-key": "your-access-key",
    "Content-Type": "application/json"
}
data = {
    "name": "Updated Name",
    "email": "updated@example.com"
}

response = requests.patch(url, headers=headers, json=data)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/campaigns/{campaignId}/contacts/{contactId}';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key',
  'Content-Type': 'application/json'
};
const data = {
  name: 'Updated Name',
  email: 'updated@example.com'
};

axios.patch(url, data, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Delete Contact

Delete a contact from a campaign.

### Endpoint

```
DELETE {{host-domain}}/api/v1/campaigns/{campaignId}/contacts/{contactId}
```

### Authentication

Access key required

### Headers

| Header | Required | Type | Description |
|--------|----------|------|-------------|
| `X-TENANT-ID` | Yes | string | Tenant identifier |
| `access-key` | Yes | string | Access key for authentication |

### Path Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `campaignId` | Yes | string | ID of the campaign |
| `contactId` | Yes | string | ID of the contact |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Contact deleted successfully |
| 401 | Unauthorized |
| 404 | Contact not found |

### Response Schema

```json
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

### Code Examples

#### cURL

```bash
curl -X DELETE https://{{host-domain}}/api/v1/campaigns/{campaignId}/contacts/{contactId} \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/campaigns/{campaignId}/contacts/{contactId}"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "access-key": "your-access-key"
}

response = requests.delete(url, headers=headers)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/campaigns/{campaignId}/contacts/{contactId}';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key'
};

axios.delete(url, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Start Campaign

Start a campaign.

### Endpoint

```
POST {{host-domain}}/api/v1/campaigns/{campaignId}/start
```

### Authentication

Access key required

### Headers

| Header | Required | Type | Description |
|--------|----------|------|-------------|
| `X-TENANT-ID` | Yes | string | Tenant identifier |
| `access-key` | Yes | string | Access key for authentication |

### Path Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `campaignId` | Yes | string | ID of the campaign |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Campaign started successfully |
| 401 | Unauthorized |
| 404 | Campaign not found |

### Response Schema

```json
{
  "success": true,
  "data": {
    "campaignId": "string",
    "status": "active",
    "startedAt": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X POST https://{{host-domain}}/api/v1/campaigns/{campaignId}/start \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/campaigns/{campaignId}/start"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "access-key": "your-access-key"
}

response = requests.post(url, headers=headers)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/campaigns/{campaignId}/start';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key'
};

axios.post(url, {}, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Stop Campaign

Stop a running campaign.

### Endpoint

```
POST {{host-domain}}/api/v1/campaigns/{campaignId}/stop
```

### Authentication

Access key required

### Headers

| Header | Required | Type | Description |
|--------|----------|------|-------------|
| `X-TENANT-ID` | Yes | string | Tenant identifier |
| `access-key` | Yes | string | Access key for authentication |

### Path Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `campaignId` | Yes | string | ID of the campaign |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Campaign stopped successfully |
| 401 | Unauthorized |
| 404 | Campaign not found |

### Response Schema

```json
{
  "success": true,
  "data": {
    "campaignId": "string",
    "status": "stopped",
    "stoppedAt": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X POST https://{{host-domain}}/api/v1/campaigns/{campaignId}/stop \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/campaigns/{campaignId}/stop"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "access-key": "your-access-key"
}

response = requests.post(url, headers=headers)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/campaigns/{campaignId}/stop';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key'
};

axios.post(url, {}, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Get Campaign Status

Retrieve the current status of a campaign.

### Endpoint

```
GET {{host-domain}}/api/v1/campaigns/{campaignId}/status
```

### Authentication

Access key required

### Headers

| Header | Required | Type | Description |
|--------|----------|------|-------------|
| `X-TENANT-ID` | Yes | string | Tenant identifier |
| `access-key` | Yes | string | Access key for authentication |

### Path Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `campaignId` | Yes | string | ID of the campaign |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 401 | Unauthorized |
| 404 | Campaign not found |

### Response Schema

```json
{
  "success": true,
  "data": {
    "campaignId": "string",
    "status": "string",
    "totalContacts": "number",
    "completedContacts": "number",
    "failedContacts": "number",
    "activeCalls": "number",
    "startedAt": "string",
    "estimatedCompletion": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X GET https://{{host-domain}}/api/v1/campaigns/{campaignId}/status \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/campaigns/{campaignId}/status"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "access-key": "your-access-key"
}

response = requests.get(url, headers=headers)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/campaigns/{campaignId}/status';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key'
};

axios.get(url, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Assign Agent to Campaign

Assign an agent to a campaign.

### Endpoint

```
POST {{host-domain}}/api/v1/campaigns/{campaignId}/agents
```

### Authentication

Access key required

### Headers

| Header | Required | Type | Description |
|--------|----------|------|-------------|
| `X-TENANT-ID` | Yes | string | Tenant identifier |
| `access-key` | Yes | string | Access key for authentication |
| `Content-Type` | Yes | string | Must be `application/json` |

### Path Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `campaignId` | Yes | string | ID of the campaign |

### Request Body

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `agentId` | Yes | string | ID of the agent to assign |
| `role` | No | string | Agent role (operator/supervisor) |

### Response Codes

| Code | Description |
|------|-------------|
| 201 | Agent assigned successfully |
| 401 | Unauthorized |
| 404 | Campaign or agent not found |

### Response Schema

```json
{
  "success": true,
  "data": {
    "campaignId": "string",
    "agentId": "string",
    "role": "string",
    "assignedAt": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X POST https://{{host-domain}}/api/v1/campaigns/{campaignId}/agents \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key" \
  -H "Content-Type: application/json" \
  -d '{
    "agentId": "agent-123",
    "role": "operator"
  }'
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/campaigns/{campaignId}/agents"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "access-key": "your-access-key",
    "Content-Type": "application/json"
}
data = {
    "agentId": "agent-123",
    "role": "operator"
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/campaigns/{campaignId}/agents';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key',
  'Content-Type': 'application/json'
};
const data = {
  agentId: 'agent-123',
  role: 'operator'
};

axios.post(url, data, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Remove Agent from Campaign

Remove an agent from a campaign.

### Endpoint

```
DELETE {{host-domain}}/api/v1/campaigns/{campaignId}/agents/{agentId}
```

### Authentication

Access key required

### Headers

| Header | Required | Type | Description |
|--------|----------|------|-------------|
| `X-TENANT-ID` | Yes | string | Tenant identifier |
| `access-key` | Yes | string | Access key for authentication |

### Path Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `campaignId` | Yes | string | ID of the campaign |
| `agentId` | Yes | string | ID of the agent |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Agent removed successfully |
| 401 | Unauthorized |
| 404 | Agent or campaign not found |

### Response Schema

```json
{
  "success": true,
  "message": "Agent removed from campaign successfully"
}
```

### Code Examples

#### cURL

```bash
curl -X DELETE https://{{host-domain}}/api/v1/campaigns/{campaignId}/agents/{agentId} \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/campaigns/{campaignId}/agents/{agentId}"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "access-key": "your-access-key"
}

response = requests.delete(url, headers=headers)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/campaigns/{campaignId}/agents/{agentId}';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key'
};

axios.delete(url, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## List Campaign Agents

Retrieve all agents assigned to a campaign.

### Endpoint

```
GET {{host-domain}}/api/v1/campaigns/{campaignId}/agents
```

### Authentication

Access key required

### Headers

| Header | Required | Type | Description |
|--------|----------|------|-------------|
| `X-TENANT-ID` | Yes | string | Tenant identifier |
| `access-key` | Yes | string | Access key for authentication |

### Path Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `campaignId` | Yes | string | ID of the campaign |

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
    "agents": [
      {
        "agentId": "string",
        "name": "string",
        "role": "string",
        "status": "string",
        "assignedAt": "string"
      }
    ]
  }
}
```

### Code Examples

#### cURL

```bash
curl -X GET https://{{host-domain}}/api/v1/campaigns/{campaignId}/agents \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/campaigns/{campaignId}/agents"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "access-key": "your-access-key"
}

response = requests.get(url, headers=headers)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/campaigns/{campaignId}/agents';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key'
};

axios.get(url, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```
