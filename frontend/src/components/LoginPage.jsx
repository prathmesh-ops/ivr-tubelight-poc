import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card'
import { Button } from './Button'
import { FileText, Lock, Mail, ArrowRight, Shield, User } from 'lucide-react'

const LoginPage = ({ onLogin, onShowDocs }) => {
  const [formData, setFormData] = useState({
    user_name: '',
    password: '',
    tenantId: '',
    role: 'admin'
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login with dummy data
    setTimeout(() => {
      onLogin({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy-token',
        user: {
          id: 'user-123',
          username: formData.user_name,
          email: formData.user_name,
          role: formData.role
        },
        tenantId: formData.tenantId
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Documentation Button */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-500 text-white border-0 shadow-2xl shadow-blue-500/30">
          <CardContent className="pt-6">
            <button
              onClick={onShowDocs}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
            >
              <FileText className="w-6 h-6" />
              <span className="text-lg font-semibold">View Documentation</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </CardContent>
        </Card>

        {/* Login Form */}
        <Card className="bg-card/90 backdrop-blur-xl border-white/10 shadow-2xl shadow-blue-900/30">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your Voice API dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Role</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'admin' })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.role === 'admin'
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <Shield className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                    <div className="text-sm font-medium">Admin</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'agent' })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.role === 'agent'
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <User className="w-6 h-6 mx-auto mb-2 text-green-500" />
                    <div className="text-sm font-medium">Agent</div>
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tenant ID</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Enter your tenant ID"
                    value={formData.tenantId}
                    onChange={(e) => setFormData({ ...formData, tenantId: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Username or Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Enter your username or email"
                    value={formData.user_name}
                    onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>Demo credentials: any username/password</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage
