# Voice API Documentation

This is the comprehensive developer reference documentation for Voice APIs. The documentation is organized by functional categories for easy navigation.

## Table of Contents

- [Authentication APIs](./01-AUTHENTICATION.md) - Login and access key management
- [Settings APIs](./02-SETTINGS.md) - Phone numbers and sound file management
- [Call Management APIs](./03-CALL-MANAGEMENT.md) - Call initiation, control, and monitoring
- [Campaign Management APIs](./04-CAMPAIGN-MANAGEMENT.md) - Contact and agent operations
- [Reporting APIs](./05-REPORTING.md) - CDR reports and analytics

## Common Parameters

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| `X-TENANT-ID` | Yes | Tenant identifier for all requests |
| `access-key` | Conditional | Required for call management and campaign APIs |
| `Content-Type` | Conditional | Required for POST/PATCH requests (use `application/json`) |
| `Authorization` | Conditional | Bearer token for authenticated requests |

### Host Domain

All API endpoints use the placeholder `{{host-domain}}` which should be replaced with your actual host domain.

## Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

## Code Examples

All API documentation includes examples in:
- **cURL** - Command line HTTP client
- **Python** - Using the `requests` library
- **Node.js** - Using the `axios` library

## Getting Started

1. Start with [Authentication APIs](./01-AUTHENTICATION.md) to obtain access tokens
2. Configure your [Settings](./02-SETTINGS.md) for phone numbers and sound files
3. Use [Call Management APIs](./03-CALL-MANAGEMENT.md) to initiate and control calls
4. Manage campaigns with [Campaign Management APIs](./04-CAMPAIGN-MANAGEMENT.md)
5. Generate reports using [Reporting APIs](./05-REPORTING.md)
