import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card'
import { Button } from './Button'
import { ChevronRight, Lock, Key, Phone, PhoneCall, Users, BarChart3, Code2, Copy, Check } from 'lucide-react'

const DocumentationViewer = () => {
  const [activeCategory, setActiveCategory] = useState('authentication')
  const [copiedCode, setCopiedCode] = useState(null)

  const categories = [
    { id: 'authentication', name: 'Authentication', icon: Lock, color: 'text-blue-500' },
    { id: 'settings', name: 'Settings', icon: Key, color: 'text-green-500' },
    { id: 'call-management', name: 'Call Management', icon: PhoneCall, color: 'text-purple-500' },
    { id: 'campaign-management', name: 'Campaign Management', icon: Users, color: 'text-orange-500' },
    { id: 'reporting', name: 'Reporting', icon: BarChart3, color: 'text-pink-500' },
  ]

  const apiData = {
    authentication: [
      {
        name: 'Login',
        method: 'POST',
        endpoint: '/voice/api/v1/auth/login',
        description: 'The Login API enables user authentication by verifying valid credentials, such as a username and password.',
        auth: 'bearer',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        body: [
          { name: 'user_name', required: true, type: 'string', description: 'User name or email' },
          { name: 'password', required: true, type: 'string', description: 'Password' },
        ],
        response: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
          user: {}
        },
        codes: [
          { code: 200, description: 'Contact uploaded successfully' },
          { code: 404, description: 'User not found or invalid email/username provided' },
          { code: 406, description: 'X-TENANT-ID not provided' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
      {
        name: 'Generate new access key',
        method: 'PATCH',
        endpoint: '/voice/api/v1/tenant/access-key/{name}',
        description: 'The access key is used for authentication. Users can generate it based on their needs.',
        auth: 'bearer',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        pathParams: [
          { name: 'name', required: true, type: 'string', description: 'Access key name' },
        ],
        response: {
          success: true
        },
        codes: [
          { code: 200, description: 'Api success' },
          { code: 404, description: 'Not found!' },
          { code: 409, description: 'User Already Exist' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
      {
        name: 'List all access key',
        method: 'GET',
        endpoint: '/voice/api/v1/tenant/access-key/{name}',
        description: 'The access key is used for authentication. Users can obtain it as needed.',
        auth: 'bearer',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        pathParams: [
          { name: 'name', required: true, type: 'string', description: 'Access key name' },
        ],
        response: {
          success: true
        },
        codes: [
          { code: 200, description: 'Api success' },
          { code: 404, description: 'Not found!' },
          { code: 409, description: 'User Already Exist' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
      {
        name: 'Delete access key',
        method: 'DELETE',
        endpoint: '/voice/api/v1/tenant/access-key/{id}',
        description: 'The access key is used for authentication. Users can revoke it based on their needs.',
        auth: 'bearer, access-key',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        pathParams: [
          { name: 'id', required: true, type: 'string', description: 'Access key id' },
        ],
        response: {
          success: true
        },
        codes: [
          { code: 200, description: 'Api success' },
          { code: 403, description: 'You are not allowed to access this resource.' },
          { code: 404, description: 'User not found!' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
    ],
    settings: [
      {
        name: 'Fetches a list of available caller IDs',
        method: 'GET',
        endpoint: '/voice/api/v1/setting/phone-number/list',
        description: 'This API retrieves all caller IDs associated with the account, allowing users to view the available caller IDs for use in outbound calls.',
        auth: 'bearer, access-key',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        queryParams: [
          { name: 'limit', required: true, type: 'number', description: 'Limit' },
          { name: 'page_no', required: true, type: 'number', description: 'Page number' },
          { name: 'search', required: false, type: 'string', description: 'input' },
          { name: 'orderBy', required: false, type: 'string', description: 'Order by (Field name)' },
        ],
        response: {
          success: true
        },
        codes: [
          { code: 200, description: 'Api success' },
          { code: 403, description: 'You are not allowed to access this resource.' },
          { code: 404, description: 'not found!' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
      {
        name: 'Upload a sound file',
        method: 'POST',
        endpoint: '/voice/api/v1/setting/sound',
        description: 'This API allows users to upload sound files to the server. The uploaded file is stored in a predefined directory.',
        auth: 'bearer',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'Content-Type', required: true, type: 'string', description: 'multipart/form-data' },
        ],
        body: [
          { name: 'file', required: false, type: 'file', description: 'Audio file url (Allow Only audio)' },
          { name: 'name', required: true, type: 'string', description: 'name' },
        ],
        response: {
          success: true
        },
        codes: [
          { code: 200, description: 'Api success' },
          { code: 403, description: 'You are not allowed to access this resource.' },
          { code: 404, description: 'Not found!' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
    ],
    'call-management': [
      {
        name: 'Call and Connect',
        method: 'POST',
        endpoint: '/voice/api/v1/cpaas/calls/callAndConnect',
        description: 'Initiates a two-leg call, connecting an agent to a customer.',
        auth: 'bearer, access-key',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'access-key', required: true, type: 'string', description: 'The access key used for authentication' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        body: [
          { name: 'type', required: false, type: 'any', description: 'Type' },
          { name: 'call1', required: false, type: 'any', description: 'Call 1 details' },
          { name: 'call2', required: false, type: 'any', description: 'Call 2 details' },
          { name: 'callbackUrl', required: false, type: 'any', description: 'Callback URL' },
          { name: 'extraParams', required: false, type: 'any', description: 'Extra parameters' },
        ],
        response: {
          success: true
        },
        codes: [
          { code: 200, description: 'Api success' },
          { code: 404, description: 'Not found!' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
      {
        name: 'Call and Park',
        method: 'POST',
        endpoint: '/voice/api/v1/cpaas/calls/callAndPark',
        description: 'Initiates a call and parks it in a queue.',
        auth: 'bearer, access-key',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'access-key', required: true, type: 'string', description: 'The access key used for authentication' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        body: [
          { name: 'type', required: false, type: 'any', description: 'Type' },
          { name: 'call1', required: false, type: 'any', description: 'Call 1 details' },
        ],
        response: {
          success: true
        },
        codes: [
          { code: 200, description: 'Api success' },
          { code: 404, description: 'Not found!' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
      {
        name: 'Call and Merge',
        method: 'POST',
        endpoint: '/voice/api/v1/cpaas/calls/callAndMerge',
        description: 'Initiates a call and merges it with an existing call.',
        auth: 'bearer, access-key',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'access-key', required: true, type: 'string', description: 'The access key used for authentication' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        body: [
          { name: 'type', required: false, type: 'any', description: 'Type' },
          { name: 'sessionId', required: false, type: 'any', description: 'Session ID' },
          { name: 'call', required: false, type: 'any', description: 'Call details' },
        ],
        response: {
          success: true
        },
        codes: [
          { code: 200, description: 'Api success' },
          { code: 404, description: 'Not found!' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
      {
        name: 'Call and Play',
        method: 'POST',
        endpoint: '/voice/api/v1/cpaas/calls/callAndPlay',
        description: 'Initiates a call and plays a predefined audio message.',
        auth: 'bearer, access-key',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'access-key', required: true, type: 'string', description: 'The access key used for authentication' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        body: [
          { name: 'type', required: false, type: 'any', description: 'Type' },
          { name: 'call1', required: false, type: 'any', description: 'Call 1 details' },
          { name: 'music', required: false, type: 'any', description: 'Music file' },
          { name: 'repeatCount', required: false, type: 'any', description: 'Repeat count' },
        ],
        response: {
          success: true
        },
        codes: [
          { code: 200, description: 'Api success' },
          { code: 404, description: 'Not found!' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
      {
        name: 'Call and Speak',
        method: 'POST',
        endpoint: '/voice/api/v1/cpaas/calls/callAndSpeak',
        description: 'Initiates a call and plays a text-to-speech (TTS) message.',
        auth: 'bearer, access-key',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'access-key', required: true, type: 'string', description: 'The access key used for authentication' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        body: [
          { name: 'type', required: false, type: 'any', description: 'Type' },
          { name: 'call1', required: false, type: 'any', description: 'Call 1 details' },
          { name: 'text', required: false, type: 'any', description: 'Text to speak' },
          { name: 'voice', required: false, type: 'any', description: 'Voice configuration' },
          { name: 'repeatCount', required: false, type: 'any', description: 'Repeat count' },
        ],
        response: {
          success: true
        },
        codes: [
          { code: 200, description: 'Api success' },
          { code: 404, description: 'Not found!' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
      {
        name: 'Mute',
        method: 'POST',
        endpoint: '/voice/api/v1/cpaas/calls/mute',
        description: 'Mutes an ongoing call.',
        auth: 'bearer, access-key',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'access-key', required: true, type: 'string', description: 'The access key used for authentication' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        body: [
          { name: 'type', required: false, type: 'any', description: 'Type' },
          { name: 'sessionId', required: false, type: 'any', description: 'Session ID' },
          { name: 'callId', required: false, type: 'any', description: 'Call ID' },
        ],
        response: {
          success: true
        },
        codes: [
          { code: 200, description: 'Api success' },
          { code: 404, description: 'Not found!' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
      {
        name: 'Unmute',
        method: 'POST',
        endpoint: '/voice/api/v1/cpaas/calls/unmute',
        description: 'Unmutes an existing call.',
        auth: 'bearer, access-key',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'access-key', required: true, type: 'string', description: 'The access key used for authentication' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        body: [
          { name: 'type', required: false, type: 'any', description: 'Type' },
          { name: 'sessionId', required: false, type: 'any', description: 'Session ID' },
          { name: 'callId', required: false, type: 'any', description: 'Call ID' },
        ],
        response: {
          success: true
        },
        codes: [
          { code: 200, description: 'Api success' },
          { code: 404, description: 'Not found!' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
      {
        name: 'Hold',
        method: 'POST',
        endpoint: '/voice/api/v1/cpaas/calls/Hold',
        description: 'Holds an existing call.',
        auth: 'bearer, access-key',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'access-key', required: true, type: 'string', description: 'The access key used for authentication' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        body: [
          { name: 'type', required: false, type: 'any', description: 'Type' },
          { name: 'sessionId', required: false, type: 'any', description: 'Session ID' },
          { name: 'callId', required: false, type: 'any', description: 'Call ID' },
          { name: 'music', required: false, type: 'any', description: 'Music file' },
        ],
        response: {
          success: true
        },
        codes: [
          { code: 200, description: 'Api success' },
          { code: 404, description: 'Not found!' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
      {
        name: 'UnHold',
        method: 'POST',
        endpoint: '/voice/api/v1/cpaas/calls/UnHold',
        description: 'Unhold an existing call.',
        auth: 'bearer, access-key',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'access-key', required: true, type: 'string', description: 'The access key used for authentication' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        body: [
          { name: 'type', required: false, type: 'any', description: 'Type' },
          { name: 'sessionId', required: false, type: 'any', description: 'Session ID' },
          { name: 'callId', required: false, type: 'any', description: 'Call ID' },
        ],
        response: {
          success: true
        },
        codes: [
          { code: 200, description: 'Api success' },
          { code: 404, description: 'Not found!' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
      {
        name: 'DTMF',
        method: 'POST',
        endpoint: '/voice/api/v1/cpaas/calls/DTMF',
        description: 'Captures and processes DTMF inputs from a call.',
        auth: 'bearer, access-key',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'access-key', required: true, type: 'string', description: 'The access key used for authentication' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        body: [
          { name: 'type', required: false, type: 'any', description: 'Type' },
          { name: 'sessionId', required: false, type: 'any', description: 'Session ID' },
          { name: 'callId1', required: false, type: 'any', description: 'Call ID' },
          { name: 'dtmf', required: false, type: 'any', description: 'DTMF value' },
        ],
        response: {
          success: true
        },
        codes: [
          { code: 200, description: 'Api success' },
          { code: 404, description: 'Not found!' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
      {
        name: 'Merge',
        method: 'POST',
        endpoint: '/voice/api/v1/cpaas/calls/merge',
        description: 'Merges an existing call with another active call.',
        auth: 'bearer, access-key',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'access-key', required: true, type: 'string', description: 'The access key used for authentication' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        body: [
          { name: 'type', required: false, type: 'any', description: 'Type' },
          { name: 'sessionId', required: false, type: 'any', description: 'Session ID' },
          { name: 'callId1', required: false, type: 'any', description: 'Call ID 1' },
          { name: 'callId2', required: false, type: 'any', description: 'Call ID 2' },
        ],
        response: {
          success: true
        },
        codes: [
          { code: 200, description: 'Api success' },
          { code: 404, description: 'Not found!' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
      {
        name: 'Play Audio Endless',
        method: 'POST',
        endpoint: '/voice/api/v1/cpaas/calls/playAudioEndless',
        description: 'Plays audio continuously until a stop command is given.',
        auth: 'bearer, access-key',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'access-key', required: true, type: 'string', description: 'The access key used for authentication' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        body: [
          { name: 'type', required: false, type: 'any', description: 'Type' },
          { name: 'sessionId', required: false, type: 'any', description: 'Session ID' },
          { name: 'callId', required: false, type: 'any', description: 'Call ID' },
          { name: 'music', required: false, type: 'any', description: 'Music file' },
        ],
        response: {
          success: true
        },
        codes: [
          { code: 200, description: 'Api success' },
          { code: 404, description: 'Not found!' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
      {
        name: 'Play Audio Stop',
        method: 'POST',
        endpoint: '/voice/api/v1/cpaas/calls/playAudioStop',
        description: 'Stops the audio playback during an ongoing call.',
        auth: 'bearer, access-key',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'access-key', required: true, type: 'string', description: 'The access key used for authentication' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        body: [
          { name: 'type', required: false, type: 'any', description: 'Type' },
          { name: 'sessionId', required: false, type: 'any', description: 'Session ID' },
          { name: 'callId', required: false, type: 'any', description: 'Call ID' },
        ],
        response: {
          success: true
        },
        codes: [
          { code: 200, description: 'Api success' },
          { code: 404, description: 'Not found!' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
      {
        name: 'Hangup',
        method: 'POST',
        endpoint: '/voice/api/v1/cpaas/calls/hungup',
        description: 'Hang up an ongoing call.',
        auth: 'bearer, access-key',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'access-key', required: true, type: 'string', description: 'The access key used for authentication' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        body: [
          { name: 'type', required: false, type: 'any', description: 'Type' },
          { name: 'sessionId', required: false, type: 'any', description: 'Session ID' },
          { name: 'callId', required: false, type: 'any', description: 'Call ID' },
        ],
        response: {
          success: true
        },
        codes: [
          { code: 200, description: 'Api success' },
          { code: 404, description: 'Not found!' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
      {
        name: 'Call and Monitor',
        method: 'POST',
        endpoint: '/voice/api/v1/cpaas/calls/callAndMonitor',
        description: 'Initiates and monitors calls for administrative purposes.',
        auth: 'bearer, access-key',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'access-key', required: true, type: 'string', description: 'The access key used for authentication' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        body: [
          { name: 'type', required: false, type: 'any', description: 'Type' },
          { name: 'sessionId', required: false, type: 'any', description: 'Session ID' },
          { name: 'callId', required: false, type: 'any', description: 'Call ID' },
          { name: 'call', required: false, type: 'any', description: 'Call details' },
        ],
        response: {
          success: true
        },
        codes: [
          { code: 200, description: 'Api success' },
          { code: 404, description: 'Not found!' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
      {
        name: 'Answer and Park',
        method: 'POST',
        endpoint: '/voice/api/v1/cpaas/calls/answerAndPark',
        description: 'Answers an incoming call and parks it.',
        auth: 'bearer, access-key',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'access-key', required: true, type: 'string', description: 'The access key used for authentication' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        body: [
          { name: 'type', required: false, type: 'any', description: 'Type' },
          { name: 'sessionId', required: false, type: 'any', description: 'Session ID' },
          { name: 'callId', required: false, type: 'any', description: 'Call ID' },
        ],
        response: {
          success: true
        },
        codes: [
          { code: 200, description: 'Api success' },
          { code: 404, description: 'Not found!' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
    ],
    'campaign-management': [
      {
        name: 'Insert a new lead into the system',
        method: 'POST',
        endpoint: '/voice/api/v1/campaign/contacts/add',
        description: 'This API allows users to insert a new lead with relevant details such as name, contact information, and other lead-specific attributes.',
        auth: 'bearer, access-key',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        body: [
          { name: 'contacts', required: true, type: 'array', description: 'bulkContactDto' },
          { name: 'campaignId', required: true, type: 'string', description: 'campaignId / campaign Name' },
          { name: 'contactList', required: false, type: 'string', description: 'Contact List' },
          { name: 'musicFile', required: false, type: 'string', description: 'Music File' },
        ],
        response: {
          message: 'Contact uploaded in campaign list',
          details: []
        },
        codes: [
          { code: 200, description: 'Contact uploaded successfully' },
          { code: 401, description: 'Unauthorized - Please login to continue' },
          { code: 403, description: 'You are not allowed to access this resource.' },
          { code: 404, description: 'User not found!' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
      {
        name: 'Agent outbound call (SSO)',
        method: 'POST',
        endpoint: '/voice/api/v1/user/sso/agent/outbound-call',
        description: 'Handles outbound call initiation for an agent through SSO authentication.',
        auth: 'bearer, access-key',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        body: [
          { name: 'agentVerificationKey', required: true, type: 'string', description: 'Agent Verification Key' },
          { name: 'customerNumber', required: true, type: 'string', description: 'customerNumber' },
          { name: 'team', required: true, type: 'string', description: 'team' },
          { name: 'from', required: false, type: 'string', description: 'From which integration' },
          { name: 'extraParams', required: false, type: 'object', description: 'extraParams' },
        ],
        response: {
          message: 'Call generated.',
          callTaskId: 'b262615b-ce11-4468-8677-2486cd38693b'
        },
        codes: [
          { code: 200, description: 'Contact uploaded successfully' },
          { code: 401, description: 'Unauthorized - Please login to continue' },
          { code: 403, description: 'You are not allowed to access this resource.' },
          { code: 404, description: 'User not found!' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
      {
        name: 'Agent call dispose',
        method: 'POST',
        endpoint: '/voice/api/v1/user/sso/agent/call-dispose',
        description: 'Dispose of an agent current call.',
        auth: 'bearer, access-key',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        body: [
          { name: 'agentVerificationKey', required: true, type: 'string', description: 'agentVerificationKey' },
          { name: 'disposition', required: true, type: 'string', description: 'dispose name' },
          { name: 'secondDispose', required: true, type: 'string', description: 'second level dispose name' },
          { name: 'thirdDispose', required: true, type: 'string', description: 'third level dispose name' },
          { name: 'callBack', required: true, type: 'boolean', description: 'callback true/false' },
          { name: 'callBackDate', required: true, type: 'string', description: 'callback true/false' },
          { name: 'comment', required: false, type: 'string', description: 'comment' },
        ],
        response: {
          success: true
        },
        codes: [
          { code: 200, description: 'Api success' },
          { code: 403, description: 'You are not allowed to access this resource.' },
          { code: 404, description: 'User not found!' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
    ],
    reporting: [
      {
        name: 'Fetches a list of Call Detail Records (CDR) reports',
        method: 'POST',
        endpoint: '/voice/api/v1/voice-cdr-report/list',
        description: 'This API retrieves a list of CDR reports, providing details of call activity within a specific time range.',
        auth: 'bearer, access-key',
        headers: [
          { name: 'X-TENANT-ID', required: true, type: 'string', description: 'Tenant id' },
          { name: 'Content-Type', required: true, type: 'string', description: 'application/json' },
        ],
        body: [
          { name: 'limit', required: true, type: 'number', description: 'Limit' },
          { name: 'page_no', required: true, type: 'number', description: 'Page number' },
          { name: 'search', required: false, type: 'string', description: 'input' },
          { name: 'orderBy', required: false, type: 'string', description: 'Order by (Field name)' },
          { name: 'order', required: false, type: 'string', description: 'Order by' },
          { name: 'filterVariable', required: false, type: 'string', description: 'Order by' },
          { name: 'filterVariableValueType', required: false, type: 'string', description: 'Order by' },
          { name: 'filterValue', required: false, type: 'object', description: 'Order by' },
          { name: 'excluded', required: false, type: 'array', description: 'excluded user' },
          { name: 'includes', required: false, type: 'array', description: 'includes user' },
          { name: 'tags', required: false, type: 'array', description: 'tags' },
          { name: 'subType', required: false, type: 'string', description: 'sub type' },
          { name: 'agentId', required: false, type: 'object', description: 'sub type' },
          { name: 'source', required: false, type: 'string', description: 'source' },
          { name: 'freeTextSearch', required: false, type: 'string', description: 'freeTextSearch' },
          { name: 'to', required: false, type: 'string', description: 'to' },
          { name: 'status', required: false, type: 'string', description: 'status' },
          { name: 'sendStartTime', required: false, type: 'string', description: 'sendStartTime' },
          { name: 'selectedCampaign', required: false, type: 'array', description: 'selectedCampaign' },
          { name: 'sendEndTime', required: false, type: 'string', description: 'sendEndTime' },
          { name: 'requireDetail', required: false, type: 'object', description: 'requireDetail' },
          { name: 'timezone', required: false, type: 'object', description: 'timezone' },
          { name: 'listConfig', required: false, type: 'object', description: 'listConfig' },
          { name: 'columFilter', required: false, type: 'object', description: 'columFilter' },
          { name: 'finalDespositionLevel1', required: false, type: 'array', description: 'selectedCampaign' },
          { name: 'finalDespositionLevel2', required: false, type: 'array', description: 'selectedCampaign' },
          { name: 'finalDespositionLevel0', required: false, type: 'array', description: 'selectedCampaign' },
        ],
        response: {
          success: true
        },
        codes: [
          { code: 200, description: 'Api success' },
          { code: 403, description: 'You are not allowed to access this resource.' },
          { code: 404, description: 'not found!' },
          { code: 422, description: 'Bad Request or API error message' },
          { code: 500, description: 'Internal server error!' },
        ]
      },
    ],
  }

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const currentAPIs = apiData[activeCategory] || []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0">
          <div className="sticky top-4 space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Categories
            </h2>
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${activeCategory === category.id ? '' : category.color}`} />
                  <span className="font-medium">{category.name}</span>
                  {activeCategory === category.id && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </button>
              )
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-6">
          {currentAPIs.map((api, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-md text-sm font-mono ${
                        api.method === 'GET' ? 'bg-green-100 text-green-700' :
                        api.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                        api.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                        api.method === 'PATCH' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {api.method}
                      </span>
                      {api.name}
                    </CardTitle>
                    <CardDescription className="font-mono text-sm bg-muted p-2 rounded">
                      {api.endpoint}
                    </CardDescription>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{api.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Lock className="w-4 h-4" />
                  <span className="font-medium">Authentication:</span>
                  <span className="text-muted-foreground">{api.auth}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Headers */}
                {api.headers && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Code2 className="w-4 h-4" />
                      Headers
                    </h4>
                    <div className="rounded-md border">
                      <table className="w-full text-sm">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-2 text-left font-medium">Header</th>
                            <th className="px-4 py-2 text-left font-medium">Required</th>
                            <th className="px-4 py-2 text-left font-medium">Type</th>
                            <th className="px-4 py-2 text-left font-medium">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {api.headers.map((header, i) => (
                            <tr key={i} className="border-t">
                              <td className="px-4 py-2 font-mono">{header.name}</td>
                              <td className="px-4 py-2">
                                {header.required ? (
                                  <span className="text-green-600">Yes</span>
                                ) : (
                                  <span className="text-muted-foreground">No</span>
                                )}
                              </td>
                              <td className="px-4 py-2 font-mono text-xs">{header.type}</td>
                              <td className="px-4 py-2 text-muted-foreground">{header.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Path Parameters */}
                {api.pathParams && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Code2 className="w-4 h-4" />
                      Path Parameters
                    </h4>
                    <div className="rounded-md border">
                      <table className="w-full text-sm">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-2 text-left font-medium">Parameter</th>
                            <th className="px-4 py-2 text-left font-medium">Required</th>
                            <th className="px-4 py-2 text-left font-medium">Type</th>
                            <th className="px-4 py-2 text-left font-medium">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {api.pathParams.map((param, i) => (
                            <tr key={i} className="border-t">
                              <td className="px-4 py-2 font-mono">{param.name}</td>
                              <td className="px-4 py-2">
                                {param.required ? (
                                  <span className="text-green-600">Yes</span>
                                ) : (
                                  <span className="text-muted-foreground">No</span>
                                )}
                              </td>
                              <td className="px-4 py-2 font-mono text-xs">{param.type}</td>
                              <td className="px-4 py-2 text-muted-foreground">{param.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Query Parameters */}
                {api.queryParams && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Code2 className="w-4 h-4" />
                      Query Parameters
                    </h4>
                    <div className="rounded-md border">
                      <table className="w-full text-sm">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-2 text-left font-medium">Parameter</th>
                            <th className="px-4 py-2 text-left font-medium">Required</th>
                            <th className="px-4 py-2 text-left font-medium">Type</th>
                            <th className="px-4 py-2 text-left font-medium">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {api.queryParams.map((param, i) => (
                            <tr key={i} className="border-t">
                              <td className="px-4 py-2 font-mono">{param.name}</td>
                              <td className="px-4 py-2">
                                {param.required ? (
                                  <span className="text-green-600">Yes</span>
                                ) : (
                                  <span className="text-muted-foreground">No</span>
                                )}
                              </td>
                              <td className="px-4 py-2 font-mono text-xs">{param.type}</td>
                              <td className="px-4 py-2 text-muted-foreground">{param.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Request Body */}
                {api.body && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Code2 className="w-4 h-4" />
                      Request Body
                    </h4>
                    <div className="rounded-md border">
                      <table className="w-full text-sm">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-2 text-left font-medium">Parameter</th>
                            <th className="px-4 py-2 text-left font-medium">Required</th>
                            <th className="px-4 py-2 text-left font-medium">Type</th>
                            <th className="px-4 py-2 text-left font-medium">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {api.body.map((param, i) => (
                            <tr key={i} className="border-t">
                              <td className="px-4 py-2 font-mono">{param.name}</td>
                              <td className="px-4 py-2">
                                {param.required ? (
                                  <span className="text-green-600">Yes</span>
                                ) : (
                                  <span className="text-muted-foreground">No</span>
                                )}
                              </td>
                              <td className="px-4 py-2 font-mono text-xs">{param.type}</td>
                              <td className="px-4 py-2 text-muted-foreground">{param.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Response */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    Response Schema
                  </h4>
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(JSON.stringify(api.response, null, 2), `response-${index}`)}
                    >
                      {copiedCode === `response-${index}` ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                      <code>{JSON.stringify(api.response, null, 2)}</code>
                    </pre>
                  </div>
                </div>

                {/* Response Codes */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    Response Codes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {api.codes.map((code, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-md text-sm font-mono ${
                          code.code >= 200 && code.code < 300
                            ? 'bg-green-100 text-green-700'
                            : code.code >= 400 && code.code < 500
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {code.code} - {code.description}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </main>
      </div>
    </div>
  )
}

export default DocumentationViewer
