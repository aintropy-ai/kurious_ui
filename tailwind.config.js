/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'k-bg':     'var(--k-bg)',
        'k-nav':    'var(--k-nav)',
        'k-card':   'var(--k-card)',
        'k-border': 'var(--k-border)',
        'k-cyan':   '#00D4FF',
        'k-teal':   '#0891B2',
        'k-text':   'var(--k-text)',
        'k-muted':  'var(--k-muted)',
        'k-error':  '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(16px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        tick:    { '0%': { transform: 'scale(0.5)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
      },
      animation: {
        'fade-in':  'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.35s ease-out',
        'tick':     'tick 0.2s ease-out',
      },
    },
  },
  plugins: [],
}
