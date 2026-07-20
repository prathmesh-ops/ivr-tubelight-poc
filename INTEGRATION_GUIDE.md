# Tubelight CTI Integration - APIs, Prerequisites & Actions

## APIs Overview

### 1. I-frame Integration API
- **Purpose**: Display Tubelight dialer interface
- **URL**: `https://dashboard.hellotubelight.com/sso`
- **Method**: GET
- **Required Parameters**:
  - `agentVerificationKey`: Agent's unique ID/Email/UserName
  - `tenant`: Tenant identifier (e.g., `medikeezhealthcarell`)
- **Implementation**: `getTubelightIframeUrl()` in `src/lib/tubelight-api.js`

### 2. Click to Call API
- **Purpose**: Initiate outbound calls when agent is online
- **URL**: `https://dashboard.hellotubelight.com/tenant/v1/user/sso/agent/outbound-call`
- **Method**: POST
- **Required Headers**:
  - `X-TENANT-ID`: Tenant identifier
  - `Content-Type`: application/json
  - `access-key`: Generated access token
- **Required Body**:
  - `agentVerificationKey`: Agent's email ID
  - `customerNumber`: Customer's phone number
- **Implementation**: `initiateOutboundCall()` in `src/lib/tubelight-api.js`

### 3. Lead Insert API
- **Purpose**: Add contacts to a campaign
- **URL**: `https://dashboard.hellotubelight.com/tenant/v1/campaign/contacts/add`
- **Method**: POST
- **Required Headers**:
  - `X-TENANT-ID`: Tenant identifier
  - `Content-Type`: application/json
  - `access-key`: Generated access token
- **Required Body**:
  - `contacts`: Array of contact objects with mobileNumber, countryCode, and info
  - `campaignId`: Name of the campaign
- **Implementation**: `addContactsToCampaign()` in `src/lib/tubelight-api.js`

## Prerequisites

### Environment Variables Required
Create a `.env` file in the project root with the following variables:

```env
VITE_TUBELIGHT_TENANT_ID=medikeezhealthcarell
VITE_TUBELIGHT_ACCESS_KEY=your_access_key_here
VITE_TUBELIGHT_AGENT_VERIFICATION_KEY=agent@example.com
VITE_TUBELIGHT_BASE_URL=https://dashboard.hellotubelight.com
```

### Tubelight Account Setup
1. **Tenant Account**: Have a valid tenant ID (e.g., `medikeezhealthcarell`)
2. **Access Key Generation**:
   - Navigate to: Settings → Account Setting → Account → Security
   - Generate new access token
   - Store securely in environment variables
3. **Agent Account**: Create and verify agent account in Tubelight system
4. **Campaign Setup**: Create at least one campaign for lead insertion

### Development Environment
- **Node.js**: Installed (version 16+ recommended)
- **Package Manager**: npm or yarn
- **Dependencies**: Install via `npm install`

## Actions to Perform

### Phase 1: Initial Setup
- [ ] Copy `.env.example` to `.env`
- [ ] Fill in actual values for all environment variables
- [ ] Run `npm install` to install dependencies
- [ ] Verify Tubelight account credentials
- [ ] Generate access key from Tubelight dashboard
- [ ] Create/verify agent account in Tubelight
- [ ] Create at least one campaign for testing

### Phase 2: API Implementation Testing
- [ ] Test I-frame URL generation
- [ ] Test I-frame embedding in browser
- [ ] Verify I-frame persistence (no refresh on tab switch)
- [ ] Test Click to Call API with valid phone number
- [ ] Test Click to Call API with invalid phone number (error handling)
- [ ] Test Lead Insert API with sample contacts
- [ ] Verify contacts appear in Tubelight campaign

### Phase 3: Missing API Implementations (Contact Tubelight Support)
- [ ] Request Agent Status Check API
- [ ] Request Call Status Tracking API
- [ ] Request Campaign Management APIs (list, create, update)
- [ ] Request Contact Management APIs (retrieve, update, delete)
- [ ] Request Call History/Reporting APIs
- [ ] Request Webhook configuration for real-time updates
- [ ] Request complete error code documentation
- [ ] Request rate limiting details

### Phase 4: Security & Error Handling
- [ ] Implement secure storage of access keys
- [ ] Add comprehensive error handling for all API calls
- [ ] Implement retry logic for failed requests
- [ ] Add client-side rate limiting
- [ ] Implement I-frame PostMessage communication
- [ ] Add input validation for phone numbers
- [ ] Add logging for API calls and errors

### Phase 5: Testing & Validation
- [ ] Test with sandbox environment (if available)
- [ ] Validate phone number formats for different countries
- [ ] Test error scenarios (agent offline, invalid numbers, etc.)
- [ ] Test I-frame event handling
- [ ] Perform load testing for API endpoints
- [ ] Test cross-browser compatibility
- [ ] Test mobile responsiveness

### Phase 6: Production Deployment
- [ ] Configure production environment variables
- [ ] Set up monitoring for API calls
- [ ] Configure webhook endpoints (if available)
- [ ] Implement proper logging and analytics
- [ ] Set up alerting for API failures
- [ ] Document API usage and troubleshooting
- [ ] Train users on the integration

## Additional Information Needed from Tubelight

### Authentication & Security
- Access key expiration time and rotation policy
- Rate limits on API calls
- Multiple active keys support

### Phone Number Validation
- Valid phone number formats per country
- Supported country codes list
- Country code `0` validity

### Call Management
- Call status check API using `callTaskId`
- Webhook/callback mechanism for call updates
- Call recording and retrieval APIs
- Complete error codes and messages

### Contact Management
- Maximum batch size for contact uploads
- Contact deduplication logic
- Supported fields in `info` object

### I-frame Integration
- I-frame events and callbacks documentation
- PostMessage API for parent-child communication
- Customization options (theme, size, features)

### Testing
- Sandbox/test environment URL
- Test credentials and mock phone numbers
- Postman collection or API testing tools

## Current Implementation Status

### ✅ Implemented
- I-frame URL generation
- Click to Call API
- Lead Insert API
- Environment variable configuration
- Basic error handling

### ❌ Not Implemented (Requires Tubelight Support)
- Agent status checking
- Call status tracking
- Campaign management
- Contact CRUD operations
- Webhook integration
- Real-time updates
- Advanced error handling with specific error codes

## Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Support & Documentation

- **Technical Support**: Contact Tubelight for complete API documentation
- **API Versioning**: Verify current API version with Tubelight
- **SLA Details**: Request Service Level Agreement information
- **Changelog**: Ask for API update changelog
