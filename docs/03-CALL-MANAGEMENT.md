# Call Management APIs

This section covers call initiation, control, and monitoring APIs.

## Table of Contents

- [Initiate Call](#initiate-call)
- [Hangup Call](#hangup-call)
- [Hold Call](#hold-call)
- [Unhold Call](#unhold-call)
- [Transfer Call](#transfer-call)
- [Mute Call](#mute-call)
- [Unmute Call](#unmute-call)
- [Get Call Status](#get-call-status)
- [List Active Calls](#list-active-calls)
- [Play Audio on Call](#play-audio-on-call)
- [Stop Audio on Call](#stop-audio-on-call)
- [Send DTMF](#send-dtmf)

---

## Initiate Call

Initiate a new outbound call.

### Endpoint

```
POST {{host-domain}}/api/v1/calls/initiate
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
| `phoneNumber` | Yes | string | Destination phone number |
| `callerId` | No | string | Caller ID to display |
| `campaignId` | No | string | Associated campaign ID |
| `metadata` | No | object | Custom metadata for the call |

### Response Codes

| Code | Description |
|------|-------------|
| 201 | Call initiated successfully |
| 401 | Unauthorized |
| 400 | Bad request |

### Response Schema

```json
{
  "success": true,
  "data": {
    "callId": "string",
    "phoneNumber": "string",
    "callerId": "string",
    "status": "initiated",
    "direction": "outbound",
    "campaignId": "string",
    "metadata": {},
    "createdAt": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X POST https://{{host-domain}}/api/v1/calls/initiate \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key" \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+1234567890",
    "callerId": "+1987654321",
    "campaignId": "campaign-123",
    "metadata": {
      "customerName": "John Doe"
    }
  }'
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/calls/initiate"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "access-key": "your-access-key",
    "Content-Type": "application/json"
}
data = {
    "phoneNumber": "+1234567890",
    "callerId": "+1987654321",
    "campaignId": "campaign-123",
    "metadata": {
        "customerName": "John Doe"
    }
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/calls/initiate';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key',
  'Content-Type': 'application/json'
};
const data = {
  phoneNumber: '+1234567890',
  callerId: '+1987654321',
  campaignId: 'campaign-123',
  metadata: {
    customerName: 'John Doe'
  }
};

axios.post(url, data, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Hangup Call

Terminate an active call.

### Endpoint

```
POST {{host-domain}}/api/v1/calls/{callId}/hangup
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
| `callId` | Yes | string | ID of the call to hangup |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Call terminated successfully |
| 401 | Unauthorized |
| 404 | Call not found |

### Response Schema

```json
{
  "success": true,
  "data": {
    "callId": "string",
    "status": "terminated",
    "terminatedAt": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X POST https://{{host-domain}}/api/v1/calls/{callId}/hangup \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/calls/{callId}/hangup"
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

const url = 'https://{{host-domain}}/api/v1/calls/{callId}/hangup';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key'
};

axios.post(url, {}, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Hold Call

Place an active call on hold.

### Endpoint

```
POST {{host-domain}}/api/v1/calls/{callId}/hold
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
| `callId` | Yes | string | ID of the call to hold |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Call placed on hold |
| 401 | Unauthorized |
| 404 | Call not found |

### Response Schema

```json
{
  "success": true,
  "data": {
    "callId": "string",
    "status": "on-hold",
    "heldAt": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X POST https://{{host-domain}}/api/v1/calls/{callId}/hold \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/calls/{callId}/hold"
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

const url = 'https://{{host-domain}}/api/v1/calls/{callId}/hold';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key'
};

axios.post(url, {}, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Unhold Call

Resume a call that is on hold.

### Endpoint

```
POST {{host-domain}}/api/v1/calls/{callId}/unhold
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
| `callId` | Yes | string | ID of the call to unhold |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Call resumed from hold |
| 401 | Unauthorized |
| 404 | Call not found |

### Response Schema

```json
{
  "success": true,
  "data": {
    "callId": "string",
    "status": "active",
    "resumedAt": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X POST https://{{host-domain}}/api/v1/calls/{callId}/unhold \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/calls/{callId}/unhold"
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

const url = 'https://{{host-domain}}/api/v1/calls/{callId}/unhold';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key'
};

axios.post(url, {}, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Transfer Call

Transfer an active call to another number or agent.

### Endpoint

```
POST {{host-domain}}/api/v1/calls/{callId}/transfer
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
| `callId` | Yes | string | ID of the call to transfer |

### Request Body

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `destination` | Yes | string | Destination phone number or agent ID |
| `type` | Yes | string | Transfer type (blind/attended) |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Call transferred successfully |
| 401 | Unauthorized |
| 404 | Call not found |
| 400 | Bad request |

### Response Schema

```json
{
  "success": true,
  "data": {
    "callId": "string",
    "status": "transferred",
    "destination": "string",
    "type": "string",
    "transferredAt": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X POST https://{{host-domain}}/api/v1/calls/{callId}/transfer \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key" \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "+1987654321",
    "type": "blind"
  }'
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/calls/{callId}/transfer"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "access-key": "your-access-key",
    "Content-Type": "application/json"
}
data = {
    "destination": "+1987654321",
    "type": "blind"
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/calls/{callId}/transfer';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key',
  'Content-Type': 'application/json'
};
const data = {
  destination: '+1987654321',
  type: 'blind'
};

axios.post(url, data, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Mute Call

Mute the audio on an active call.

### Endpoint

```
POST {{host-domain}}/api/v1/calls/{callId}/mute
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
| `callId` | Yes | string | ID of the call to mute |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Call muted successfully |
| 401 | Unauthorized |
| 404 | Call not found |

### Response Schema

```json
{
  "success": true,
  "data": {
    "callId": "string",
    "status": "muted",
    "mutedAt": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X POST https://{{host-domain}}/api/v1/calls/{callId}/mute \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/calls/{callId}/mute"
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

const url = 'https://{{host-domain}}/api/v1/calls/{callId}/mute';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key'
};

axios.post(url, {}, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Unmute Call

Unmute the audio on a muted call.

### Endpoint

```
POST {{host-domain}}/api/v1/calls/{callId}/unmute
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
| `callId` | Yes | string | ID of the call to unmute |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Call unmuted successfully |
| 401 | Unauthorized |
| 404 | Call not found |

### Response Schema

```json
{
  "success": true,
  "data": {
    "callId": "string",
    "status": "active",
    "unmutedAt": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X POST https://{{host-domain}}/api/v1/calls/{callId}/unmute \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/calls/{callId}/unmute"
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

const url = 'https://{{host-domain}}/api/v1/calls/{callId}/unmute';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key'
};

axios.post(url, {}, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Get Call Status

Retrieve the current status of a specific call.

### Endpoint

```
GET {{host-domain}}/api/v1/calls/{callId}/status
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
| `callId` | Yes | string | ID of the call |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 401 | Unauthorized |
| 404 | Call not found |

### Response Schema

```json
{
  "success": true,
  "data": {
    "callId": "string",
    "phoneNumber": "string",
    "status": "string",
    "direction": "string",
    "duration": "number",
    "startTime": "string",
    "endTime": "string",
    "agentId": "string",
    "campaignId": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X GET https://{{host-domain}}/api/v1/calls/{callId}/status \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/calls/{callId}/status"
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

const url = 'https://{{host-domain}}/api/v1/calls/{callId}/status';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key'
};

axios.get(url, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## List Active Calls

Retrieve all currently active calls for the tenant.

### Endpoint

```
GET {{host-domain}}/api/v1/calls/active
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
| `campaignId` | No | string | Filter by campaign ID |

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
    "calls": [
      {
        "callId": "string",
        "phoneNumber": "string",
        "status": "string",
        "direction": "string",
        "duration": "number",
        "startTime": "string",
        "agentId": "string",
        "campaignId": "string"
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
curl -X GET https://{{host-domain}}/api/v1/calls/active?page=1&limit=20 \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/calls/active"
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

const url = 'https://{{host-domain}}/api/v1/calls/active';
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

## Play Audio on Call

Play an audio file on an active call.

### Endpoint

```
POST {{host-domain}}/api/v1/calls/{callId}/play-audio
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
| `callId` | Yes | string | ID of the call |

### Request Body

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `soundFileId` | Yes | string | ID of the sound file to play |
| `loop` | No | boolean | Whether to loop the audio (default: false) |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Audio playback started |
| 401 | Unauthorized |
| 404 | Call or sound file not found |

### Response Schema

```json
{
  "success": true,
  "data": {
    "callId": "string",
    "soundFileId": "string",
    "status": "playing",
    "startedAt": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X POST https://{{host-domain}}/api/v1/calls/{callId}/play-audio \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key" \
  -H "Content-Type: application/json" \
  -d '{
    "soundFileId": "sound-file-123",
    "loop": false
  }'
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/calls/{callId}/play-audio"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "access-key": "your-access-key",
    "Content-Type": "application/json"
}
data = {
    "soundFileId": "sound-file-123",
    "loop": False
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/calls/{callId}/play-audio';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key',
  'Content-Type': 'application/json'
};
const data = {
  soundFileId: 'sound-file-123',
  loop: false
};

axios.post(url, data, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Stop Audio on Call

Stop audio playback on an active call.

### Endpoint

```
POST {{host-domain}}/api/v1/calls/{callId}/stop-audio
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
| `callId` | Yes | string | ID of the call |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Audio playback stopped |
| 401 | Unauthorized |
| 404 | Call not found |

### Response Schema

```json
{
  "success": true,
  "data": {
    "callId": "string",
    "status": "stopped",
    "stoppedAt": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X POST https://{{host-domain}}/api/v1/calls/{callId}/stop-audio \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key"
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/calls/{callId}/stop-audio"
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

const url = 'https://{{host-domain}}/api/v1/calls/{callId}/stop-audio';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key'
};

axios.post(url, {}, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Send DTMF

Send DTMF (dual-tone multi-frequency) tones to an active call.

### Endpoint

```
POST {{host-domain}}/api/v1/calls/{callId}/dtmf
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
| `callId` | Yes | string | ID of the call |

### Request Body

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `digits` | Yes | string | DTMF digits to send (0-9, *, #) |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | DTMF sent successfully |
| 401 | Unauthorized |
| 404 | Call not found |

### Response Schema

```json
{
  "success": true,
  "data": {
    "callId": "string",
    "digits": "string",
    "sentAt": "string"
  }
}
```

### Code Examples

#### cURL

```bash
curl -X POST https://{{host-domain}}/api/v1/calls/{callId}/dtmf \
  -H "X-TENANT-ID: your-tenant-id" \
  -H "access-key: your-access-key" \
  -H "Content-Type: application/json" \
  -d '{
    "digits": "1234#"
  }'
```

#### Python

```python
import requests

url = "https://{{host-domain}}/api/v1/calls/{callId}/dtmf"
headers = {
    "X-TENANT-ID": "your-tenant-id",
    "access-key": "your-access-key",
    "Content-Type": "application/json"
}
data = {
    "digits": "1234#"
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```

#### Node.js

```javascript
const axios = require('axios');

const url = 'https://{{host-domain}}/api/v1/calls/{callId}/dtmf';
const headers = {
  'X-TENANT-ID': 'your-tenant-id',
  'access-key': 'your-access-key',
  'Content-Type': 'application/json'
};
const data = {
  digits: '1234#'
};

axios.post(url, data, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```
