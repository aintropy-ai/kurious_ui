import React, { useState } from 'react'

const ROLES = ['Viewer', 'Contributor', 'Admin']

const ROLE_DESCRIPTIONS = {
  Viewer: 'Can view chats only',
  Contributor: 'Can search and create chats',
  Admin: 'Full access — add/remove members, delete chats',
}

function RoleBadge({ role }) {
  const colors = {
    Admin: 'text-k-cyan border-k-cyan/30 bg-k-cyan/10',
    Contributor: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
    Viewer: 'text-k-muted border-k-border bg-k-bg',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${colors[role]}`}>
      {role}
    </span>
  )
}

export default function MembersPanel({ project, onClose }) {
  const [members, setMembers] = useState(project.members)
  const [addEmail, setAddEmail] = useState('')
  const [addRole, setAddRole] = useState('Contributor')
  const [addError, setAddError] = useState('')
  const currentUserIsAdmin = true // prototype: current user (Kunal) is always Admin

  const handleAdd = () => {
    if (!addEmail.trim()) { setAddError('Please enter an email address.'); return }
    if (!addEmail.includes('@')) { setAddError('Please enter a valid email.'); return }
    if (members.find(m => m.email === addEmail.trim())) { setAddError('This person is already a member.'); return }
    setMembers(prev => [...prev, {
      id: `m_${Date.now()}`,
      name: addEmail.split('@')[0],
      email: addEmail.trim(),
      role: addRole,
    }])
    setAddEmail('')
    setAddError('')
  }

  const handleRemove = (id) => {
    setMembers(prev => prev.filter(m => m.id !== id))
  }

  const handleRoleChange = (id, newRole) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, role: newRole } : m))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-k-card border border-k-border rounded-2xl w-full max-w-lg shadow-xl animate-fade-in mx-4 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-k-border">
          <div>
            <h3 className="font-semibold text-k-text">Manage Members</h3>
            <p className="text-xs text-k-muted mt-0.5">{project.name} · {members.length} member{members.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={onClose} className="text-k-muted hover:text-k-text transition-colors p-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Members list */}
        <div className="px-6 py-4 max-h-64 overflow-y-auto space-y-3">
          {members.map(member => (
            <div key={member.id} className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-k-cyan/30 to-k-teal/30 border border-k-border flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-k-cyan">{member.name.charAt(0)}</span>
              </div>
              {/* Name + email */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-k-text font-medium truncate">
                  {member.name}
                  {member.isOwner && <span className="text-xs text-k-muted font-normal ml-1">(Owner)</span>}
                </p>
                <p className="text-xs text-k-muted truncate">{member.email}</p>
              </div>
              {/* Role */}
              {currentUserIsAdmin && !member.isOwner ? (
                <select
                  value={member.role}
                  onChange={e => handleRoleChange(member.id, e.target.value)}
                  className="text-xs bg-k-bg border border-k-border rounded-lg px-2 py-1 text-k-muted focus:outline-none focus:border-k-cyan transition-colors"
                >
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              ) : (
                <RoleBadge role={member.role} />
              )}
              {/* Remove */}
              {currentUserIsAdmin && !member.isOwner && (
                <button
                  onClick={() => handleRemove(member.id)}
                  className="text-k-muted hover:text-k-error transition-colors p-1 flex-shrink-0"
                  title="Remove member"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M10.5 3.5l-7 7M3.5 3.5l7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Role descriptions */}
        <div className="px-6 py-3 bg-k-bg/50 border-t border-k-border space-y-1">
          {ROLES.map(r => (
            <p key={r} className="text-xs text-k-muted">
              <span className="font-medium text-k-text">{r}:</span> {ROLE_DESCRIPTIONS[r]}
            </p>
          ))}
        </div>

        {/* Add member */}
        {currentUserIsAdmin && (
          <div className="px-6 py-4 border-t border-k-border">
            <p className="text-xs font-medium text-k-muted uppercase tracking-wider mb-3">Add Member</p>
            <div className="flex gap-2">
              <input
                type="email"
                value={addEmail}
                onChange={e => { setAddEmail(e.target.value); setAddError('') }}
                placeholder="colleague@company.com"
                className="flex-1 bg-k-bg border border-k-border rounded-xl px-3 py-2 text-sm text-k-text placeholder-k-muted/50 focus:outline-none focus:border-k-cyan transition-colors"
                onKeyDown={e => e.key === 'Enter' && handleAdd()}
              />
              <select
                value={addRole}
                onChange={e => setAddRole(e.target.value)}
                className="bg-k-bg border border-k-border rounded-xl px-3 py-2 text-sm text-k-muted focus:outline-none focus:border-k-cyan transition-colors"
              >
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-white text-k-bg text-sm font-semibold rounded-xl hover:bg-gray-100 transition-colors flex-shrink-0"
              >
                Add
              </button>
            </div>
            {addError && <p className="text-xs text-k-error mt-2">{addError}</p>}
          </div>
        )}

      </div>
    </div>
  )
}
