import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Link, useNavigate } from 'react-router-dom'
import { Button } from './components/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/Card'
import { FileText, ArrowLeft, ChevronRight, CheckCircle2, LogOut, LayoutDashboard, Phone, Users, BarChart3, Settings, PhoneCall, ChevronDown } from 'lucide-react'
import DocumentationViewer from './components/DocumentationViewer'
import StepsUI from './components/StepsUI'
import LoginPage from './components/LoginPage'
import ApiLogin from './components/ApiLogin'
import Sidebar from './components/Sidebar'
import UsersList from './components/UsersList'
import AgentsSection from './components/AgentsSection'
import CallInitiation from './components/CallInitiation'
import DialerPad from './components/DialerPad'
import ActiveCall from './components/ActiveCall'
import Modal from './components/Modal'
import AgentDashboard from './components/AgentDashboard'
import AgentContacts from './components/AgentContacts'
import AgentCallHistory from './components/AgentCallHistory'
import AgentReports from './components/AgentReports'
import AgentSettings from './components/AgentSettings'
import TubelightDemo from './components/TubelightDemo'
import TubelightDialer from './components/TubelightDialer'

// LoginPage wrapper with navigation
const LoginPageWithRouter = ({ onLogin }) => {
  const navigate = useNavigate()
  
  const handleShowDocs = () => {
    onLogin({ username: 'Guest', email: 'guest@example.com', role: 'admin' })
    navigate('/docs')
  }
  
  const handleLogin = (userData) => {
    onLogin(userData)
    // Redirect based on role
    if (userData.user?.role === 'agent') {
      navigate('/agent')
    } else {
      navigate('/')
    }
  }
  
  return <LoginPage onLogin={handleLogin} onShowDocs={handleShowDocs} />
}

// ApiLogin wrapper with navigation
const ApiLoginWithRouter = ({ onLogin }) => {
  const navigate = useNavigate()
  
  const handleLogin = (userData) => {
    onLogin(userData)
    navigate('/')
  }
  
  const handleBack = () => {
    navigate('/login')
  }
  
  return <ApiLogin onLogin={handleLogin} onBack={handleBack} />
}

// Dashboard Component
const Dashboard = ({ onInitiateCall, onOpenDialer }) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your Voice API dashboard</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link to="/users">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Users className="w-8 h-8 text-blue-500 mb-2" />
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage users</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link to="/agents">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Users className="w-8 h-8 text-green-500 mb-2" />
              <CardTitle>Agents</CardTitle>
              <CardDescription>Manage agents</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onOpenDialer}>
          <CardHeader>
            <PhoneCall className="w-8 h-8 text-purple-500 mb-2" />
            <CardTitle>Dialer</CardTitle>
            <CardDescription>Make a call</CardDescription>
          </CardHeader>
        </Card>
        <Link to="/reports">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <BarChart3 className="w-8 h-8 text-orange-500 mb-2" />
              <CardTitle>Reports</CardTitle>
              <CardDescription>View reports</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent API interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-500" />
                <div>
                  <div className="font-medium">Call Connected</div>
                  <div className="text-sm text-muted-foreground">+1 234 567 8900</div>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">2 min ago</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="font-medium">Contact Added</div>
                  <div className="text-sm text-muted-foreground">Campaign: Sales Q1</div>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">15 min ago</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-purple-500" />
                <div>
                  <div className="font-medium">Report Generated</div>
                  <div className="text-sm text-muted-foreground">CDR Report - Daily</div>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">1 hour ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Campaigns Component
const Campaigns = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold">Campaigns</h1>
    <p className="text-muted-foreground">Manage your campaigns</p>
  </div>
)

// Reports Component
const Reports = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold">Reports</h1>
    <p className="text-muted-foreground">View your reports</p>
  </div>
)

// Settings Component
const SettingsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold">Settings</h1>
    <p className="text-muted-foreground">Configure your settings</p>
  </div>
)

// Call Management Component
const CallManagement = ({ onInitiateCall }) => (
  <AgentsSection onInitiateCall={onInitiateCall} />
)

// Agent Sidebar Component
const AgentSidebar = ({ onLogout, user }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const location = useLocation()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/agent' },
    { id: 'contacts', label: 'Contacts', icon: Users, path: '/agent/contacts' },
    { id: 'history', label: 'Call History', icon: Phone, path: '/agent/history' },
    { id: 'reports', label: 'Reports', icon: BarChart3, path: '/agent/reports' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/agent/settings' },
  ]

  const getActiveTab = () => {
    const path = location.pathname
    if (path === '/agent') return 'dashboard'
    if (path === '/agent/contacts') return 'contacts'
    if (path === '/agent/history') return 'history'
    if (path === '/agent/reports') return 'reports'
    if (path === '/agent/settings') return 'settings'
    return 'dashboard'
  }

  return (
    <div className={`fixed left-0 top-0 h-screen bg-card/90 backdrop-blur-xl border-r border-white/10 transition-all duration-300 z-10 shadow-2xl shadow-blue-900/20 ${isExpanded ? 'w-64' : 'w-16'}`}>
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          {isExpanded && (
            <div className="flex items-center gap-2">
              <Phone className="w-6 h-6 text-primary" />
              <span className="font-semibold">Agent Portal</span>
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
                    ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-500/25'
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
              <div className="text-sm font-medium">{user?.username || 'Agent'}</div>
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

// Main App Layout with Routing
const AppLayout = ({ user, onLogout, callState, selectedAgent, callData, phoneNumber, setPhoneNumber, isDialerOpen, setIsDialerOpen, onInitiateCall, onCallInitiated, onDial, onEndCall, onCancelCall, showTubelightDialer, setShowTubelightDialer, agentVerificationKey }) => {
  const location = useLocation()
  const isAgent = user?.role === 'agent'
  const showSidebar = !location.pathname.includes('/docs') && !location.pathname.includes('/steps')
  const showFloatingDialer = isAgent && !location.pathname.includes('/docs') && !location.pathname.includes('/steps')

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
    if (path === '/agent') return 'dashboard'
    if (path === '/agent/contacts') return 'contacts'
    if (path === '/agent/history') return 'history'
    if (path === '/agent/reports') return 'reports'
    if (path === '/agent/settings') return 'settings'
    return 'dashboard'
  }

  // Show call initiation UI
  if (callState === 'initiating') {
    return (
      <div className="min-h-screen bg-background">
        {isAgent ? (
          <AgentSidebar onLogout={onLogout} user={user} />
        ) : (
          <Sidebar activeTab={getActiveTab()} onLogout={onLogout} user={user} />
        )}
        <main className="ml-64 p-6">
          <CallInitiation onCallInitiated={onCallInitiated} onCancel={onCancelCall} selectedAgent={selectedAgent} />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {showSidebar && (
        isAgent ? (
          <AgentSidebar onLogout={onLogout} user={user} />
        ) : (
          <Sidebar activeTab={getActiveTab()} onLogout={onLogout} user={user} />
        )
      )}
      <main className={showSidebar ? 'ml-64' : ''}>
        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={<Dashboard onInitiateCall={onInitiateCall} onOpenDialer={() => setIsDialerOpen(true)} />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/agents" element={<AgentsSection onInitiateCall={onInitiateCall} />} />
          <Route path="/calls" element={<CallManagement onInitiateCall={onInitiateCall} />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* Agent Routes */}
          <Route path="/agent" element={<AgentDashboard onOpenDialer={() => setIsDialerOpen(true)} />} />
          <Route path="/agent/contacts" element={<AgentContacts onInitiateCall={onInitiateCall} />} />
          <Route path="/agent/history" element={<AgentCallHistory />} />
          <Route path="/agent/reports" element={<AgentReports />} />
          <Route path="/agent/settings" element={<AgentSettings />} />
          
          {/* Shared Routes */}
          <Route path="/docs" element={<DocumentationViewer />} />
          <Route path="/steps" element={<StepsUI />} />
          <Route path="/tubelight-demo" element={<TubelightDemo />} />
          <Route path="*" element={<Navigate to={isAgent ? "/agent" : "/"} replace />} />
        </Routes>
      </main>
      
      {/* Dialer Modal */}
      <Modal isOpen={isDialerOpen} onClose={() => setIsDialerOpen(false)} title="Dialer">
        <DialerPad 
          onDial={onDial} 
          onHangup={() => setIsDialerOpen(false)} 
          phoneNumber={phoneNumber} 
          setPhoneNumber={setPhoneNumber}
          agentVerificationKey="agent@example.com"
        />
      </Modal>

      {/* Active Call Modal */}
      {callState === 'active' && (
        <ActiveCall 
          callData={callData} 
          onEndCall={onEndCall} 
          onClose={onCancelCall}
        />
      )}

      {/* Floating Dial Button for Agents */}
      {showFloatingDialer && (
        <button
          onClick={() => setShowTubelightDialer(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-200 flex items-center justify-center hover:scale-110"
        >
          <PhoneCall className="w-7 h-7" />
        </button>
      )}

      {/* Tubelight Dialer Modal */}
      <Modal isOpen={showTubelightDialer} onClose={() => setShowTubelightDialer(false)} title="Tubelight Dialer">
        <div className="flex justify-center">
          <TubelightDialer agentVerificationKey={agentVerificationKey} />
        </div>
      </Modal>
    </div>
  )
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [callState, setCallState] = useState('idle')
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [callData, setCallData] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isDialerOpen, setIsDialerOpen] = useState(false)
  const [showTubelightDialer, setShowTubelightDialer] = useState(false)
  const [agentVerificationKey, setAgentVerificationKey] = useState('subodhv.onpoint@gmail.com')

  const handleLogin = (userData) => {
    setUser(userData.user || userData)
    setIsLoggedIn(true)
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('user', JSON.stringify(userData.user || userData))
  }

  const handleLogout = () => {
    setUser(null)
    setIsLoggedIn(false)
    setCallState('idle')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
  }

  const handleInitiateCall = (agent) => {
    if (agent.directCall) {
      // Direct call for agents - skip initiation screen
      setCallData({
        contact: agent.contact,
        callerId: agent.callerId,
        agent: agent.agent
      })
      setCallState('active')
    } else {
      // Admin call - show initiation screen
      setSelectedAgent(agent)
      setCallState('initiating')
    }
  }

  const handleCallInitiated = (data) => {
    setCallData(data)
    setCallState('active')
  }

  const handleDial = (number) => {
    setCallData({
      contact: { name: 'Manual Dial', phone: number },
      callerId: { label: 'Main Line', number: '+1 800 555 0100' },
      agent: { name: user?.username || 'User' }
    })
    setCallState('active')
    setIsDialerOpen(false)
  }

  const handleEndCall = () => {
    setCallState('idle')
    setCallData(null)
    setSelectedAgent(null)
  }

  const handleCancelCall = () => {
    setCallState('idle')
    setSelectedAgent(null)
  }

  return (
    <Router>
      {!isLoggedIn ? (
        <Routes>
          <Route path="/api-login" element={<ApiLoginWithRouter onLogin={handleLogin} />} />
          <Route path="*" element={<LoginPageWithRouter onLogin={handleLogin} />} />
        </Routes>
      ) : (
        <AppLayout
          user={user}
          onLogout={handleLogout}
          callState={callState}
          selectedAgent={selectedAgent}
          callData={callData}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          isDialerOpen={isDialerOpen}
          setIsDialerOpen={setIsDialerOpen}
          onInitiateCall={handleInitiateCall}
          onCallInitiated={handleCallInitiated}
          onDial={handleDial}
          onEndCall={handleEndCall}
          onCancelCall={handleCancelCall}
          showTubelightDialer={showTubelightDialer}
          setShowTubelightDialer={setShowTubelightDialer}
          agentVerificationKey={agentVerificationKey}
        />
      )}
    </Router>
  )
}

export default App
