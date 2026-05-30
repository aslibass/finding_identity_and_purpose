import { useFacilitatorSocket } from '../hooks/useFacilitatorSocket'
import { ParticipantCard } from './ParticipantCard'
import { api } from '../api/client'
import { ThemeToggle } from '../components/ThemeToggle'

interface Props {
  roomCode: string
  onLeave: () => void
}

export function FacilitatorDashboard({ roomCode, onLeave }: Props) {
  const { participants, status, disconnect } = useFacilitatorSocket(roomCode)

  const list = [...participants.values()].sort(
    (a, b) => new Date(a.joined_at).getTime() - new Date(b.joined_at).getTime()
  )

  const done = list.filter(p => p.current_stage === 'P-7').length
  const inProgress = list.length - done

  function handleLeave() {
    disconnect()
    onLeave()
  }

  async function handleDeleteRoom() {
    if (!confirm(`Delete room ${roomCode} and all participant data? This cannot be undone.`)) return
    await api.deleteRoom(roomCode).catch(() => {})
    disconnect()
    onLeave()
  }

  return (
    <div className="min-h-svh bg-ivory flex flex-col">

      {/* Header */}
      <header className="bg-parchment border-b border-sand px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <p className="font-sans text-xs tracking-widest uppercase text-muted">Room</p>
              <p className="font-serif text-2xl font-medium text-charcoal tracking-wider">{roomCode}</p>
            </div>
            <div className={[
              'w-2 h-2 rounded-full flex-shrink-0',
              status === 'connected' ? 'bg-stage-green' :
              status === 'connecting' ? 'bg-stage-amber animate-pulse' :
              'bg-sand',
            ].join(' ')} title={status} />
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="font-serif text-2xl text-charcoal">{list.length}</p>
              <p className="font-sans text-xs text-muted">in room</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl text-charcoal">{inProgress}</p>
              <p className="font-sans text-xs text-muted">in progress</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl text-stage-green">{done}</p>
              <p className="font-sans text-xs text-muted">complete</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLeave}
              className="font-sans text-xs text-muted hover:text-charcoal transition-colors"
            >
              Leave view
            </button>
            <button
              onClick={handleDeleteRoom}
              className="font-sans text-xs text-terracotta hover:text-terracotta/70 transition-colors"
            >
              Delete room
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Share code strip */}
      <div className="dark-section px-6 py-3">
        <div className="max-w-6xl mx-auto">
          <p className="font-sans text-xs text-sand/60">
            Share this code with participants →{' '}
            <span className="font-mono text-ivory tracking-widest font-medium">{roomCode}</span>
            <span className="text-sand/40 mx-2">·</span>
            <span className="text-sand/60">They join at <span className="text-sand/80">localhost:5173</span></span>
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center fade-in">
            <div className="w-12 border-b-2 border-sand mb-6" />
            <p className="font-serif text-2xl text-charcoal mb-2">Waiting for participants</p>
            <p className="font-sans text-sm text-muted">
              Share room code <span className="font-mono tracking-wider text-charcoal">{roomCode}</span> for them to join.
            </p>
            {status === 'connecting' && (
              <p className="font-sans text-xs text-muted mt-4">Connecting to room…</p>
            )}
            {status === 'disconnected' && (
              <p className="font-sans text-xs text-terracotta mt-4">Disconnected — attempting to reconnect…</p>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {list.map(p => (
              <ParticipantCard key={p.participant_id} participant={p} />
            ))}
          </div>
        )}
      </div>

      {/* Legend */}
      <footer className="border-t border-sand bg-parchment px-6 py-3">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-6">
          <p className="font-sans text-xs text-muted">Stage colours:</p>
          {[
            { color: 'bg-stage-green', label: 'Completed' },
            { color: 'bg-camel', label: 'Current' },
            { color: 'bg-sand', label: 'Ahead' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-3 h-1.5 rounded-sm ${item.color}`} />
              <p className="font-sans text-xs text-muted">{item.label}</p>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
            <p className="font-sans text-xs text-muted">Sensitive stage — content hidden</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-sans text-xs text-terracotta">paused here</span>
            <p className="font-sans text-xs text-muted">— on this stage {'>'}15 mins</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
