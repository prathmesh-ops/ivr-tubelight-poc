// Tubelight CTI API Service

const TUBELIGHT_BASE_URL = import.meta.env.VITE_TUBELIGHT_BASE_URL || 'https://dashboard.hellotubelight.com';
const TUBELIGHT_TENANT_ID = import.meta.env.VITE_TUBELIGHT_TENANT_ID;
const TUBELIGHT_ACCESS_KEY = import.meta.env.VITE_TUBELIGHT_ACCESS_KEY;
const TUBELIGHT_AGENT_VERIFICATION_KEY = import.meta.env.VITE_TUBELIGHT_AGENT_VERIFICATION_KEY;

/**
 * Click to Call API
 * Initiates an outbound call when agent is online
 */
export const initiateOutboundCall = async (customerNumber, agentVerificationKey = TUBELIGHT_AGENT_VERIFICATION_KEY) => {
  try {
    const response = await fetch(`${TUBELIGHT_BASE_URL}/tenant/v1/user/sso/agent/outbound-call`, {
      method: 'POST',
      headers: {
        'X-TENANT-ID': TUBELIGHT_TENANT_ID,
        'Content-Type': 'application/json',
        'access-key': TUBELIGHT_ACCESS_KEY,
      },
      body: JSON.stringify({
        agentVerificationKey,
        customerNumber,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error initiating outbound call:', error);
    throw error;
  }
};

/**
 * Lead Insert API
 * Adds contacts to a campaign
 */
export const addContactsToCampaign = async (contacts, campaignId) => {
  try {
    const response = await fetch(`${TUBELIGHT_BASE_URL}/tenant/v1/campaign/contacts/add`, {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'X-TENANT-ID': TUBELIGHT_TENANT_ID,
        'Content-Type': 'application/json',
        'access-key': TUBELIGHT_ACCESS_KEY,
      },
      body: JSON.stringify({
        contacts,
        campaignId,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding contacts to campaign:', error);
    throw error;
  }
};

/**
 * Login API
 * Authenticates user with username and password
 */
export const login = async (user_name, password, tenantId = TUBELIGHT_TENANT_ID) => {
  try {
    const response = await fetch(`${TUBELIGHT_BASE_URL}/voice/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-TENANT-ID': String(tenantId || ''),
      },
      body: JSON.stringify({
        user_name,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

/**
 * Generate I-frame URL for Tubelight dialer
 */
export const getTubelightIframeUrl = (agentVerificationKey = TUBELIGHT_AGENT_VERIFICATION_KEY) => {
  const tenant = TUBELIGHT_TENANT_ID;
  return `${TUBELIGHT_BASE_URL}/sso?agentVerificationKey=${encodeURIComponent(agentVerificationKey)}&tenant=medikeezhealthcarell`;
};
