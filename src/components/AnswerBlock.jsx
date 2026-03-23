import React, { useState } from 'react'
import SourcesPanel from './SourcesPanel'
import FeedbackBar from './FeedbackBar'

const ModalityIcons = ({ modalities }) => {
  const items = []
  if (modalities.video)     items.push(`🎥 ×${modalities.video}`)
  if (modalities.documents) items.push(`📄 ×${modalities.documents}`)
  if (modalities.data)      items.push(`📊 ×${modalities.data}`)
  if (modalities.images)    items.push(`🖼️ ×${modalities.images}`)
  return (
    <span className="text-sm text-k-muted">
      {items.join('   ')}
    </span>
  )
}

export default function AnswerBlock({ conversation, isLatest }) {
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const { question, answer, mode, time, modalities, modalityText, sources } = conversation

  return (
    <div className="animate-slide-up mb-2">
      {/* Question label */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold text-k-muted uppercase tracking-wider">Q</span>
        <p className="text-sm text-k-muted">{question}</p>
        <span className={`ml-auto flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${
          mode === 'quick'
            ? 'border-k-cyan/40 text-k-cyan'
            : 'border-purple-400/40 text-purple-400'
        }`}>
          {mode === 'quick' ? '⚡ Quick' : '🔍 Think Deeper'}
        </span>
      </div>

      {/* Answer */}
      <div className="border border-k-border rounded-xl overflow-hidden">
        <div className="p-5">
          <p className="text-k-text leading-relaxed text-[15px]">{answer}</p>
        </div>

        {/* Provenance strip */}
        <div className="border-t border-k-border px-5 py-3 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <ModalityIcons modalities={modalities} />
            <span className="text-k-border">·</span>
            <span className="text-sm text-k-cyan font-medium">{time}</span>
          </div>
          <button
            onClick={() => setSourcesOpen(!sourcesOpen)}
            className="text-xs text-k-muted hover:text-k-cyan transition-colors flex items-center gap-1"
          >
            {sourcesOpen ? '▾ Hide Sources' : '▸ View Sources'}
          </button>
        </div>

        {/* Provenance description */}
        <div className="px-5 pb-3">
          <p className="text-xs text-k-muted">I reviewed {modalityText}</p>
        </div>

        {/* Sources panel */}
        {sourcesOpen && (
          <div className="border-t border-k-border px-5">
            <SourcesPanel sources={sources} isOpen={sourcesOpen} />
          </div>
        )}

        {/* Feedback */}
        <div className="border-t border-k-border px-5 py-3">
          <FeedbackBar />
        </div>
      </div>
    </div>
  )
}
