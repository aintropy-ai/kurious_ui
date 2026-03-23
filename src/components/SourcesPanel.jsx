import React from 'react'

const SourceGroup = ({ label, sources }) => {
  if (!sources || sources.length === 0) return null
  return (
    <div className="mb-4">
      <p className="text-xs font-semibold text-k-muted tracking-widest uppercase mb-2">{label}</p>
      <div className="space-y-2">
        {sources.map((src, i) => (
          <div key={i} className="flex items-center justify-between bg-k-bg border border-k-border rounded-lg px-4 py-3 group hover:border-k-teal transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-base flex-shrink-0">{src.icon}</span>
              <div className="min-w-0">
                <p className="text-sm text-k-text font-medium truncate">{src.name}</p>
                <p className="text-xs text-k-muted mt-0.5">Used for: {src.usedFor}</p>
              </div>
            </div>
            <a
              href="#"
              onClick={e => e.preventDefault()}
              className="flex-shrink-0 ml-4 text-k-cyan text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
              title="Opens in new tab at exact location"
            >
              ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SourcesPanel({ sources, isOpen }) {
  return (
    <div
      className="sources-panel"
      style={{ maxHeight: isOpen ? '600px' : '0', opacity: isOpen ? 1 : 0 }}
    >
      <div className="pt-4 pb-2">
        <SourceGroup label="Primary Sources" sources={sources.primary} />
        <SourceGroup label="Supporting" sources={sources.supporting} />
        <SourceGroup label="Additional" sources={sources.additional} />
      </div>
    </div>
  )
}
