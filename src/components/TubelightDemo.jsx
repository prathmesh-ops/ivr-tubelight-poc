import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card';
import { Button } from './Button';
import TubelightDialer from './TubelightDialer';
import { initiateOutboundCall, addContactsToCampaign } from '../lib/tubelight-api';
import { Phone, Users, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const TubelightDemo = () => {
  const [agentVerificationKey, setAgentVerificationKey] = useState('subodhv.onpoint@gmail.com');
  const [customerNumber, setCustomerNumber] = useState('');
  const [campaignId, setCampaignId] = useState('');
  const [contacts, setContacts] = useState('');
  const [callResult, setCallResult] = useState(null);
  const [leadResult, setLeadResult] = useState(null);
  const [callLoading, setCallLoading] = useState(false);
  const [leadLoading, setLeadLoading] = useState(false);
  const [callError, setCallError] = useState(null);
  const [leadError, setLeadError] = useState(null);

  const handleInitiateCall = async () => {
    if (!customerNumber) {
      setCallError('Please enter a customer number');
      return;
    }
    if (!agentVerificationKey) {
      setCallError('Please enter agent verification key');
      return;
    }

    setCallLoading(true);
    setCallError(null);
    setCallResult(null);

    try {
      const result = await initiateOutboundCall(customerNumber, agentVerificationKey);
      setCallResult(result);
    } catch (error) {
      setCallError(error.message || 'Failed to initiate call');
    } finally {
      setCallLoading(false);
    }
  };

  const handleAddContacts = async () => {
    if (!campaignId || !contacts) {
      setLeadError('Please enter campaign ID and contacts');
      return;
    }

    // Parse contacts - expecting format: number1,number2,number3
    const contactNumbers = contacts.split(',').map(num => num.trim()).filter(num => num);
    
    if (contactNumbers.length === 0) {
      setLeadError('Please enter at least one valid contact number');
      return;
    }

    const contactsArray = contactNumbers.map(number => ({
      mobileNumber: number,
      countryCode: 0,
      info: {}
    }));

    setLeadLoading(true);
    setLeadError(null);
    setLeadResult(null);

    try {
      const result = await addContactsToCampaign(contactsArray, campaignId);
      setLeadResult(result);
    } catch (error) {
      setLeadError(error.message || 'Failed to add contacts');
    } finally {
      setLeadLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Tubelight CTI Integration Demo</h1>
        <p className="text-muted-foreground">Test the Tubelight API integrations</p>
      </div>

      {/* I-frame Dialer Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            I-frame Dialer
          </CardTitle>
          <CardDescription>Tubelight dialer interface (should not refresh on page navigation)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Agent Verification Key (Email)</label>
            <input
              type="text"
              value={agentVerificationKey}
              onChange={(e) => setAgentVerificationKey(e.target.value)}
              placeholder="Enter agent email (e.g., agent@example.com)"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex justify-center bg-muted/50 p-4 rounded-lg">
            <TubelightDialer agentVerificationKey={agentVerificationKey} />
          </div>
        </CardContent>
      </Card>

      {/* Click to Call Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Click to Call API
          </CardTitle>
          <CardDescription>Initiate outbound calls (agent must be online)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Agent Verification Key (Email)</label>
            <input
              type="text"
              value={agentVerificationKey}
              onChange={(e) => setAgentVerificationKey(e.target.value)}
              placeholder="Enter agent email (e.g., agent@example.com)"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Customer Number</label>
            <input
              type="text"
              value={customerNumber}
              onChange={(e) => setCustomerNumber(e.target.value)}
              placeholder="Enter phone number (e.g., 9811XXXXXX)"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <Button 
            onClick={handleInitiateCall} 
            disabled={callLoading}
            className="w-full"
          >
            {callLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Initiating Call...
              </>
            ) : (
              'Initiate Call'
            )}
          </Button>

          {callError && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
              <AlertCircle className="w-4 h-4" />
              <span>{callError}</span>
            </div>
          )}

          {callResult && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md text-green-700">
              <CheckCircle2 className="w-4 h-4" />
              <div>
                <div className="font-medium">{callResult.message}</div>
                <div className="text-sm">Call Task ID: {callResult.callTaskId}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lead Insert Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Lead Insert API
          </CardTitle>
          <CardDescription>Add contacts to a campaign</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Campaign ID</label>
            <input
              type="text"
              value={campaignId}
              onChange={(e) => setCampaignId(e.target.value)}
              placeholder="Enter campaign name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Contact Numbers</label>
            <input
              type="text"
              value={contacts}
              onChange={(e) => setContacts(e.target.value)}
              placeholder="Enter numbers separated by commas (e.g., 9369XXXXXX,9811XXXXXX)"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">Country code will be set to 0 by default</p>
          </div>
          
          <Button 
            onClick={handleAddContacts} 
            disabled={leadLoading}
            className="w-full"
          >
            {leadLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Adding Contacts...
              </>
            ) : (
              'Add Contacts to Campaign'
            )}
          </Button>

          {leadError && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
              <AlertCircle className="w-4 h-4" />
              <span>{leadError}</span>
            </div>
          )}

          {leadResult && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md text-green-700">
              <CheckCircle2 className="w-4 h-4" />
              <div>
                <div className="font-medium">{leadResult.message}</div>
                {leadResult.details && leadResult.details.length > 0 && (
                  <div className="text-sm">Details: {JSON.stringify(leadResult.details)}</div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Configuration Info */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration Status</CardTitle>
          <CardDescription>Check if environment variables are configured</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Tenant ID:</span>
            <span className={import.meta.env.VITE_TUBELIGHT_TENANT_ID ? 'text-green-600' : 'text-red-600'}>
              {import.meta.env.VITE_TUBELIGHT_TENANT_ID || 'Not configured'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Access Key:</span>
            <span className={import.meta.env.VITE_TUBELIGHT_ACCESS_KEY ? 'text-green-600' : 'text-red-600'}>
              {import.meta.env.VITE_TUBELIGHT_ACCESS_KEY ? 'Configured' : 'Not configured'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Agent Verification Key:</span>
            <span className={import.meta.env.VITE_TUBELIGHT_AGENT_VERIFICATION_KEY ? 'text-green-600' : 'text-red-600'}>
              {import.meta.env.VITE_TUBELIGHT_AGENT_VERIFICATION_KEY || 'Not configured'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TubelightDemo;
