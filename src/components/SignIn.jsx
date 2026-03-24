import React, { useState } from 'react'

function AIntropyLogo({ size = 'lg' }) {
  const logoSize = size === 'lg' ? 'w-10 h-10 text-lg' : 'w-7 h-7 text-sm'
  const textSize = size === 'lg' ? 'text-2xl' : 'text-base'

  return (
    <div className="flex items-center gap-3">
      <div className={`${logoSize} rounded-xl bg-gradient-to-br from-k-cyan to-k-teal flex items-center justify-center flex-shrink-0`}>
        <span className="text-k-bg font-bold">A</span>
      </div>
      <div className={`${textSize} font-bold tracking-tight`}>
        <span className="text-k-cyan">AI</span><span className="text-k-text">ntropy</span>
      </div>
    </div>
  )
}

export default function SignIn({ onSignIn }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.')
      return
    }
    setError('')
    setLoading(true)
    // Simulate auth — prototype only
    setTimeout(() => {
      setLoading(false)
      onSignIn()
    }, 900)
  }

  const handleSSO = (provider) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onSignIn()
    }, 700)
  }

  return (
    <div className="min-h-screen bg-k-bg flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="mb-10">
        <AIntropyLogo size="lg" />
      </div>

      {/* Card */}
      <div className="w-full max-w-sm">
        <div className="border border-k-border rounded-2xl bg-k-card p-8">
          <h1 className="text-xl font-bold text-k-text mb-1">Sign in to Kurious</h1>
          <p className="text-sm text-k-muted mb-8">Use your enterprise account to continue.</p>

          {/* SSO buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSSO('google')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 border border-k-border rounded-xl px-4 py-3 text-sm text-k-text hover:border-k-cyan/50 hover:bg-k-bg transition-all duration-200 disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
            <button
              onClick={() => handleSSO('microsoft')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 border border-k-border rounded-xl px-4 py-3 text-sm text-k-text hover:border-k-cyan/50 hover:bg-k-bg transition-all duration-200 disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="0" y="0" width="8.5" height="8.5" fill="#F25022"/>
                <rect x="9.5" y="0" width="8.5" height="8.5" fill="#7FBA00"/>
                <rect x="0" y="9.5" width="8.5" height="8.5" fill="#00A4EF"/>
                <rect x="9.5" y="9.5" width="8.5" height="8.5" fill="#FFB900"/>
              </svg>
              Continue with Microsoft
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-k-border" />
            <span className="text-xs text-k-muted">or sign in with email</span>
            <div className="flex-1 h-px bg-k-border" />
          </div>

          {/* Email / Password form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-k-muted mb-1.5 font-medium">Work email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-k-bg border border-k-border rounded-xl px-4 py-3 text-sm text-k-text placeholder-k-muted/50 focus:outline-none focus:border-k-cyan transition-colors"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-k-muted font-medium">Password</label>
                <button type="button" className="text-xs text-k-cyan hover:text-cyan-300 transition-colors">
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-k-bg border border-k-border rounded-xl px-4 py-3 text-sm text-k-text placeholder-k-muted/50 focus:outline-none focus:border-k-cyan transition-colors"
              />
            </div>

            {error && (
              <p className="text-xs text-k-error">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-k-bg font-semibold rounded-xl px-4 py-3 text-sm hover:bg-gray-100 transition-colors mt-2 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-k-bg/30 border-t-k-bg rounded-full animate-spin" />
                  Signing in...
                </>
              ) : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-k-muted/50 mt-6">
          Organization's Name.INC
        </p>
      </div>
    </div>
  )
}

export { AIntropyLogo }
