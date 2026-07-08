# Reporting APIs

This section covers CDR (Call Detail Record) reports and analytics APIs.

## Table of Contents

- [Generate CDR Report](#generate-cdr-report)
- [Get CDR Report](#get-cdr-report)
- [List CDR Reports](#list-cdr-reports)
- [Export CDR Report](#export-cdr-report)
- [Get Call Analytics](#get-call-analytics)
- [Get Campaign Analytics](#get-campaign-analytics)
- [Get Agent Performance](#get-agent-performance)

---

## Generate CDR Report

Generate a new CDR report for a specified date range.

### Endpoint

```
POST {{host-domain}}/api/v1/reports/cdr
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
| `startDate` | Yes | string | Start date (ISO 8601 format) |
| `endDate` | Yes | string | End date (ISO 8601 format) |
| `campaignId` | No | string | Filter by campaign ID |
| `agentId` | No | string | Filter by agent ID |
| `status` | No | string | Filter by call status |
| `format` | No | string | Report format (json/csv/pdf) |

### Response Codes

| Code | Description |
|------|-------------|
| 201 | Report generation started |
| 401 | Unauthorized |
| 400 | Bad request |

### Response Schema

```json
{
  "success": true,
  "data": {
    "reportId": "string",
    "status": "processing",
    "startDate": "string",
    "endDate": "string",
    "format": "string",
    "createdAt": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X POST https://{{host-domain}}/api/v1/reports/cdr \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json" \
  -d '{
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2024-01-31T23:59:59Z",
    "campaignId": "campaign-123",
    "format": "csv"
  }'
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/reports/cdr"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "Authorization": "Bearer your-token",
    "Content-Type": "application/json"
}
data = {
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2024-01-31T23:59:59Z",
    "campaignId": "campaign-123",
    "format": "csv"
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/reports/cdr';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'Authorization': 'Bearer your-token',
  'Content-Type': 'application/json'
};
const data = {
  startDate: '2024-01-01T00:00:00Z',
  endDate: '2024-01-31T23:59:59Z',
  campaignId: 'campaign-123',
  format: 'csv'
};

axios.post(url, data, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Get CDR Report

Retrieve a specific CDR report by ID.

### Endpoint

```
GET {{host-domain}}/api/v1/reports/cdr/{reportId}
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
| `reportId` | Yes | string | ID of the report |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 401 | Unauthorized |
| 404 | Report not found |

### Response Schema

```json
{
  "success": true,
  "data": {
    "reportId": "string",
    "status": "completed",
    "startDate": "string",
    "endDate": "string",
    "format": "string",
    "totalCalls": "number",
    "successfulCalls": "number",
    "failedCalls": "number",
    "averageDuration": "number",
    "downloadUrl": "string",
    "createdAt": "string",
    "completedAt": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X GET https://{{host-domain}}/api/v1/reports/cdr/{reportId} \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "Authorization: Bearer your-token"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/reports/cdr/{reportId}"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "Authorization": "Bearer your-token"
}

response = requests.get(url, headers=headers)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/reports/cdr/{reportId}';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'Authorization': 'Bearer your-token'
};

axios.get(url, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## List CDR Reports

Retrieve all CDR reports for the tenant.

### Endpoint

```
GET {{host-domain}}/api/v1/reports/cdr
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
| `status` | No | string | Filter by status (processing/completed/failed) |

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
    "reports": [
      {
        "reportId": "string",
        "status": "string",
        "startDate": "string",
        "endDate": "string",
        "format": "string",
        "totalCalls": "number",
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
curl -X GET https://{{host-domain}}/api/v1/reports/cdr?page=1&limit=20 \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "Authorization: Bearer your-token"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/reports/cdr"
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

const url = 'https://{{host-domain}}/api/v1/reports/cdr';
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

## Export CDR Report

Export a CDR report in the specified format.

### Endpoint

```
GET {{host-domain}}/api/v1/reports/cdr/{reportId}/export
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
| `reportId` | Yes | string | ID of the report |

### Query Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `format` | No | string | Export format (csv/pdf/xlsx) |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Export file returned |
| 401 | Unauthorized |
| 404 | Report not found |

### Response

The response will be the file content in the specified format.

### Code Examples

#### cURL

```bash
curl -X GET https://{{host-domain}}/api/v1/reports/cdr/{reportId}/export?format=csv \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "Authorization: Bearer your-token" \
  -o report.csv
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/reports/cdr/{reportId}/export"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "Authorization": "Bearer your-token"
}
params = {
    "format": "csv"
}

response = requests.get(url, headers=headers, params=params)
with open("report.csv", "wb") as f:
    f.write(response.content)
print("Report exported successfully")
```

#### Node.js

```javascript
const axios = require('axios');
const fs = require('fs');

const url = 'https://{{host-domain}}/api/v1/reports/cdr/{reportId}/export';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'Authorization': 'Bearer your-token'
};
const params = {
  format: 'csv'
};

axios.get(url, { headers, params, responseType: 'stream' })
  .then(response => {
    response.data.pipe(fs.createWriteStream('report.csv'));
    console.log('Report exported successfully');
  })
  .catch(error => console.error(error));
```

---

## Get Call Analytics

Retrieve call analytics for a specified time period.

### Endpoint

```
GET {{host-domain}}/api/v1/analytics/calls
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
| `startDate` | Yes | string | Start date (ISO 8601 format) |
| `endDate` | Yes | string | End date (ISO 8601 format) |
| `granularity` | No | string | Time granularity (hourly/daily/weekly) |
| `campaignId` | No | string | Filter by campaign ID |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 401 | Unauthorized |
| 400 | Bad request |

### Response Schema

```json
{
  "success": true,
  "data": {
    "totalCalls": "number",
    "successfulCalls": "number",
    "failedCalls": "number",
    "averageDuration": "number",
    "totalDuration": "number",
    "answerRate": "number",
    "byHour": [
      {
        "hour": "number",
        "calls": "number",
        "duration": "number"
      }
    ],
    "byStatus": {
      "completed": "number",
      "failed": "number",
      "no-answer": "number",
      "busy": "number"
    }
  }
}
```

### Code Examples

#### cURL

```bash
curl -X GET "https://{{host-domain}}/api/v1/analytics/calls?startDate=2024-01-01T00:00:00Z&endDate=2024-01-31T23:59:59Z&granularity=daily" \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "Authorization: Bearer your-token"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/analytics/calls"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "Authorization": "Bearer your-token"
}
params = {
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2024-01-31T23:59:59Z",
    "granularity": "daily"
}

response = requests.get(url, headers=headers, params=params)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/analytics/calls';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'Authorization': 'Bearer your-token'
};
const params = {
  startDate: '2024-01-01T00:00:00Z',
  endDate: '2024-01-31T23:59:59Z',
  granularity: 'daily'
};

axios.get(url, { headers, params })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Get Campaign Analytics

Retrieve analytics for a specific campaign.

### Endpoint

```
GET {{host-domain}}/api/v1/analytics/campaigns/{campaignId}
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
| `campaignId` | Yes | string | ID of the campaign |

### Query Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `startDate` | No | string | Start date (ISO 8601 format) |
| `endDate` | No | string | End date (ISO 8601 format) |

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
    "campaignName": "string",
    "totalContacts": "number",
    "completedContacts": "number",
    "pendingContacts": "number",
    "failedContacts": "number",
    "totalCalls": "number",
    "successfulCalls": "number",
    "averageCallDuration": "number",
    "completionRate": "number",
    "successRate": "number",
    "byDay": [
      {
        "date": "string",
        "calls": "number",
        "completions": "number"
      }
    ]
  }
}
```

### Code Examples

#### cURL

```bash
curl -X GET "https://{{host-domain}}/api/v1/analytics/campaigns/{campaignId}?startDate=2024-01-01T00:00:00Z&endDate=2024-01-31T23:59:59Z" \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "Authorization: Bearer your-token"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/analytics/campaigns/{campaignId}"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "Authorization": "Bearer your-token"
}
params = {
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2024-01-31T23:59:59Z"
}

response = requests.get(url, headers=headers, params=params)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/analytics/campaigns/{campaignId}';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'Authorization': 'Bearer your-token'
};
const params = {
  startDate: '2024-01-01T00:00:00Z',
  endDate: '2024-01-31T23:59:59Z'
};

axios.get(url, { headers, params })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Get Agent Performance

Retrieve performance metrics for agents.

### Endpoint

```
GET {{host-domain}}/api/v1/analytics/agents
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
| `startDate` | Yes | string | Start date (ISO 8601 format) |
| `endDate` | Yes | string | End date (ISO 8601 format) |
| `agentId` | No | string | Filter by specific agent ID |
| `campaignId` | No | string | Filter by campaign ID |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 401 | Unauthorized |
| 400 | Bad request |

### Response Schema

```json
{
  "success": true,
  "data": {
    "agents": [
      {
        "agentId": "string",
        "agentName": "string",
        "totalCalls": "number",
        "handledCalls": "number",
        "missedCalls": "number",
        "averageHandleTime": "number",
        "totalTalkTime": "number",
        "successRate": "number",
        "campaigns": [
          {
            "campaignId": "string",
            "campaignName": "string",
            "calls": "number"
          }
        ]
      }
    ],
    "summary": {
      "totalAgents": "number",
      "totalCalls": "number",
      "averageHandleTime": "number"
    }
  }
}
```

### Code Examples

#### cURL

```bash
curl -X GET "https://{{host-domain}}/api/v1/analytics/agents?startDate=2024-01-01T00:00:00Z&endDate=2024-01-31T23:59:59Z" \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "Authorization: Bearer your-token"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/analytics/agents"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "Authorization": "Bearer your-token"
}
params = {
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2024-01-31T23:59:59Z"
}

response = requests.get(url, headers=headers, params=params)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/analytics/agents';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'Authorization': 'Bearer your-token'
};
const params = {
  startDate: '2024-01-01T00:00:00Z',
  endDate: '2024-01-31T23:59:59Z'
};

axios.get(url, { headers, params })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```
