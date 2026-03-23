import React, { useEffect, useState } from 'react'

const QUICK_STEPS = [
  'Understood your question',
  'Searching across 57M documents',
  'Scanning videos, data & documents',
  'Connecting insights',
]

const DEEPER_STEPS = [
  'Understood your question',
  'Searching across 57M documents',
  'Scanning videos, data & documents',
  'Cross-referencing sources',
  'Analysing connections',
  'Synthesising a comprehensive answer',
]

export default function ThinkingState({ mode, onComplete }) {
  const steps = mode === 'deeper' ? DEEPER_STEPS : QUICK_STEPS
  const [visibleSteps, setVisibleSteps] = useState(0)
  const delay = mode === 'deeper' ? 600 : 350

  useEffect(() => {
    setVisibleSteps(0)
    let step = 0
    const interval = setInterval(() => {
      step += 1
      setVisibleSteps(step)
      if (step >= steps.length) {
        clearInterval(interval)
        setTimeout(onComplete, mode === 'deeper' ? 800 : 400)
      }
    }, delay)
    return () => clearInterval(interval)
  }, [mode])

  return (
    <div className="animate-fade-in py-8 max-w-xl">
      <p className="text-sm font-medium text-k-muted mb-6 tracking-wide">
        {mode === 'deeper' ? '🔍' : '⚡'} Searching your knowledge base...
      </p>
      <div className="space-y-3">
        {steps.map((step, i) => {
          const isVisible   = i < visibleSteps
          const isDone      = i < visibleSteps - 1 || (i === visibleSteps - 1 && visibleSteps === steps.length)
          const isActive    = i === visibleSteps - 1 && visibleSteps < steps.length
          const isPending   = i >= visibleSteps

          return (
            <div
              key={step}
              className={`flex items-center gap-3 transition-opacity duration-300 ${
                isPending ? 'opacity-20' : 'opacity-100'
              }`}
            >
              {/* Icon */}
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                {isDone && (
                  <span className="text-k-cyan text-sm animate-tick">✓</span>
                )}
                {isActive && (
                  <div className="w-3 h-3 border-2 border-k-cyan border-t-transparent rounded-full animate-spin" />
                )}
                {isPending && (
                  <div className="w-2 h-2 rounded-full bg-k-border" />
                )}
              </div>
              {/* Label */}
              <span className={`text-sm transition-colors ${
                isDone ? 'text-k-text' : isActive ? 'text-k-cyan' : 'text-k-muted'
              }`}>
                {step}{isActive ? '...' : ''}
              </span>
            </div>
          )
        })}
      </div>
      {mode === 'deeper' && (
        <p className="text-xs text-k-muted/60 mt-6">avg. under 10 seconds</p>
      )}
    </div>
  )
}
