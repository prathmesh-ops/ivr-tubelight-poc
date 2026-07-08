import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Phone, Settings, BarChart3, FileText, LogOut, ChevronRight, ChevronDown } from 'lucide-react'
import { Button } from './Button'
import { Card } from './Card'

const Sidebar = ({ onLogout, user }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const location = useLocation()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { id: 'users', label: 'Users', icon: Users, path: '/users' },
    { id: 'agents', label: 'Agents', icon: Users, path: '/agents' },
    { id: 'calls', label: 'Call Management', icon: Phone, path: '/calls' },
    { id: 'campaigns', label: 'Campaigns', icon: Users, path: '/campaigns' },
    { id: 'reports', label: 'Reports', icon: BarChart3, path: '/reports' },
    { id: 'docs', label: 'Documentation', icon: FileText, path: '/docs' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ]

  const getActiveTab = () => {
    const path = location.pathname
    if (path === '/') return 'dashboard'
    if (path === '/users') return 'users'
    if (path === '/agents') return 'agents'
    if (path === '/calls') return 'calls'
    if (path === '/campaigns') return 'campaigns'
    if (path === '/reports') return 'reports'
    if (path === '/docs') return 'docs'
    if (path === '/steps') return 'steps'
    if (path === '/settings') return 'settings'
    return 'dashboard'
  }

  return (
    <div className={`fixed left-0 top-0 h-screen bg-card/90 backdrop-blur-xl border-r border-white/10 transition-all duration-300 z-10 shadow-2xl shadow-blue-900/20 ${isExpanded ? 'w-64' : 'w-16'}`}>
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          {isExpanded && (
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-6 h-6 text-primary" />
              <span className="font-semibold">Voice API</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </div>

        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                  getActiveTab() === item.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'hover:bg-accent/50 hover:backdrop-blur-sm'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isExpanded && <span className="font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-white/10 pt-4">
          {isExpanded && (
            <div className="mb-4">
              <div className="text-sm font-medium">{user?.username || 'User'}</div>
              <div className="text-xs text-muted-foreground">{user?.email || ''}</div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="w-full rounded-lg"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {isExpanded && 'Logout'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
