import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card'
import { Button } from './Button'
import { CheckCircle2, Circle, ChevronRight, Lock, Key, Phone, Users, BarChart3, ArrowRight } from 'lucide-react'

const StepsUI = () => {
  const [completedSteps, setCompletedSteps] = useState(new Set())

  const toggleStep = (stepId) => {
    const newCompleted = new Set(completedSteps)
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId)
    } else {
      newCompleted.add(stepId)
    }
    setCompletedSteps(newCompleted)
  }

  const steps = [
    {
      id: 1,
      title: 'Authentication Setup',
      description: 'Set up your authentication credentials to access the Voice API',
      icon: Lock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      substeps: [
        'Login using POST /voice/api/v1/auth/login with user_name and password',
        'Generate access key using PATCH /voice/api/v1/tenant/access-key/{name}',
        'List access keys using GET /voice/api/v1/tenant/access-key/{name}',
        'Store your bearer token and access key securely'
      ]
    },
    {
      id: 2,
      title: 'Configure Settings',
      description: 'Set up phone numbers and upload sound files for your campaigns',
      icon: Key,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      substeps: [
        'Fetch caller IDs using GET /voice/api/v1/setting/phone-number/list',
        'Upload sound files using POST /voice/api/v1/setting/sound',
        'Configure audio files for campaigns',
        'Verify caller ID settings'
      ]
    },
    {
      id: 3,
      title: 'Create a Campaign',
      description: 'Set up your first calling campaign with contacts and agents',
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      substeps: [
        'Insert leads using POST /voice/api/v1/campaign/contacts/add',
        'Configure campaign settings and music files',
        'Set up agent verification keys for SSO',
        'Configure call disposition levels'
      ]
    },
    {
      id: 4,
      title: 'Test Call Management',
      description: 'Test initiating and managing calls through the API',
      icon: Phone,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      substeps: [
        'Test callAndConnect using POST /voice/api/v1/cpaas/calls/callAndConnect',
        'Test callAndPark using POST /voice/api/v1/cpaas/calls/callAndPark',
        'Test callAndPlay using POST /voice/api/v1/cpaas/calls/callAndPlay',
        'Test callAndSpeak using POST /voice/api/v1/cpaas/calls/callAndSpeak'
      ]
    },
    {
      id: 5,
      title: 'Launch Campaign',
      description: 'Start your campaign and monitor its progress',
      icon: Users,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50',
      substeps: [
        'Initiate agent outbound call using POST /voice/api/v1/user/sso/agent/outbound-call',
        'Monitor call status using callAndMonitor API',
        'Test call control features (mute, unmute, hold, unhold)',
        'Dispose calls using POST /voice/api/v1/user/sso/agent/call-dispose'
      ]
    },
    {
      id: 6,
      title: 'Analyze Results',
      description: 'Generate reports and analyze campaign performance',
      icon: BarChart3,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
      substeps: [
        'Fetch CDR reports using POST /voice/api/v1/voice-cdr-report/list',
        'Filter reports by tags, agents, and campaigns',
        'Analyze call dispositions and performance metrics',
        'Export reports for further analysis'
      ]
    }
  ]

  const isStepComplete = (stepId) => completedSteps.has(stepId)
  const allComplete = completedSteps.size === steps.length

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Integration Steps</h1>
        <p className="text-muted-foreground">
          Follow these steps to integrate the Voice API into your application
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg">Progress</h3>
              <p className="text-sm text-muted-foreground">
                {completedSteps.size} of {steps.length} steps completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                {Math.round((completedSteps.size / steps.length) * 100)}%
              </div>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
            />
          </div>
          {allComplete && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-medium">
                Congratulations! You've completed all integration steps.
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Steps */}
      <div className="space-y-6">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isComplete = isStepComplete(step.id)
          const isLast = index === steps.length - 1

          return (
            <div key={step.id} className="relative">
              {/* Connection Line */}
              {!isLast && (
                <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-border" />
              )}

              <Card className={`transition-all duration-300 ${isComplete ? 'border-green-200 bg-green-50/50' : ''}`}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleStep(step.id)}
                      className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        isComplete
                          ? 'bg-green-500 text-white'
                          : step.bgColor
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <Icon className={`w-6 h-6 ${step.color}`} />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-muted-foreground">
                          Step {step.id}
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                      <CardDescription className="text-base mt-1">
                        {step.description}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleStep(step.id)}
                      className="flex-shrink-0"
                    >
                      {isComplete ? (
                        <span className="text-green-600">Completed</span>
                      ) : (
                        <span>Mark Complete</span>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="ml-16 space-y-2">
                    <h4 className="font-semibold text-sm mb-3">Substeps:</h4>
                    {step.substeps.map((substep, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Circle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isComplete ? 'text-green-500' : 'text-muted-foreground'}`} />
                        <span className={`text-sm ${isComplete ? 'text-muted-foreground line-through' : ''}`}>
                          {substep}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>

      {/* Quick Reference */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Reference</CardTitle>
          <CardDescription>
            Common API endpoints for each integration step
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Lock className="w-5 h-5 text-blue-500" />
              <div className="flex-1">
                <div className="font-medium">Authentication</div>
                <div className="text-sm text-muted-foreground font-mono">POST /voice/api/v1/auth/login</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Key className="w-5 h-5 text-green-500" />
              <div className="flex-1">
                <div className="font-medium">Settings</div>
                <div className="text-sm text-muted-foreground font-mono">GET /voice/api/v1/setting/phone-number/list</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Users className="w-5 h-5 text-purple-500" />
              <div className="flex-1">
                <div className="font-medium">Campaigns</div>
                <div className="text-sm text-muted-foreground font-mono">POST /voice/api/v1/campaign/contacts/add</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Phone className="w-5 h-5 text-orange-500" />
              <div className="flex-1">
                <div className="font-medium">Calls</div>
                <div className="text-sm text-muted-foreground font-mono">POST /voice/api/v1/cpaas/calls/callAndConnect</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <BarChart3 className="w-5 h-5 text-indigo-500" />
              <div className="flex-1">
                <div className="font-medium">Reports</div>
                <div className="text-sm text-muted-foreground font-mono">POST /voice/api/v1/voice-cdr-report/list</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StepsUI
