import { useState, type FormEvent } from 'react'
import { api } from '../api/client'
import { saveSession } from '../stores/session'

interface Props {
  onJoined: (participantId: number, displayName: string, roomCode: string) => void
  onBack?: () => void
}

export function JoinScreen({ onJoined, onBack }: Props) {
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !code.trim()) return
    setLoading(true)
    setError('')
    try {
      const participant = await api.joinRoom(name.trim(), code.trim().toUpperCase())
      saveSession({
        participantId: participant.id,
        displayName: participant.display_name,
        roomCode: code.trim().toUpperCase(),
        currentStage: participant.current_stage,
      })
      onJoined(participant.id, participant.display_name, code.trim().toUpperCase())
    } catch {
      setError('Room not found. Check your code and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-svh bg-ivory dark:bg-bg flex items-center justify-center px-6 fade-in">
      <div className="w-full max-w-md">

        {/* Wordmark */}
        <div className="mb-12 text-center">
          <p className="font-serif text-sm tracking-widest uppercase text-muted mb-3">
            A Workshop in
          </p>
          <h1 className="font-serif text-5xl font-medium text-charcoal leading-tight">
            Identity<br />& Purpose
          </h1>
          <div className="mt-6 mx-auto w-12 border-b-2 border-camel" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-muted mb-2">
              Your name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="How you'd like to be known"
              className="w-full bg-input-bg border border-sand dark:border-sand rounded px-4 py-3 font-sans text-charcoal dark:text-charcoal placeholder-muted/60 focus:outline-none focus:border-camel transition-colors"
              autoComplete="off"
              maxLength={60}
            />
          </div>

          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-muted mb-2">
              Room code
            </label>
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              placeholder="4-letter code"
              className="w-full bg-input-bg border border-sand dark:border-sand rounded px-4 py-3 font-sans text-charcoal dark:text-charcoal placeholder-muted/60 tracking-widest uppercase focus:outline-none focus:border-camel transition-colors"
              autoComplete="off"
              maxLength={4}
            />
          </div>

          {error && (
            <p className="font-sans text-sm text-terracotta">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !name.trim() || !code.trim()}
            className="w-full bg-burgundy text-ivory font-sans text-sm tracking-widest uppercase py-3.5 rounded hover:bg-burgundy-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Joining…' : 'Enter the room'}
          </button>
        </form>

        <p className="mt-8 text-center font-sans text-xs text-muted/70 leading-relaxed">
          Your reflections are private.<br />
          Only your name and current stage are shared with your facilitator.
        </p>

        {onBack && (
          <div className="mt-6 text-center">
            <button onClick={onBack} className="font-sans text-xs text-muted hover:text-charcoal dark:hover:text-charcoal transition-colors">
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
