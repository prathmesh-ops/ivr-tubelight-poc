import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card'
import { Button } from './Button'
import { Phone, X, Delete, Users, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import TubelightDialer from './TubelightDialer'
import { initiateOutboundCall, addContactsToCampaign } from '../lib/tubelight-api'

const DialerPad = ({ onDial, onHangup, onBackspace, phoneNumber, setPhoneNumber, agentVerificationKey }) => {
  const [showTubelight, setShowTubelight] = useState(false)
  const [showApiSection, setShowApiSection] = useState(false)
  const [customerNumber, setCustomerNumber] = useState('')
  const [campaignId, setCampaignId] = useState('')
  const [contacts, setContacts] = useState('')
  const [callResult, setCallResult] = useState(null)
  const [leadResult, setLeadResult] = useState(null)
  const [callLoading, setCallLoading] = useState(false)
  const [leadLoading, setLeadLoading] = useState(false)
  const [callError, setCallError] = useState(null)
  const [leadError, setLeadError] = useState(null)
  const dialPad = [
    { num: '1', letters: '' },
    { num: '2', letters: 'ABC' },
    { num: '3', letters: 'DEF' },
    { num: '4', letters: 'GHI' },
    { num: '5', letters: 'JKL' },
    { num: '6', letters: 'MNO' },
    { num: '7', letters: 'PQRS' },
    { num: '8', letters: 'TUV' },
    { num: '9', letters: 'WXYZ' },
    { num: '*', letters: '' },
    { num: '0', letters: '+' },
    { num: '#', letters: '' },
  ]

  const handleKeyPress = (num) => {
    if (phoneNumber.length < 15) {
      setPhoneNumber(phoneNumber + num)
    }
  }

  const handleInitiateCall = async () => {
    if (!customerNumber) {
      setCallError('Please enter a customer number')
      return
    }
    if (!agentVerificationKey) {
      setCallError('Please enter agent verification key')
      return
    }

    setCallLoading(true)
    setCallError(null)
    setCallResult(null)

    try {
      const result = await initiateOutboundCall(customerNumber, agentVerificationKey)
      setCallResult(result)
    } catch (error) {
      setCallError(error.message || 'Failed to initiate call')
    } finally {
      setCallLoading(false)
    }
  }

  const handleAddContacts = async () => {
    if (!campaignId || !contacts) {
      setLeadError('Please enter campaign ID and contacts')
      return
    }

    const contactNumbers = contacts.split(',').map(num => num.trim()).filter(num => num)
    
    if (contactNumbers.length === 0) {
      setLeadError('Please enter at least one valid contact number')
      return
    }

    const contactsArray = contactNumbers.map(number => ({
      mobileNumber: number,
      countryCode: 0,
      info: {}
    }))

    setLeadLoading(true)
    setLeadError(null)
    setLeadResult(null)

    try {
      const result = await addContactsToCampaign(contactsArray, campaignId)
      setLeadResult(result)
    } catch (error) {
      setLeadError(error.message || 'Failed to add contacts')
    } finally {
      setLeadLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm">
      {showTubelight && agentVerificationKey ? (
        <CardContent>
          <Button
            variant="outline"
            className="w-full mb-4"
            onClick={() => setShowTubelight(false)}
          >
            Back to Dial Pad
          </Button>
          <div className="flex justify-center">
            <TubelightDialer agentVerificationKey={agentVerificationKey} />
          </div>
        </CardContent>
      ) : (
        <>
          <CardHeader>
            <div className="text-center">
              <div className="text-3xl font-mono tracking-wider mb-2 min-h-[40px] break-all">
                {phoneNumber || 'Enter number'}
              </div>
              <CardDescription>Enter phone number</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {dialPad.map((key) => (
                <button
                  key={key.num}
                  onClick={() => handleKeyPress(key.num)}
                  className="aspect-square rounded-full bg-muted hover:bg-accent transition-colors flex flex-col items-center justify-center min-w-[60px]"
                >
                  <span className="text-2xl font-semibold">{key.num}</span>
                  {key.letters && (
                    <span className="text-xs text-muted-foreground">{key.letters}</span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setPhoneNumber(phoneNumber.slice(0, -1))}
                disabled={!phoneNumber}
              >
                <Delete className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setPhoneNumber('')}
                disabled={!phoneNumber}
              >
                <X className="w-5 h-5" />
              </Button>
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => onDial(phoneNumber)}
                disabled={!phoneNumber}
              >
                <Phone className="w-5 h-5" />
              </Button>
            </div>

            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => setShowTubelight(true)}
            >
              Show Tubelight Dialer
            </Button>

            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={() => setShowApiSection(!showApiSection)}
            >
              {showApiSection ? 'Hide API Section' : 'Show API Section'}
            </Button>

            {showApiSection && (
              <div className="mt-4 space-y-4">
                {/* Click to Call Section */}
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Click to Call
                  </h3>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={customerNumber}
                      onChange={(e) => setCustomerNumber(e.target.value)}
                      placeholder="Customer Number"
                      className="w-full px-2 py-1 text-sm border rounded-md"
                    />
                    <Button
                      onClick={handleInitiateCall}
                      disabled={callLoading}
                      className="w-full text-sm"
                    >
                      {callLoading ? (
                        <>
                          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                          Calling...
                        </>
                      ) : (
                        'Initiate Call'
                      )}
                    </Button>
                    {callError && (
                      <div className="text-xs text-red-600">{callError}</div>
                    )}
                    {callResult && (
                      <div className="text-xs text-green-600">
                        {callResult.message} - ID: {callResult.callTaskId}
                      </div>
                    )}
                  </div>
                </div>

                {/* Lead Insert Section */}
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Lead Insert
                  </h3>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={campaignId}
                      onChange={(e) => setCampaignId(e.target.value)}
                      placeholder="Campaign ID"
                      className="w-full px-2 py-1 text-sm border rounded-md"
                    />
                    <input
                      type="text"
                      value={contacts}
                      onChange={(e) => setContacts(e.target.value)}
                      placeholder="Contacts (comma separated)"
                      className="w-full px-2 py-1 text-sm border rounded-md"
                    />
                    <Button
                      onClick={handleAddContacts}
                      disabled={leadLoading}
                      className="w-full text-sm"
                    >
                      {leadLoading ? (
                        <>
                          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        'Add Contacts'
                      )}
                    </Button>
                    {leadError && (
                      <div className="text-xs text-red-600">{leadError}</div>
                    )}
                    {leadResult && (
                      <div className="text-xs text-green-600">{leadResult.message}</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </>
      )}
    </div>
  )
}

export default DialerPad
