import { useTheme } from '../hooks/useTheme'

interface Props {
  className?: string
}

export function ThemeToggle({ className = '' }: Props) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggle}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`w-8 h-8 flex items-center justify-center rounded text-muted hover:text-charcoal transition-colors ${className}`}
      aria-label={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? (
        /* Sun */
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="8" cy="8" r="3" />
          <line x1="8" y1="1" x2="8" y2="2.5" />
          <line x1="8" y1="13.5" x2="8" y2="15" />
          <line x1="1" y1="8" x2="2.5" y2="8" />
          <line x1="13.5" y1="8" x2="15" y2="8" />
          <line x1="3.05" y1="3.05" x2="4.11" y2="4.11" />
          <line x1="11.89" y1="11.89" x2="12.95" y2="12.95" />
          <line x1="12.95" y1="3.05" x2="11.89" y2="4.11" />
          <line x1="4.11" y1="11.89" x2="3.05" y2="12.95" />
        </svg>
      ) : (
        /* Moon */
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 9.5A6 6 0 0 1 4.5 2a6.5 6.5 0 1 0 7.5 7.5z" />
        </svg>
      )}
    </button>
  )
}
