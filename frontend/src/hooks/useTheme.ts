import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Apply on mount so SSR flash doesn't happen
  useEffect(() => { applyTheme(theme) }, [])

  function toggle() {
    setTheme(t => t === 'light' ? 'dark' : 'light')
  }

  return { theme, toggle }
}
