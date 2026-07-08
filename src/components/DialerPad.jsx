import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card'
import { Button } from './Button'
import { Phone, X, Delete } from 'lucide-react'

const DialerPad = ({ onDial, onHangup, onBackspace, phoneNumber, setPhoneNumber }) => {
  const dialPad = [
    { num: '1', letters: '' },
    { num: '2', letters: 'ABC' },
    { num: '3', letters: 'DEF' },
    { num: '4', letters: 'GHI' },
    { num: '5', letters: 'JKL' },
    { num: '6', letters: 'MNO' },
    { num: '7', letters: 'PQRS' },
    { num: '8', letters: 'TUV' },
    { num: '9', letters: 'WXYZ' },
    { num: '*', letters: '' },
    { num: '0', letters: '+' },
    { num: '#', letters: '' },
  ]

  const handleKeyPress = (num) => {
    if (phoneNumber.length < 15) {
      setPhoneNumber(phoneNumber + num)
    }
  }

  return (
    <div className="w-full max-w-sm">
      <CardHeader>
        <div className="text-center">
          <div className="text-3xl font-mono tracking-wider mb-2 min-h-[40px] break-all">
            {phoneNumber || 'Enter number'}
          </div>
          <CardDescription>Enter phone number</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {dialPad.map((key) => (
            <button
              key={key.num}
              onClick={() => handleKeyPress(key.num)}
              className="aspect-square rounded-full bg-muted hover:bg-accent transition-colors flex flex-col items-center justify-center min-w-[60px]"
            >
              <span className="text-2xl font-semibold">{key.num}</span>
              {key.letters && (
                <span className="text-xs text-muted-foreground">{key.letters}</span>
              )}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setPhoneNumber(phoneNumber.slice(0, -1))}
            disabled={!phoneNumber}
          >
            <Delete className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setPhoneNumber('')}
            disabled={!phoneNumber}
          >
            <X className="w-5 h-5" />
          </Button>
          <Button
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={() => onDial(phoneNumber)}
            disabled={!phoneNumber}
          >
            <Phone className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </div>
  )
}

export default DialerPad
