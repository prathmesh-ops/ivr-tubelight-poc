import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card'
import { Button } from './Button'
import { Search, Phone, User, Mail, MoreVertical } from 'lucide-react'

const AgentContacts = ({ onInitiateCall }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('agentContacts')
    if (savedContacts) {
      return JSON.parse(savedContacts)
    }
    const defaultContacts = [
      { id: 1, name: 'John Smith', phone: '+1 234 567 8900', email: 'john@example.com', status: 'Available' },
      { id: 2, name: 'Sarah Johnson', phone: '+1 234 567 8901', email: 'sarah@example.com', status: 'Available' },
      { id: 3, name: 'Mike Davis', phone: '+1 234 567 8902', email: 'mike@example.com', status: 'Busy' },
      { id: 4, name: 'Emily Brown', phone: '+1 234 567 8903', email: 'emily@example.com', status: 'Available' },
      { id: 5, name: 'David Wilson', phone: '+1 234 567 8904', email: 'david@example.com', status: 'Available' },
      { id: 6, name: 'Lisa Anderson', phone: '+1 234 567 8905', email: 'lisa@example.com', status: 'Offline' },
    ]
    localStorage.setItem('agentContacts', JSON.stringify(defaultContacts))
    return defaultContacts
  })

  useEffect(() => {
    localStorage.setItem('agentContacts', JSON.stringify(contacts))
  }, [contacts])

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCall = (contact) => {
    onInitiateCall({
      contact: { name: contact.name, phone: contact.phone },
      callerId: { label: 'Main Line', number: '+1 800 555 0100' },
      agent: { name: 'Agent' },
      directCall: true
    })
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Contacts</h1>
        <p className="text-muted-foreground">View and call your contacts</p>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search contacts by name, phone, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{contact.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      {contact.phone}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Mail className="w-3 h-3" />
                      {contact.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    contact.status === 'Available' ? 'bg-green-500/20 text-green-500' :
                    contact.status === 'Busy' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-gray-500/20 text-gray-500'
                  }`}>
                    {contact.status}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleCall(contact)}
                    disabled={contact.status !== 'Available'}
                    className="rounded-xl"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <User className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No contacts found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AgentContacts
