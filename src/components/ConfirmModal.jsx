import React from 'react'

export default function ConfirmModal({ title, message, confirmLabel = 'Delete', onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-k-card border border-k-border rounded-2xl p-6 w-full max-w-sm shadow-xl animate-fade-in mx-4">
        <h3 className="font-semibold text-k-text mb-2">{title}</h3>
        <p className="text-sm text-k-muted mb-6 leading-relaxed">{message}</p>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-k-muted hover:text-k-text transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-k-error text-white rounded-lg hover:bg-red-500 transition-colors font-medium"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
