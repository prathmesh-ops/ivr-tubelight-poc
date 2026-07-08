import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card'
import { Button } from './Button'
import { Users, Phone, Clock, TrendingUp, PhoneCall } from 'lucide-react'
import { Link } from 'react-router-dom'

const AgentDashboard = ({ onOpenDialer }) => {
  const stats = [
    { label: 'Total Calls', value: '47', icon: Phone, color: 'text-blue-500' },
    { label: 'Connected', value: '38', icon: PhoneCall, color: 'text-green-500' },
    { label: 'Avg Duration', value: '4:32', icon: Clock, color: 'text-purple-500' },
    { label: 'Success Rate', value: '81%', icon: TrendingUp, color: 'text-orange-500' },
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Agent Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your calling dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon className={`w-8 h-8 mb-2 ${stat.color}`} />
                <CardTitle className="text-3xl">{stat.value}</CardTitle>
                <CardDescription>{stat.label}</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link to="/agent/contacts">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Users className="w-8 h-8 text-blue-500 mb-2" />
              <CardTitle>Contacts</CardTitle>
              <CardDescription>View and call your contacts</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onOpenDialer}>
          <CardHeader>
            <PhoneCall className="w-8 h-8 text-green-500 mb-2" />
            <CardTitle>Dialer</CardTitle>
            <CardDescription>Make a new call</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Calls</CardTitle>
          <CardDescription>Your recent call history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <PhoneCall className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div className="font-medium">John Smith</div>
                  <div className="text-sm text-muted-foreground">+1 234 567 8900</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">5:23</div>
                <div className="text-xs text-muted-foreground">Connected</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                  <PhoneCall className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <div className="font-medium">Sarah Johnson</div>
                  <div className="text-sm text-muted-foreground">+1 234 567 8901</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">0:45</div>
                <div className="text-xs text-muted-foreground">No Answer</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <PhoneCall className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div className="font-medium">Mike Davis</div>
                  <div className="text-sm text-muted-foreground">+1 234 567 8902</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">3:12</div>
                <div className="text-xs text-muted-foreground">Connected</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AgentDashboard
