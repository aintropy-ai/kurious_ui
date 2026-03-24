import React, { useState, useRef, useEffect } from 'react'
import { MOCK_CHAT_HISTORY } from '../data/mockData'
import ConfirmModal from './ConfirmModal'

function ThreeDotMenu({ onRename, onDelete }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={e => { e.stopPropagation(); setOpen(!open) }}
        className="p-1 rounded text-k-muted hover:text-k-text hover:bg-k-border transition-colors opacity-30 group-hover:opacity-100"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="3" r="1" fill="currentColor"/>
          <circle cx="7" cy="7" r="1" fill="currentColor"/>
          <circle cx="7" cy="11" r="1" fill="currentColor"/>
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-7 w-36 bg-k-card border border-k-border rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
          <button
            onClick={e => { e.stopPropagation(); setOpen(false); onRename() }}
            className="w-full text-left px-3 py-2 text-sm text-k-muted hover:text-k-text hover:bg-k-bg transition-colors"
          >
            Rename
          </button>
          <button
            onClick={e => { e.stopPropagation(); setOpen(false); onDelete() }}
            className="w-full text-left px-3 py-2 text-sm text-k-error hover:bg-k-error/10 transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default function ChatHistorySidebar({ activeChatId, onChatSelect, onNewChat }) {
  const [chats, setChats] = useState(MOCK_CHAT_HISTORY)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [renamingId, setRenamingId] = useState(null)
  const [renameValue, setRenameValue] = useState('')
  const [search, setSearch] = useState('')

  const groups = ['Today', 'Yesterday', 'Last 7 Days']
  const filteredChats = search.trim()
    ? chats.filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
    : chats

  const handleDelete = (id) => {
    setChats(prev => prev.filter(c => c.id !== id))
    setConfirmDelete(null)
    if (activeChatId === id) onNewChat()
  }

  const handleRename = (chat) => {
    setRenamingId(chat.id)
    setRenameValue(chat.title)
  }

  const handleRenameSubmit = (id) => {
    if (renameValue.trim()) {
      setChats(prev => prev.map(c => c.id === id ? { ...c, title: renameValue.trim() } : c))
    }
    setRenamingId(null)
  }

  return (
    <>
      <div className="fixed left-0 top-14 bottom-0 w-64 bg-k-nav border-r border-k-border flex flex-col overflow-hidden z-10">

        {/* New Chat + Search */}
        <div className="px-4 pt-4 pb-3 space-y-3">
          <button
            onClick={onNewChat}
            className="flex items-center gap-1.5 text-sm text-k-muted hover:text-k-cyan transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            New Chat
          </button>
          <div className="h-px bg-k-border" />
          <div className="relative">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-k-muted pointer-events-none">
              <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M10 10l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search chats..."
              className="w-full bg-k-card border border-k-border rounded-lg pl-7 pr-3 py-2 text-xs text-k-text placeholder-k-muted focus:outline-none focus:border-k-cyan transition-colors"
            />
          </div>
          <div className="h-px bg-k-border" />
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto py-2">
          {search.trim() ? (
            filteredChats.length > 0 ? (
              <div className="mb-4">
                {filteredChats.map(chat => (
                  <div
                    key={chat.id}
                    onClick={() => onChatSelect(chat.id)}
                    className={`group flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors ${
                      activeChatId === chat.id ? 'bg-k-card text-k-text' : 'text-k-muted hover:bg-k-card/50 hover:text-k-text'
                    }`}
                  >
                    <span className="flex-1 text-sm truncate">{chat.title}</span>
                    <ThreeDotMenu onRename={() => handleRename(chat)} onDelete={() => setConfirmDelete(chat)} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-k-muted/60 px-4 py-2">No chats found.</p>
            )
          ) : (
          <>
          {groups.map(group => {
            const groupChats = filteredChats.filter(c => c.group === group)
            if (groupChats.length === 0) return null
            return (
              <div key={group} className="mb-4">
                <p className="text-xs text-k-muted/60 uppercase tracking-wider px-4 py-1">{group}</p>
                {groupChats.map(chat => (
                  <div
                    key={chat.id}
                    onClick={() => onChatSelect(chat.id)}
                    className={`group flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors ${
                      activeChatId === chat.id ? 'bg-k-card text-k-text' : 'text-k-muted hover:bg-k-card/50 hover:text-k-text'
                    }`}
                  >
                    {renamingId === chat.id ? (
                      <input
                        autoFocus
                        value={renameValue}
                        onChange={e => setRenameValue(e.target.value)}
                        onBlur={() => handleRenameSubmit(chat.id)}
                        onKeyDown={e => { if (e.key === 'Enter') handleRenameSubmit(chat.id); if (e.key === 'Escape') setRenamingId(null) }}
                        onClick={e => e.stopPropagation()}
                        className="flex-1 bg-k-card border border-k-cyan rounded px-2 py-0.5 text-sm text-k-text focus:outline-none"
                      />
                    ) : (
                      <span className="flex-1 text-sm truncate">{chat.title}</span>
                    )}
                    <ThreeDotMenu
                      onRename={() => handleRename(chat)}
                      onDelete={() => setConfirmDelete(chat)}
                    />
                  </div>
                ))}
              </div>
            )
          })}
          </>
          )}
        </div>
      </div>

      {confirmDelete && (
        <ConfirmModal
          title="Delete chat?"
          message={`"${confirmDelete.title}" will be permanently deleted.`}
          confirmLabel="Delete"
          onConfirm={() => handleDelete(confirmDelete.id)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </>
  )
}
