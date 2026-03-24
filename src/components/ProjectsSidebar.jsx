import React, { useState, useRef, useEffect } from 'react'
import { MOCK_PROJECTS } from '../data/mockData'
import ConfirmModal from './ConfirmModal'
import MembersPanel from './MembersPanel'

function ThreeDotMenu({ onRename, onMembers, onDelete }) {
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
        <div className="absolute right-0 top-7 w-40 bg-k-card border border-k-border rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
          <button onClick={e => { e.stopPropagation(); setOpen(false); onRename() }} className="w-full text-left px-3 py-2 text-sm text-k-muted hover:text-k-text hover:bg-k-bg transition-colors">Rename</button>
          <button onClick={e => { e.stopPropagation(); setOpen(false); onMembers() }} className="w-full text-left px-3 py-2 text-sm text-k-muted hover:text-k-text hover:bg-k-bg transition-colors">Manage Members</button>
          <button onClick={e => { e.stopPropagation(); setOpen(false); onDelete() }} className="w-full text-left px-3 py-2 text-sm text-k-error hover:bg-k-error/10 transition-colors">Delete Project</button>
        </div>
      )}
    </div>
  )
}

function ChatThreeDotMenu({ onRename, onDelete }) {
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
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="3" r="1" fill="currentColor"/>
          <circle cx="7" cy="7" r="1" fill="currentColor"/>
          <circle cx="7" cy="11" r="1" fill="currentColor"/>
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-7 w-36 bg-k-card border border-k-border rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
          <button onClick={e => { e.stopPropagation(); setOpen(false); onRename() }} className="w-full text-left px-3 py-2 text-sm text-k-muted hover:text-k-text hover:bg-k-bg transition-colors">Rename</button>
          <button onClick={e => { e.stopPropagation(); setOpen(false); onDelete() }} className="w-full text-left px-3 py-2 text-sm text-k-error hover:bg-k-error/10 transition-colors">Delete Chat</button>
        </div>
      )}
    </div>
  )
}

export default function ProjectsSidebar({ activeProjectId, onProjectSelect, onNewProject, demoRole = 'Admin' }) {
  const [projects, setProjects] = useState(MOCK_PROJECTS)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [confirmChatDelete, setConfirmChatDelete] = useState(null)
  const [membersProject, setMembersProject] = useState(null)
  const [renamingId, setRenamingId] = useState(null)
  const [renameValue, setRenameValue] = useState('')
  const [search, setSearch] = useState('')

  const filteredProjects = search.trim()
    ? projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    : projects

  const handleDeleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id))
    setConfirmDelete(null)
    if (activeProjectId === id) onProjectSelect(null)
  }

  const handleDeleteChat = (projectId, chatId) => {
    setProjects(prev => prev.map(p =>
      p.id === projectId
        ? { ...p, chats: p.chats.filter(c => c.id !== chatId), chatCount: p.chatCount - 1 }
        : p
    ))
    setConfirmChatDelete(null)
  }

  const handleRenameProject = (project) => {
    setRenamingId(project.id)
    setRenameValue(project.name)
  }

  const handleRenameSubmit = (id) => {
    if (renameValue.trim()) {
      setProjects(prev => prev.map(p => p.id === id ? { ...p, name: renameValue.trim() } : p))
    }
    setRenamingId(null)
  }

  const activeProject = projects.find(p => p.id === activeProjectId)

  return (
    <>
      <div className="fixed left-0 top-14 bottom-0 w-64 bg-k-nav border-r border-k-border flex flex-col overflow-hidden z-10">

        {/* New Project + Search */}
        <div className="px-4 pt-4 pb-3 space-y-3">
          <button
            onClick={onNewProject}
            className="flex items-center gap-1.5 text-sm text-k-muted hover:text-k-cyan transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            New Project
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
              placeholder="Search projects..."
              className="w-full bg-k-bg border border-k-border rounded-lg pl-7 pr-3 py-1.5 text-xs text-k-text placeholder-k-muted/50 focus:outline-none focus:border-k-cyan transition-colors"
            />
          </div>
          <div className="h-px bg-k-border" />
        </div>

        {/* Projects list */}
        <div className="flex-1 overflow-y-auto py-2">
          <p className="text-xs text-k-muted/60 uppercase tracking-wider px-4 py-1 mb-1">Your Projects</p>

          {filteredProjects.length === 0 && (
            <p className="text-xs text-k-muted/60 px-4 py-2">No projects found.</p>
          )}

          {filteredProjects.map(project => (
            <div key={project.id}>
              {/* Project row */}
              <div
                onClick={() => onProjectSelect(project.id === activeProjectId ? null : project.id)}
                className={`group flex items-center gap-2 px-4 py-2.5 cursor-pointer transition-colors ${
                  activeProjectId === project.id ? 'bg-k-card text-k-text' : 'text-k-muted hover:bg-k-card/50 hover:text-k-text'
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                  <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M1 6h12" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M4 1l2 2h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                {renamingId === project.id ? (
                  <input
                    autoFocus
                    value={renameValue}
                    onChange={e => setRenameValue(e.target.value)}
                    onBlur={() => handleRenameSubmit(project.id)}
                    onKeyDown={e => { if (e.key === 'Enter') handleRenameSubmit(project.id); if (e.key === 'Escape') setRenamingId(null) }}
                    onClick={e => e.stopPropagation()}
                    className="flex-1 bg-k-card border border-k-cyan rounded px-2 py-0.5 text-sm text-k-text focus:outline-none"
                  />
                ) : (
                  <span className="flex-1 text-sm truncate">{project.name}</span>
                )}

                <ThreeDotMenu
                  onRename={() => handleRenameProject(project)}
                  onMembers={() => setMembersProject(project)}
                  onDelete={() => setConfirmDelete(project)}
                />
              </div>

              {/* Project chats — shown when project is active */}
              {activeProjectId === project.id && project.chats.length > 0 && (
                <div className="ml-4 border-l border-k-border/50 pl-3 pb-2">
                  {project.chats.map(chat => (
                    <div key={chat.id} className="group flex items-center gap-2 py-1.5 cursor-pointer text-k-muted hover:text-k-text transition-colors">
                      <span className="flex-1 text-xs truncate">{chat.title}</span>
                      <ChatThreeDotMenu
                        onRename={() => {}}
                        onDelete={() => setConfirmChatDelete({ project, chat })}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Confirm delete project */}
      {confirmDelete && (
        <ConfirmModal
          title="Delete project?"
          message={`"${confirmDelete.name}" and all ${confirmDelete.chatCount} chats inside it will be permanently deleted. Members will be notified.`}
          confirmLabel="Delete Project"
          onConfirm={() => handleDeleteProject(confirmDelete.id)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      {/* Confirm delete chat */}
      {confirmChatDelete && (
        <ConfirmModal
          title="Delete chat?"
          message={`"${confirmChatDelete.chat.title}" will be permanently deleted.`}
          confirmLabel="Delete"
          onConfirm={() => handleDeleteChat(confirmChatDelete.project.id, confirmChatDelete.chat.id)}
          onCancel={() => setConfirmChatDelete(null)}
        />
      )}

      {/* Members panel */}
      {membersProject && (
        <MembersPanel
          project={membersProject}
          demoRole={demoRole}
          onClose={() => setMembersProject(null)}
        />
      )}
    </>
  )
}
