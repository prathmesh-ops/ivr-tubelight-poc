import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card'
import { BarChart3, TrendingUp, Phone, Clock, CheckCircle, XCircle } from 'lucide-react'

const AgentReports = () => {
  const stats = [
    { label: 'Total Calls', value: '156', icon: Phone, color: 'text-blue-500', change: '+12%' },
    { label: 'Connected', value: '127', icon: CheckCircle, color: 'text-green-500', change: '+8%' },
    { label: 'Avg Duration', value: '4:32', icon: Clock, color: 'text-purple-500', change: '+5%' },
    { label: 'Success Rate', value: '81.4%', icon: TrendingUp, color: 'text-orange-500', change: '+3%' },
  ]

  const dailyStats = [
    { day: 'Mon', calls: 24, connected: 20 },
    { day: 'Tue', calls: 32, connected: 28 },
    { day: 'Wed', calls: 28, connected: 22 },
    { day: 'Thu', calls: 35, connected: 30 },
    { day: 'Fri', calls: 37, connected: 27 },
  ]

  const recentPerformance = [
    { metric: 'Calls Today', value: 12, target: 20, percentage: 60 },
    { metric: 'Connected Today', value: 10, target: 16, percentage: 62.5 },
    { metric: 'Avg Duration Today', value: '4:15', target: '5:00', percentage: 85 },
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Reports</h1>
        <p className="text-muted-foreground">View your performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                  <span className="text-xs text-green-500 font-medium">{stat.change}</span>
                </div>
                <CardTitle className="text-3xl">{stat.value}</CardTitle>
                <CardDescription>{stat.label}</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
            <CardDescription>Calls made this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dailyStats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{stat.day}</span>
                    <span className="text-muted-foreground">{stat.calls} calls ({stat.connected} connected)</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all"
                      style={{ width: `${(stat.connected / stat.calls) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Targets</CardTitle>
            <CardDescription>Progress towards daily goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPerformance.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.metric}</span>
                    <span className="text-muted-foreground">{item.value} / {item.target}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground text-right">{item.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Call Breakdown</CardTitle>
          <CardDescription>Detailed call statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-muted/50 rounded-xl">
              <div className="text-3xl font-bold text-green-500 mb-2">127</div>
              <div className="text-sm text-muted-foreground">Connected Calls</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-xl">
              <div className="text-3xl font-bold text-red-500 mb-2">18</div>
              <div className="text-sm text-muted-foreground">Missed Calls</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-xl">
              <div className="text-3xl font-bold text-yellow-500 mb-2">11</div>
              <div className="text-sm text-muted-foreground">Busy Calls</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AgentReports
