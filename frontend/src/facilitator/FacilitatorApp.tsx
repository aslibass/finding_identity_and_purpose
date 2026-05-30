import { useState } from 'react'
import { FacilitatorLobby } from './FacilitatorLobby'
import { FacilitatorDashboard } from './FacilitatorDashboard'

export function FacilitatorApp() {
  const [roomCode, setRoomCode] = useState<string | null>(null)

  if (roomCode) {
    return <FacilitatorDashboard roomCode={roomCode} onLeave={() => setRoomCode(null)} />
  }

  return <FacilitatorLobby onEnterRoom={setRoomCode} />
}
