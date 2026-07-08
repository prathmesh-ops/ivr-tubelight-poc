import { useState, useRef, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card'
import { Button } from './Button'
import { Phone, PhoneOff, Mic, MicOff, Pause, Play, Volume2, VolumeX, MoreVertical, Clock, User, Minimize2, Maximize2, X } from 'lucide-react'

const ActiveCall = ({ callData, onEndCall, onClose }) => {
  const [isMuted, setIsMuted] = useState(false)
  const [isOnHold, setIsOnHold] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const modalRef = useRef(null)

  // Simulate call duration
  useEffect(() => {
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Center modal on mount
  useEffect(() => {
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect()
      setPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: (window.innerHeight - rect.height) / 2
      })
    }
  }, [])

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleHold = () => {
    setIsOnHold(!isOnHold)
  }

  const handleEndCall = () => {
    onEndCall()
  }

  const handleMouseDown = (e) => {
    if (e.target.closest('button')) return
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset])

  if (isMinimized) {
    return (
      <div
        className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl shadow-2xl shadow-blue-500/30 p-4 cursor-pointer hover:shadow-blue-500/50 transition-shadow"
        onClick={() => setIsMinimized(false)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm">{callData?.contact?.name || 'Unknown'}</div>
            <div className="text-xs opacity-80">{formatDuration(callDuration)}</div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              handleEndCall()
            }}
            className="text-white hover:bg-white/20 rounded-lg"
          >
            <PhoneOff className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={modalRef}
      className="fixed z-50 bg-card/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-blue-900/30"
      style={{
        left: position.x,
        top: position.y,
        width: isMinimized ? 'auto' : '400px'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10 cursor-move">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-medium text-sm">{callData?.contact?.name || 'Unknown'}</div>
            <div className="text-xs text-muted-foreground">{callData?.contact?.phone || ''}</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(true)}
            className="rounded-lg"
          >
            <Minimize2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="rounded-lg"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="text-center space-y-4 mb-4">
          <div className="flex items-center justify-center gap-2 text-2xl font-mono">
            <Clock className="w-5 h-5" />
            {formatDuration(callDuration)}
          </div>
          {isOnHold && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
              <Pause className="w-3 h-3" />
              On Hold
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 p-3 bg-muted/50 rounded-lg mb-4">
          <div>
            <div className="text-xs text-muted-foreground">Agent</div>
            <div className="text-sm font-medium">{callData?.agent?.name || 'Unknown'}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Caller ID</div>
            <div className="text-sm font-medium">{callData?.callerId?.label || 'Unknown'}</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4">
          <Button
            variant={isMuted ? "default" : "outline"}
            size="sm"
            onClick={handleMute}
            className="flex flex-col gap-1 h-16 rounded-xl"
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            <span className="text-xs">{isMuted ? 'Unmute' : 'Mute'}</span>
          </Button>

          <Button
            variant={isOnHold ? "default" : "outline"}
            size="sm"
            onClick={handleHold}
            className="flex flex-col gap-1 h-16 rounded-xl"
          >
            {isOnHold ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            <span className="text-xs">{isOnHold ? 'Resume' : 'Hold'}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="flex flex-col gap-1 h-16 rounded-xl"
          >
            <Volume2 className="w-5 h-5" />
            <span className="text-xs">DTMF</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="flex flex-col gap-1 h-16 rounded-xl"
          >
            <MoreVertical className="w-5 h-5" />
            <span className="text-xs">More</span>
          </Button>
        </div>

        <Button
          variant="destructive"
          size="lg"
          onClick={handleEndCall}
          className="w-full h-12 rounded-xl"
        >
          <PhoneOff className="w-5 h-5 mr-2" />
          End Call
        </Button>
      </div>
    </div>
  )
}

export default ActiveCall
