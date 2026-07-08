import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card'
import { Button } from './Button'
import { Search, Plus, Phone, MoreVertical, PhoneCall, Clock, CheckCircle, XCircle } from 'lucide-react'

const AgentsSection = ({ onInitiateCall }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [agents] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@example.com', phone: '+1 234 567 8900', status: 'Available', callsToday: 12, team: 'Sales' },
    { id: 2, name: 'Mike Davis', email: 'mike.d@example.com', phone: '+1 234 567 8901', status: 'On Call', callsToday: 8, team: 'Support' },
    { id: 3, name: 'Emily Chen', email: 'emily.c@example.com', phone: '+1 234 567 8902', status: 'Available', callsToday: 15, team: 'Sales' },
    { id: 4, name: 'James Wilson', email: 'james.w@example.com', phone: '+1 234 567 8903', status: 'Offline', callsToday: 0, team: 'Support' },
    { id: 5, name: 'Lisa Anderson', email: 'lisa.a@example.com', phone: '+1 234 567 8904', status: 'Available', callsToday: 10, team: 'Sales' },
  ])

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.team.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700'
      case 'On Call': return 'bg-blue-100 text-blue-700'
      case 'Offline': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Agents</h1>
        <p className="text-muted-foreground">Manage your agents and their call activities</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Agents</CardTitle>
              <CardDescription>{agents.length} agents in your organization</CardDescription>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Agent
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-medium">{agent.name.charAt(0)}</span>
                      </div>
                      <div>
                        <CardTitle className="text-base">{agent.name}</CardTitle>
                        <CardDescription className="text-sm">{agent.email}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Phone</span>
                      <span className="font-medium">{agent.phone}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Team</span>
                      <span className="font-medium">{agent.team}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Status</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                        {agent.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Calls Today</span>
                      <span className="font-medium flex items-center gap-1">
                        <PhoneCall className="w-3 h-3" />
                        {agent.callsToday}
                      </span>
                    </div>
                    <Button
                      className="w-full mt-4"
                      onClick={() => onInitiateCall(agent)}
                      disabled={agent.status !== 'Available'}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Initiate Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AgentsSection
