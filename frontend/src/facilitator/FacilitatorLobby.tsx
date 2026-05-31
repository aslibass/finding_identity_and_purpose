import { useState, type FormEvent } from 'react'
import { api } from '../api/client'

interface Props {
  onEnterRoom: (code: string) => void
}

export function FacilitatorLobby({ onEnterRoom }: Props) {
  const [code, setCode] = useState('')
  const [creating, setCreating] = useState(false)
  const [joining, setJoining] = useState(false)
  const [error, setError] = useState('')

  async function handleCreate() {
    setCreating(true)
    setError('')
    try {
      const room = await api.createRoom()
      onEnterRoom(room.code)
    } catch {
      setError('Could not create a room. Is the server running?')
    } finally {
      setCreating(false)
    }
  }

  async function handleJoin(e: FormEvent) {
    e.preventDefault()
    if (!code.trim()) return
    setJoining(true)
    setError('')
    try {
      await api.getRoomStatus(code.trim().toUpperCase())
      onEnterRoom(code.trim().toUpperCase())
    } catch {
      setError('Room not found. Check the code and try again.')
    } finally {
      setJoining(false)
    }
  }

  return (
    <div className="min-h-svh bg-ivory flex items-center justify-center px-6 fade-in">
      <div className="w-full max-w-md">

        <div className="mb-12">
          <p className="font-sans text-xs tracking-widest uppercase text-muted mb-3">Facilitator</p>
          <h1 className="font-serif text-5xl font-medium text-charcoal leading-tight">
            Identity<br />&amp; Purpose
          </h1>
          <div className="mt-6 mx-auto w-12 border-b-2 border-camel" />
        </div>

        {/* Create room */}
        <div className="mb-8">
          <button
            onClick={handleCreate}
            disabled={creating}
            className="w-full bg-burgundy text-ivory font-sans text-sm tracking-widest uppercase py-4 rounded hover:bg-burgundy-light transition-colors disabled:opacity-50"
          >
            {creating ? 'Creating…' : 'Create a new room'}
          </button>
          <p className="font-sans text-xs text-muted mt-2 text-center">
            Generates a 4-letter code to share with participants
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 border-t border-sand" />
          <p className="font-sans text-xs text-muted">or join existing</p>
          <div className="flex-1 border-t border-sand" />
        </div>

        {/* Join existing */}
        <form onSubmit={handleJoin} className="space-y-4">
          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-muted mb-2">
              Room code
            </label>
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              placeholder="4-letter code"
              maxLength={4}
              className="w-full bg-parchment border border-sand rounded px-4 py-3 font-sans text-charcoal tracking-widest uppercase placeholder-muted/60 focus:outline-none focus:border-camel transition-colors"
            />
          </div>
          {error && <p className="font-sans text-sm text-terracotta">{error}</p>}
          <button
            type="submit"
            disabled={joining || !code.trim()}
            className="w-full dark-section text-ivory font-sans text-sm tracking-widest uppercase py-3.5 rounded hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            {joining ? 'Checking…' : 'Join room'}
          </button>
        </form>

      </div>
    </div>
  )
}
