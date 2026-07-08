import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card'
import { Button } from './Button'
import { Search, Phone, Users, Clock, ArrowRight, X } from 'lucide-react'

const CallInitiation = ({ onCallInitiated, onCancel, selectedAgent }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedContact, setSelectedContact] = useState(null)
  const [selectedCallerId, setSelectedCallerId] = useState('')

  const [contacts] = useState([
    { id: 1, name: 'John Smith', phone: '+1 234 567 8900', lastCalled: '2 days ago', campaign: 'Sales Q1' },
    { id: 2, name: 'Emily Brown', phone: '+1 234 567 8901', lastCalled: '1 week ago', campaign: 'Support' },
    { id: 3, name: 'Michael Johnson', phone: '+1 234 567 8902', lastCalled: '3 days ago', campaign: 'Sales Q1' },
    { id: 4, name: 'Sarah Davis', phone: '+1 234 567 8903', lastCalled: 'Never', campaign: 'Marketing' },
    { id: 5, name: 'Robert Wilson', phone: '+1 234 567 8904', lastCalled: '5 days ago', campaign: 'Sales Q1' },
  ])

  const [callerIds] = useState([
    { id: 1, number: '+1 800 555 0100', label: 'Main Line' },
    { id: 2, number: '+1 800 555 0101', label: 'Sales Line' },
    { id: 3, number: '+1 800 555 0102', label: 'Support Line' },
  ])

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  )

  const handleInitiateCall = () => {
    if (selectedContact && selectedCallerId) {
      onCallInitiated({
        contact: selectedContact,
        callerId: callerIds.find(id => id.id === parseInt(selectedCallerId)),
        agent: selectedAgent
      })
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Initiate Call</h1>
            <p className="text-muted-foreground">
              {selectedAgent ? `Agent: ${selectedAgent.name}` : 'Select a contact to call'}
            </p>
          </div>
          <Button variant="ghost" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Contact</CardTitle>
            <CardDescription>Choose a contact from your list</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedContact?.id === contact.id
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'hover:bg-accent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm opacity-70">{contact.phone}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs opacity-70">{contact.campaign}</div>
                      <div className="text-xs opacity-70 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {contact.lastCalled}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Caller ID Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Caller ID</CardTitle>
            <CardDescription>Choose the number to display to the contact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {callerIds.map((callerId) => (
                <div
                  key={callerId.id}
                  onClick={() => setSelectedCallerId(callerId.id.toString())}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedCallerId === callerId.id.toString()
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'hover:bg-accent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{callerId.label}</div>
                      <div className="text-sm opacity-70">{callerId.number}</div>
                    </div>
                    <Phone className="w-5 h-5 opacity-70" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Call Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Agent:</span>
                  <span>{selectedAgent?.name || 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contact:</span>
                  <span>{selectedContact?.name || 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Caller ID:</span>
                  <span>
                    {selectedCallerId
                      ? callerIds.find(id => id.id === parseInt(selectedCallerId))?.label
                      : 'Not selected'}
                  </span>
                </div>
              </div>
            </div>

            <Button
              className="w-full mt-4"
              onClick={handleInitiateCall}
              disabled={!selectedContact || !selectedCallerId}
            >
              <Phone className="w-4 h-4 mr-2" />
              Initiate Call
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CallInitiation
