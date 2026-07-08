import { X } from 'lucide-react'
import { Button } from './Button'

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-blue-900/30 max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-lg">
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
