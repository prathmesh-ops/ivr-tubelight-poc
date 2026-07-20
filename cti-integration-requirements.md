# CTI POP I-frame API - Integration Requirements Analysis

## Overview
This document analyzes the CTI (Computer Telephony Integration) POP I-frame API documentation and identifies additional requirements needed to perform the operations.

## Provided API Endpoints

### 1. I-frame Integration
- **Purpose**: Display the Tubelight dialer interface
- **URL**: `https://dashboard.hellotubelight.com/sso`
- **Required Parameters**:
  - `agentVerificationKey`: Agent's unique ID/Email/UserName
  - `tenant`: Tenant identifier (e.g., `medikeezhealthcarell`)
- **Requirements**: I-frame should not refresh on page/tab switching

### 2. Click to Call API
- **Purpose**: Initiate outbound calls when agent is online
- **Method**: POST
- **URL**: `https://dashboard.hellotubelight.com/tenant/v1/user/sso/agent/outbound-call`
- **Required Headers**:
  - `X-TENANT-ID`: Tenant identifier
  - `Content-Type`: application/json
  - `access-key`: Generated access token
- **Required Body**:
  - `agentVerificationKey`: Agent's email ID
  - `customerNumber`: Customer's phone number

### 3. Lead Insert API
- **Purpose**: Add contacts to a campaign
- **Method**: POST
- **URL**: `https://dashboard.hellotubelight.com/tenant/v1/campaign/contacts/add`
- **Required Headers**:
  - `X-TENANT-ID`: Tenant identifier
  - `Content-Type`: application/json
  - `access-key`: Generated access token
- **Required Body**:
  - `contacts`: Array of contact objects with mobileNumber, countryCode, and info
  - `campaignId`: Name of the campaign

## Missing Requirements & Additional Information Needed

### 1. Authentication & Security
- **Access Key Generation Process**:
  - Documented steps: Settings → Account Setting → Account → Security → Generate new access token
  - **Missing**: Access key expiration time, rotation policy, and whether multiple keys can be active
  - **Missing**: Rate limits on API calls using the access key
  - **Missing**: Whether the access key needs to be stored securely (e.g., environment variables)

### 2. Agent Management
- **Missing**: How to create/verify agent accounts in the system
- **Missing**: Agent status check API (to verify if agent is online before initiating call)
- **Missing**: Agent authentication flow beyond the verification key
- **Missing**: Agent permissions and role-based access control details

### 3. Campaign Management
- **Missing**: How to create campaigns in the system
- **Missing**: API to list available campaigns
- **Missing**: Campaign ID format and validation rules
- **Missing**: Whether campaign names are case-sensitive

### 4. Phone Number Validation
- **Missing**: Valid phone number formats and country codes
- **Missing**: Phone number validation rules (length, format for different countries)
- **Missing**: Whether country code `0` is valid or if it should be specific country codes
- **Missing**: Supported countries and their respective country codes

### 5. Call Management
- **Missing**: API to check call status using `callTaskId`
- **Missing**: Webhook or callback mechanism for call status updates
- **Missing**: Call recording and retrieval APIs
- **Missing**: Call history and reporting APIs
- **Missing**: Error handling for scenarios like:
  - Agent offline
  - Invalid phone number
  - Insufficient credits/permissions
  - Network issues

### 6. Contact Management
- **Missing**: Maximum batch size for contact uploads
- **Missing**: Contact deduplication logic
- **Missing**: API to retrieve uploaded contacts
- **Missing**: API to update/delete contacts
- **Missing**: Supported fields in the `info` object
- **Missing**: Contact validation rules

### 7. I-frame Integration Details
- **Missing**: I-frame events and callbacks (e.g., call status updates, agent status changes)
- **Missing**: PostMessage API documentation for parent-child communication
- **Missing**: Customization options for I-frame (theme, size, features)
- **Missing**: Mobile responsiveness details
- **Missing**: Browser compatibility requirements

### 8. Error Handling
- **Missing**: Complete list of error codes and messages
- **Missing**: Standard error response format
- **Missing**: Retry logic recommendations
- **Missing**: Timeout values for API calls

### 9. Rate Limiting & Throttling
- **Missing**: Rate limits per endpoint
- **Missing**: Throttling policies
- **Missing**: How to handle rate limit errors (retry-after headers)

### 10. Webhooks & Real-time Updates
- **Missing**: Webhook configuration for call events
- **Missing**: Real-time agent status updates
- **Missing**: Call progress events (ringing, connected, ended, etc.)

### 11. Reporting & Analytics
- **Missing**: Call duration tracking
- **Missing**: Agent performance metrics APIs
- **Missing**: Campaign performance reports
- **Missing**: Export functionality for reports

### 12. Testing & Sandbox Environment
- **Missing**: Sandbox/test environment URL
- **Missing**: Test credentials or test data
- **Missing**: Mock phone numbers for testing
- **Missing**: Testing best practices

### 13. Compliance & Privacy
- **Missing**: GDPR/CCPA compliance details
- **Missing**: Data retention policies
- **Missing**: PCI-DSS compliance for payment-related calls
- **Missing**: Call recording consent management

### 14. SDKs & Libraries
- **Missing**: Official SDKs (JavaScript, Python, etc.)
- **Missing**: Sample code repositories
- **Missing**: Postman collection or API testing tools

### 15. Support & Documentation
- **Missing**: Technical support contact information
- **Missing**: API versioning policy
- **Missing**: Changelog for API updates
- **Missing**: SLA (Service Level Agreement) details

## Recommended Next Steps

1. **Contact Tubelight Support** to obtain:
   - Complete API documentation
   - Sandbox environment access
   - Error code reference
   - Webhook configuration details

2. **Request Additional APIs** for:
   - Agent status checking
   - Call status tracking
   - Campaign management
   - Contact management (CRUD operations)

3. **Implement Security Measures**:
   - Store access keys in environment variables
   - Implement proper error handling
   - Add rate limiting on client side
   - Secure I-frame communication

4. **Testing Strategy**:
   - Start with sandbox environment
   - Test all error scenarios
   - Validate phone number formats
   - Test I-frame event handling

## Configuration Checklist

Before integration, ensure you have:
- [ ] Valid tenant ID
- [ ] Generated access key with appropriate permissions
- [ ] Agent account created and verified
- [ ] Campaign created (for lead insert API)
- [ ] Valid phone numbers with correct country codes
- [ ] Understanding of rate limits
- [ ] Error handling strategy
- [ ] Environment variables configured
- [ ] I-frame integration tested for persistence
- [ ] Webhook endpoints configured (if available)
