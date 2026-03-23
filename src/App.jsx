import React, { useState, useRef, useEffect } from 'react'
import ThinkingState from './components/ThinkingState'
import AnswerBlock from './components/AnswerBlock'
import SuggestionCards from './components/SuggestionCards'
import { MOCK_QA, INITIAL_SUGGESTIONS, getAnswerForQuestion } from './data/mockData'

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

      {/* Mode toggle */}
      <div className="flex items-center gap-4 mt-2 ml-1">
        <button
          onClick={() => onModeChange('quick')}
          className={`text-xs font-medium transition-colors flex items-center gap-1 ${
            mode === 'quick' ? 'text-k-cyan' : 'text-k-muted hover:text-k-text'
          }`}
        >
          ⚡ Quick
        </button>
        <span className="text-k-border text-xs">·</span>
        <button
          onClick={() => onModeChange('deeper')}
          className={`text-xs font-medium transition-colors flex items-center gap-1 ${
            mode === 'deeper' ? 'text-purple-400' : 'text-k-muted hover:text-k-text'
          }`}
        >
          🔍 Think Deeper
        </button>
      </div>
    </div>
  )
}

// ─── Idle Screen ──────────────────────────────────────────────────────────────
function IdleScreen({ isFirstVisit, inputValue, onInputChange, onSubmit, mode, onModeChange, onSuggestionSelect }) {
  const isTyping = inputValue.length > 0
  const idleSuggestions = INITIAL_SUGGESTIONS.slice(0, 2)

  // Related suggestions while typing (not idle cards)
  const typingSuggestions = MOCK_QA
    .filter(q => !idleSuggestions.includes(q.question))
    .slice(0, 3)
    .map(q => q.question)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 pb-20">
      <div className="w-full max-w-2xl">

        {/* Greeting — scrolls up when typing */}
        <div className={`transition-all duration-300 text-center mb-10 ${
          isTyping ? 'opacity-0 -translate-y-8 pointer-events-none h-0 mb-0 overflow-hidden' : 'opacity-100 translate-y-0'
        }`}>
          {isFirstVisit ? (
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

        {/* First visit: cards ABOVE search bar */}
        {isFirstVisit && !isTyping && (
          <div className="mb-6 animate-fade-in">
            <SuggestionCards
              suggestions={idleSuggestions}
              onSelect={onSuggestionSelect}
              label="Try asking:"
            />
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-k-border" />
              <span className="text-xs text-k-muted">or</span>
              <div className="flex-1 h-px bg-k-border" />
            </div>
          </div>
        )}

        {/* Typing state: "You might also ask" ABOVE bar for first visit */}
        {isFirstVisit && isTyping && (
          <div className="mb-4 animate-fade-in">
            <p className="text-xs text-k-muted mb-3">You might also ask:</p>
            <div className="space-y-1">
              {typingSuggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => onSuggestionSelect(s)}
                  className="block w-full text-left text-sm text-k-muted hover:text-k-cyan transition-colors py-1.5 px-2 rounded-lg hover:bg-k-card"
                >
                  → {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search bar */}
        <SearchBar
          value={inputValue}
          onChange={onInputChange}
          onSubmit={onSubmit}
          mode={mode}
          onModeChange={onModeChange}
          disabled={false}
        />

        {/* Modality line — always subtle below bar */}
        <p className="text-xs text-k-muted/60 mt-4 text-center">
          Ask about anything — videos, documents, data, images and more.
        </p>

        {/* Returning user: cards BELOW search bar */}
        {!isFirstVisit && !isTyping && (
          <div className="mt-8 animate-fade-in">
            <SuggestionCards
              suggestions={idleSuggestions}
              onSelect={onSuggestionSelect}
              label="Try asking:"
            />
          </div>
        )}

        {/* Returning user typing: "You might also ask" BELOW bar */}
        {!isFirstVisit && isTyping && (
          <div className="mt-4 animate-fade-in">
            <p className="text-xs text-k-muted mb-3">You might also ask:</p>
            <div className="space-y-1">
              {typingSuggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => onSuggestionSelect(s)}
                  className="block w-full text-left text-sm text-k-muted hover:text-k-cyan transition-colors py-1.5 px-2 rounded-lg hover:bg-k-card"
                >
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
    <div className="flex flex-col min-h-screen">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-20 bg-k-bg/95 backdrop-blur border-b border-k-border px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <SearchBar
            value={inputValue}
            onChange={onInputChange}
            onSubmit={onSubmit}
            mode={mode}
            onModeChange={onModeChange}
            disabled={isThinking}
          />
        </div>
      </div>

      {/* Conversation body */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-8">

          {/* Past Q&As */}
          {conversations.map((conv, i) => (
            <AnswerBlock
              key={conv.id}
              conversation={conv}
              isLatest={i === conversations.length - 1 && !isThinking}
            />
          ))}

          {/* Thinking state */}
          {isThinking && (
            <ThinkingState mode={thinkingMode} onComplete={onThinkingComplete} />
          )}

          {/* Latest suggestion cards — only after last answer, not during thinking */}
          {!isThinking && conversations.length > 0 && latestSuggestions.length > 0 && (
            <div className="animate-fade-in">
              <SuggestionCards
                suggestions={latestSuggestions}
                onSelect={onSuggestionSelect}
                label="You might also ask:"
              />
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
  const [isFirstVisit, setIsFirstVisit]     = useState(true)
  const [hasStarted, setHasStarted]         = useState(false) // false = idle, true = conversation
  const [inputValue, setInputValue]         = useState('')
  const [mode, setMode]                     = useState('quick')
  const [conversations, setConversations]   = useState([])
  const [isThinking, setIsThinking]         = useState(false)
  const [thinkingMode, setThinkingMode]     = useState('quick')
  const [pendingQuestion, setPendingQuestion] = useState('')
  const [askedQuestions, setAskedQuestions] = useState(new Set())
  const [latestSuggestions, setLatestSuggestions] = useState([])

  const handleSubmit = (query) => {
    if (!query.trim() || isThinking) return
    setHasStarted(true)
    setInputValue('')
    setPendingQuestion(query)
    setThinkingMode(mode)
    setIsThinking(true)
    setLatestSuggestions([]) // clear old cards immediately
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

    // Set smart suggestions (filter already asked)
    const newSuggestions = result.suggestions.filter(
      s => !askedQuestions.has(s.toLowerCase().trim())
    )
    setLatestSuggestions(newSuggestions)
  }

  const handleSuggestionSelect = (s) => {
    handleSubmit(s)
  }

  const handleReset = () => {
    setHasStarted(false)
    setConversations([])
    setInputValue('')
    setIsThinking(false)
    setLatestSuggestions([])
    setAskedQuestions(new Set())
  }

  return (
    <div className="min-h-screen bg-k-bg text-k-text font-sans">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-k-nav border-b border-k-border px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={handleReset} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-k-cyan to-k-teal flex items-center justify-center">
              <span className="text-k-bg text-sm font-bold">A</span>
            </div>
            <span className="font-semibold text-k-text">AIntropy</span>
            <span className="text-k-muted text-sm font-normal ml-1">Kurious</span>
          </button>
        </div>

        {/* Demo toggle */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-k-card border border-k-border rounded-lg px-3 py-1.5">
            <span className="text-xs text-k-muted">Demo:</span>
            <button
              onClick={() => { setIsFirstVisit(true); handleReset() }}
              className={`text-xs px-2 py-0.5 rounded transition-colors ${isFirstVisit ? 'bg-k-cyan text-k-bg font-medium' : 'text-k-muted hover:text-k-text'}`}
            >
              First Visit
            </button>
            <button
              onClick={() => { setIsFirstVisit(false); handleReset() }}
              className={`text-xs px-2 py-0.5 rounded transition-colors ${!isFirstVisit ? 'bg-k-cyan text-k-bg font-medium' : 'text-k-muted hover:text-k-text'}`}
            >
              Returning
            </button>
          </div>
          <div className="text-xs text-k-muted hidden sm:block">NJ Open Data · 57M docs · 23 agencies</div>
        </div>
      </nav>

      {/* Main content */}
      <div className="pt-14">
        {!hasStarted ? (
          <IdleScreen
            isFirstVisit={isFirstVisit}
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSubmit={handleSubmit}
            mode={mode}
            onModeChange={setMode}
            onSuggestionSelect={handleSuggestionSelect}
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
            onSuggestionSelect={handleSuggestionSelect}
          />
        )}
      </div>
    </div>
  )
}
