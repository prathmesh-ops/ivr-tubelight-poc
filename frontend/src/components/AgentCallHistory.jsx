import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card'
import { Button } from './Button'
import { Search, Phone, PhoneCall, Clock, Filter } from 'lucide-react'

const AgentCallHistory = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [callHistory, setCallHistory] = useState(() => {
    const savedHistory = localStorage.getItem('agentCallHistory')
    if (savedHistory) {
      return JSON.parse(savedHistory)
    }
    const defaultHistory = [
      { id: 1, name: 'John Smith', phone: '+1 234 567 8900', duration: '5:23', status: 'Connected', date: '2024-01-15 10:30 AM' },
      { id: 2, name: 'Sarah Johnson', phone: '+1 234 567 8901', duration: '0:45', status: 'No Answer', date: '2024-01-15 10:15 AM' },
      { id: 3, name: 'Mike Davis', phone: '+1 234 567 8902', duration: '3:12', status: 'Connected', date: '2024-01-15 09:45 AM' },
      { id: 4, name: 'Emily Brown', phone: '+1 234 567 8903', duration: '2:30', status: 'Connected', date: '2024-01-15 09:20 AM' },
      { id: 5, name: 'David Wilson', phone: '+1 234 567 8904', duration: '0:00', status: 'Busy', date: '2024-01-15 09:00 AM' },
      { id: 6, name: 'Lisa Anderson', phone: '+1 234 567 8905', duration: '4:15', status: 'Connected', date: '2024-01-14 04:30 PM' },
    ]
    localStorage.setItem('agentCallHistory', JSON.stringify(defaultHistory))
    return defaultHistory
  })

  useEffect(() => {
    localStorage.setItem('agentCallHistory', JSON.stringify(callHistory))
  }, [callHistory])

  const filteredCalls = callHistory.filter(call => {
    const matchesSearch = call.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         call.phone.includes(searchQuery)
    const matchesFilter = filterStatus === 'all' || call.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Connected': return 'bg-green-500/20 text-green-500'
      case 'No Answer': return 'bg-red-500/20 text-red-500'
      case 'Busy': return 'bg-yellow-500/20 text-yellow-500'
      default: return 'bg-gray-500/20 text-gray-500'
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Call History</h1>
        <p className="text-muted-foreground">View your past calls</p>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 rounded-xl border border-white/10 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="all">All Status</option>
                <option value="Connected">Connected</option>
                <option value="No Answer">No Answer</option>
                <option value="Busy">Busy</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredCalls.map((call) => (
          <Card key={call.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                    <PhoneCall className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{call.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      {call.phone}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {call.date}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{call.duration}</div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(call.status)}`}>
                      {call.status}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="rounded-xl"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call Again
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCalls.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <PhoneCall className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No calls found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AgentCallHistory
