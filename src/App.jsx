import React, { useState, useRef, useEffect } from 'react'
import ThinkingState from './components/ThinkingState'
import AnswerBlock from './components/AnswerBlock'
import SuggestionCards from './components/SuggestionCards'
import SignIn from './components/SignIn'
import ChatHistorySidebar from './components/ChatHistorySidebar'
import ProjectsSidebar from './components/ProjectsSidebar'
import { MOCK_QA, INITIAL_SUGGESTIONS, MOCK_PROJECTS, getAnswerForQuestion } from './data/mockData'

// ─── Nav Logo ─────────────────────────────────────────────────────────────────
function NavLogo({ onClick, theme }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity flex-shrink-0">
      <img
        src="./logo.png"
        alt="AIntropy"
        className={`w-8 h-8 rounded-lg object-cover ${theme === 'light' ? '' : 'mix-blend-lighten'}`}
      />
      <span className="font-bold text-[15px] tracking-tight text-k-text">Kurious</span>
    </button>
  )
}

// ─── Profile Dropdown ─────────────────────────────────────────────────────────
function ProfileMenu({ onSignOut, theme, onThemeChange }) {
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
        onClick={() => setOpen(!open)}
        className={`w-8 h-8 rounded-full bg-gradient-to-br from-k-cyan to-k-teal flex items-center justify-center text-k-bg text-sm font-bold transition-all ${
          open ? 'ring-2 ring-k-cyan ring-offset-2 ring-offset-k-nav' : 'hover:ring-2 hover:ring-k-cyan/40 hover:ring-offset-1 hover:ring-offset-k-nav'
        }`}
      >
        K
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-56 bg-k-card border border-k-border rounded-xl shadow-xl overflow-hidden z-50 animate-fade-in">
          <div className="px-4 py-3 border-b border-k-border">
            <p className="text-sm font-semibold text-k-text">Kunal Sawarkar</p>
            <p className="text-xs text-k-muted mt-0.5">kunal@aintropy.ai</p>
            <p className="text-xs text-k-muted/60 mt-0.5">Organization's Name.INC</p>
          </div>

          {/* Theme toggle */}
          <div className="px-4 py-3 border-b border-k-border">
            <p className="text-xs text-k-muted mb-2">Theme</p>
            <div className="flex items-center gap-1 bg-k-bg border border-k-border rounded-lg p-1">
              <button
                onClick={() => onThemeChange('light')}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  theme === 'light' ? 'bg-k-card text-k-text shadow-sm' : 'text-k-muted hover:text-k-text'
                }`}
              >
                ☀️ Light
              </button>
              <button
                onClick={() => onThemeChange('dark')}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  theme === 'dark' ? 'bg-k-card text-k-text shadow-sm' : 'text-k-muted hover:text-k-text'
                }`}
              >
                🌙 Dark
              </button>
            </div>
          </div>

          <div className="py-1">
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-k-muted hover:text-k-text hover:bg-k-bg transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M2 12c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              Account Settings
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-k-muted hover:text-k-text hover:bg-k-bg transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/><path d="M7 4.5v3l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              Help & Support
            </button>
          </div>
          <div className="border-t border-k-border py-1">
            <button
              onClick={() => { setOpen(false); onSignOut() }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-k-error hover:bg-k-error/10 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 7h6M8.5 5L11 7l-2.5 2M8 2H3a1 1 0 00-1 1v8a1 1 0 001 1h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Search Bar ───────────────────────────────────────────────────────────────
function SearchBar({ value, onChange, onSubmit, mode, onModeChange, disabled }) {
  const isActive = value.trim().length > 0
  const placeholder = mode === 'quick'
    ? 'Go ahead — I answer at the speed of thought.'
    : 'Ask the tough ones — I dig deeper so you don\'t have to.'

  const handleKey = (e) => {
    if (e.key === 'Enter' && isActive && !disabled) onSubmit(value)
  }

  return (
    <div className="w-full">
      <div className={`relative flex items-center border rounded-xl transition-all duration-200 bg-k-card ${
        disabled ? 'border-k-border' : isActive ? 'border-k-cyan shadow-[0_0_0_1px_rgba(0,212,255,0.2)]' : 'border-k-border hover:border-k-muted'
      }`}>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKey}
          disabled={disabled}
          placeholder={placeholder}
          className="search-input flex-1 bg-transparent px-5 py-4 text-[15px] text-k-text placeholder-k-muted/60 disabled:opacity-60"
        />
        <button
          onClick={() => isActive && !disabled && onSubmit(value)}
          disabled={!isActive || disabled}
          className={`mr-3 w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
            isActive && !disabled
              ? 'bg-k-cyan text-k-bg hover:bg-cyan-300 cursor-pointer'
              : 'bg-k-border text-k-muted cursor-not-allowed'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-4 mt-2 ml-1">
        <button
          onClick={() => onModeChange('quick')}
          className={`text-xs font-medium transition-colors ${mode === 'quick' ? 'text-k-cyan' : 'text-k-muted hover:text-k-text'}`}
        >
          ⚡ Quick
        </button>
        <span className="text-k-border text-xs">·</span>
        <button
          onClick={() => onModeChange('deeper')}
          className={`text-xs font-medium transition-colors ${mode === 'deeper' ? 'text-purple-400' : 'text-k-muted hover:text-k-text'}`}
        >
          🔍 Deep Dive
        </button>
      </div>
    </div>
  )
}

// ─── Project Header (shown in center when a project is active) ────────────────
function ProjectHeader({ project, onManageMembers }) {
  const [showMembers, setShowMembers] = useState(false)

  return (
    <div className="mb-8 pb-6 border-b border-k-border">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-k-text">{project.name}</h2>
        <button
          onClick={() => setShowMembers(!showMembers)}
          className="flex items-center gap-2 text-xs text-k-muted hover:text-k-cyan transition-colors border border-k-border rounded-lg px-3 py-1.5 hover:border-k-cyan/50"
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="5" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.2"/><path d="M1 11c0-2.21 1.79-4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><circle cx="10" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.2"/><path d="M7 11c0-2.21 1.79-4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          {project.memberCount} members
        </button>
      </div>
      <p className="text-sm text-k-muted">{project.chatCount} chats · Last active {project.lastActive}</p>

      {/* Inline members summary */}
      {showMembers && (
        <div className="mt-4 p-4 bg-k-card border border-k-border rounded-xl animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-k-muted uppercase tracking-wider">Members</p>
            <button
              onClick={onManageMembers}
              className="text-xs text-k-cyan hover:text-cyan-300 transition-colors"
            >
              Manage →
            </button>
          </div>
          <div className="space-y-2">
            {project.members.map(m => (
              <div key={m.id} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-k-cyan/20 border border-k-border flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-k-cyan font-medium">{m.name.charAt(0)}</span>
                </div>
                <span className="text-sm text-k-text flex-1">{m.name}</span>
                <span className={`text-xs ${m.role === 'Admin' ? 'text-k-cyan' : m.role === 'Contributor' ? 'text-purple-400' : 'text-k-muted'}`}>{m.role}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Idle Screen ──────────────────────────────────────────────────────────────
function IdleScreen({ isFirstVisit, inputValue, onInputChange, onSubmit, mode, onModeChange, onSuggestionSelect, projectName }) {
  const isTyping = inputValue.length > 0
  const idleSuggestions = INITIAL_SUGGESTIONS.slice(0, 2)
  const typingSuggestions = MOCK_QA.filter(q => !idleSuggestions.includes(q.question)).slice(0, 3).map(q => q.question)

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-6 pb-20">
      <div className="w-full max-w-2xl">
        <div className={`transition-all duration-300 text-center mb-10 ${
          isTyping ? 'opacity-0 -translate-y-8 pointer-events-none h-0 mb-0 overflow-hidden' : 'opacity-100 translate-y-0'
        }`}>
          {projectName ? (
            <>
              <h1 className="text-3xl font-bold text-k-text mb-2">Welcome back, Kunal.</h1>
              <p className="text-k-muted text-lg">Searching within <span className="text-k-cyan">{projectName}</span> — what do you want to know?</p>
            </>
          ) : isFirstVisit ? (
            <>
              <h1 className="text-3xl font-bold text-k-text mb-2">Welcome to Kurious, Kunal.</h1>
              <p className="text-k-muted text-lg">Your AI-powered knowledge engine — what do you want to explore?</p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-k-text mb-2">Welcome back, Kunal.</h1>
              <p className="text-k-muted text-lg">Kurious is ready — what do you want to know today?</p>
            </>
          )}
        </div>

        <SearchBar value={inputValue} onChange={onInputChange} onSubmit={onSubmit} mode={mode} onModeChange={onModeChange} disabled={false} />

        <p className="text-xs text-k-muted/60 mt-4 text-center">
          Ask about anything — videos, documents, data, images and more.
        </p>

        {!isTyping && (
          <div className="mt-8 animate-fade-in">
            <SuggestionCards suggestions={idleSuggestions} onSelect={onSuggestionSelect} label="Try asking:" />
          </div>
        )}

        {isTyping && (
          <div className="mt-4 animate-fade-in">
            <p className="text-xs text-k-muted mb-3">You might also ask:</p>
            <div className="space-y-1">
              {typingSuggestions.map((s, i) => (
                <button key={i} onClick={() => onSuggestionSelect(s)} className="block w-full text-left text-sm text-k-muted hover:text-k-cyan transition-colors py-1.5 px-2 rounded-lg hover:bg-k-card">
                  → {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Conversation Screen ──────────────────────────────────────────────────────
function ConversationScreen({ conversations, inputValue, onInputChange, onSubmit, mode, onModeChange, isThinking, thinkingMode, onThinkingComplete, latestSuggestions, onSuggestionSelect }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversations, isThinking])

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <div className="sticky top-14 z-20 bg-k-bg/95 backdrop-blur border-b border-k-border px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <SearchBar value={inputValue} onChange={onInputChange} onSubmit={onSubmit} mode={mode} onModeChange={onModeChange} disabled={isThinking} />
        </div>
      </div>
      <div className="flex-1 px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {conversations.map((conv, i) => (
            <AnswerBlock key={conv.id} conversation={conv} isLatest={i === conversations.length - 1 && !isThinking} />
          ))}
          {isThinking && <ThinkingState mode={thinkingMode} onComplete={onThinkingComplete} />}
          {!isThinking && conversations.length > 0 && latestSuggestions.length > 0 && (
            <div className="animate-fade-in">
              <SuggestionCards suggestions={latestSuggestions} onSelect={onSuggestionSelect} label="You might also ask:" />
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('k-theme') || 'dark')

  useEffect(() => {
    localStorage.setItem('k-theme', theme)
    if (theme === 'light') {
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
    }
  }, [theme])

  const [isSignedIn, setIsSignedIn]             = useState(false)
  const [view, setView]                         = useState('myChats') // 'myChats' | 'projects'
  const [activeProjectId, setActiveProjectId]   = useState(null)
  const [isFirstVisit, setIsFirstVisit]         = useState(true)
  const [hasStarted, setHasStarted]             = useState(false)
  const [inputValue, setInputValue]             = useState('')
  const [mode, setMode]                         = useState('quick')
  const [conversations, setConversations]       = useState([])
  const [isThinking, setIsThinking]             = useState(false)
  const [thinkingMode, setThinkingMode]         = useState('quick')
  const [pendingQuestion, setPendingQuestion]   = useState('')
  const [askedQuestions, setAskedQuestions]     = useState(new Set())
  const [latestSuggestions, setLatestSuggestions] = useState([])
  const [membersProject, setMembersProject]     = useState(null)
  const [demoRole, setDemoRole]                 = useState('Admin')

  const activeProject = MOCK_PROJECTS.find(p => p.id === activeProjectId) || null

  const handleSignIn  = () => setIsSignedIn(true)
  const handleSignOut = () => { setIsSignedIn(false); handleReset() }

  const handleViewChange = (newView) => {
    setView(newView)
    setActiveProjectId(null)
    handleReset()
  }

  const handleSubmit = (query) => {
    if (!query.trim() || isThinking) return
    setHasStarted(true)
    setInputValue('')
    setPendingQuestion(query)
    setThinkingMode(mode)
    setIsThinking(true)
    setLatestSuggestions([])
    setAskedQuestions(prev => new Set([...prev, query.toLowerCase().trim()]))
  }

  const handleThinkingComplete = () => {
    const result = getAnswerForQuestion(pendingQuestion)
    const newConv = {
      id: Date.now(),
      question: pendingQuestion,
      answer: thinkingMode === 'deeper' ? result.deeperAnswer : result.answer,
      mode: thinkingMode,
      time: thinkingMode === 'deeper' ? result.deeperTime : result.time,
      modalities: result.modalities,
      modalityText: result.modalityText,
      sources: result.sources,
    }
    setConversations(prev => [...prev, newConv])
    setIsThinking(false)
    const newSuggestions = result.suggestions.filter(s => !askedQuestions.has(s.toLowerCase().trim()))
    setLatestSuggestions(newSuggestions)
  }

  const handleReset = () => {
    setHasStarted(false)
    setConversations([])
    setInputValue('')
    setIsThinking(false)
    setLatestSuggestions([])
    setAskedQuestions(new Set())
  }

  // ── Sign-in ──
  if (!isSignedIn) return <SignIn onSignIn={handleSignIn} />

  const hasSidebar = true // always show sidebar

  return (
    <div className="min-h-screen bg-k-bg text-k-text font-sans">

      {/* ── Top Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-k-nav border-b border-k-border px-6 h-14 flex items-center justify-between">

        {/* Left: logo + nav links */}
        <div className="flex items-center gap-10">
          <NavLogo onClick={handleReset} theme={theme} />
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleViewChange('myChats')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                view === 'myChats' ? 'text-k-text bg-k-card' : 'text-k-muted hover:text-k-text hover:bg-k-card/50'
              }`}
            >
              My Chats
            </button>
            <button
              onClick={() => handleViewChange('projects')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                view === 'projects' ? 'text-k-text bg-k-card' : 'text-k-muted hover:text-k-text hover:bg-k-card/50'
              }`}
            >
              Projects
            </button>
          </div>
        </div>

        {/* Right: demo toggle + org + profile */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-k-muted/40 hidden sm:block">(for demo only)</span>
            <div className="flex items-center gap-1 bg-k-card border border-k-border rounded-lg px-2 py-1">
              <button onClick={() => setIsFirstVisit(true)} className={`text-xs px-2 py-0.5 rounded transition-colors ${isFirstVisit ? 'bg-k-cyan text-k-bg font-medium' : 'text-k-muted hover:text-k-text'}`}>First Visit</button>
              <button onClick={() => setIsFirstVisit(false)} className={`text-xs px-2 py-0.5 rounded transition-colors ${!isFirstVisit ? 'bg-k-cyan text-k-bg font-medium' : 'text-k-muted hover:text-k-text'}`}>Returning</button>
            </div>
            {view === 'projects' && (
              <div className="flex items-center gap-1 bg-k-card border border-k-border rounded-lg px-2 py-1">
                {['Admin', 'Contributor', 'Viewer'].map(r => (
                  <button key={r} onClick={() => setDemoRole(r)} className={`text-xs px-2 py-0.5 rounded transition-colors ${demoRole === r ? 'bg-k-cyan text-k-bg font-medium' : 'text-k-muted hover:text-k-text'}`}>{r}</button>
                ))}
              </div>
            )}
          </div>
          <span className="text-xs text-k-muted hidden sm:block">Organization's Name.INC</span>
          <ProfileMenu onSignOut={handleSignOut} theme={theme} onThemeChange={setTheme} />
        </div>
      </nav>

      {/* ── Layout: sidebar + content ── */}
      <div className="pt-14 flex">

        {/* Left sidebar */}
        {view === 'myChats' && (
          <ChatHistorySidebar
            activeChatId={null}
            onChatSelect={handleReset}
            onNewChat={handleReset}
          />
        )}
        {view === 'projects' && (
          <ProjectsSidebar
            activeProjectId={activeProjectId}
            onProjectSelect={(id) => { setActiveProjectId(id); handleReset() }}
            onNewProject={() => {}}
            demoRole={demoRole}
          />
        )}

        {/* Center content */}
        <div className="flex-1 ml-64">
          {/* Project header */}
          {view === 'projects' && activeProject && !hasStarted && (
            <div className="max-w-2xl mx-auto px-6 pt-8">
              <ProjectHeader
                project={activeProject}
                onManageMembers={() => setMembersProject(activeProject)}
              />
            </div>
          )}

          {!hasStarted ? (
            <IdleScreen
              isFirstVisit={isFirstVisit}
              inputValue={inputValue}
              onInputChange={setInputValue}
              onSubmit={handleSubmit}
              mode={mode}
              onModeChange={setMode}
              onSuggestionSelect={handleSubmit}
              projectName={activeProject?.name}
            />
          ) : (
            <ConversationScreen
              conversations={conversations}
              inputValue={inputValue}
              onInputChange={setInputValue}
              onSubmit={handleSubmit}
              mode={mode}
              onModeChange={setMode}
              isThinking={isThinking}
              thinkingMode={thinkingMode}
              onThinkingComplete={handleThinkingComplete}
              latestSuggestions={latestSuggestions}
              onSuggestionSelect={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  )
}
