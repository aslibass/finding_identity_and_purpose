import { useState, useEffect } from 'react'
import { LandingPage } from './components/LandingPage'
import { JoinScreen } from './components/JoinScreen'
import { WorkshopShell } from './components/WorkshopShell'
import { FacilitatorApp } from './facilitator/FacilitatorApp'
import { loadSession } from './stores/session'

type View = 'landing' | 'join' | 'workshop' | 'facilitator'

interface ActiveSession {
  participantId: number
  displayName: string
  roomCode: string
  currentStage: string
}

function getInitialView(): View {
  if (window.location.pathname.startsWith('/facilitator')) return 'facilitator'
  return 'landing'
}

function App() {
  const [view, setView] = useState<View>(getInitialView)
  const [session, setSession] = useState<ActiveSession | null>(null)

  useEffect(() => {
    const saved = loadSession()
    if (saved && view === 'landing') {
      setSession(saved)
      setView('workshop')
    }
  }, [])

  // Sync URL for facilitator route
  useEffect(() => {
    if (view === 'facilitator') {
      window.history.pushState(null, '', '/facilitator')
    } else if (window.location.pathname.startsWith('/facilitator')) {
      window.history.pushState(null, '', '/')
    }
  }, [view])

  function handleJoined(participantId: number, displayName: string, roomCode: string) {
    setSession({ participantId, displayName, roomCode, currentStage: 'I-1' })
    setView('workshop')
  }

  if (view === 'facilitator') return <FacilitatorApp />

  if (view === 'workshop' && session) {
    return (
      <WorkshopShell
        participantId={session.participantId}
        displayName={session.displayName}
        roomCode={session.roomCode}
        initialStage={session.currentStage}
      />
    )
  }

  if (view === 'join') {
    return <JoinScreen onJoined={handleJoined} onBack={() => setView('landing')} />
  }

  return <LandingPage onGetStarted={() => setView('join')} onFacilitator={() => setView('facilitator')} />
}

export default App
