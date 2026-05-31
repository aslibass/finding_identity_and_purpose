import { useEffect, useRef, useCallback, useState } from 'react'
import { WS_BASE } from '../api/env'

export interface ParticipantState {
  participant_id: number
  display_name: string
  current_stage: string
  joined_at: string
  stage_entered_at: number  // client-side timestamp (ms)
}

type SocketStatus = 'connecting' | 'connected' | 'disconnected'

export function useFacilitatorSocket(roomCode: string | null) {
  const wsRef = useRef<WebSocket | null>(null)
  const [participants, setParticipants] = useState<Map<number, ParticipantState>>(new Map())
  const [status, setStatus] = useState<SocketStatus>('disconnected')

  useEffect(() => {
    if (!roomCode) return

    setStatus('connecting')

    const connect = () => {
      const ws = new WebSocket(`${WS_BASE}/ws/facilitator/${roomCode}`)
      wsRef.current = ws

      ws.onopen = () => setStatus('connected')

      ws.onmessage = (e) => {
        const data = JSON.parse(e.data)
        const now = Date.now()

        if (data.type === 'snapshot') {
          setParticipants(new Map(
            (data.participants as ParticipantState[]).map(p => [
              p.participant_id,
              { ...p, stage_entered_at: now },
            ])
          ))
        } else if (data.type === 'join') {
          setParticipants(prev => {
            const next = new Map(prev)
            next.set(data.participant_id, {
              participant_id: data.participant_id,
              display_name: data.display_name,
              current_stage: 'I-1',
              joined_at: new Date().toISOString(),
              stage_entered_at: now,
            })
            return next
          })
        } else if (data.type === 'stage_update') {
          setParticipants(prev => {
            const next = new Map(prev)
            const existing = next.get(data.participant_id)
            if (existing) {
              next.set(data.participant_id, {
                ...existing,
                current_stage: data.stage_id,
                stage_entered_at: now,
              })
            }
            return next
          })
        } else if (data.type === 'leave') {
          setParticipants(prev => {
            const next = new Map(prev)
            next.delete(data.participant_id)
            return next
          })
        }
      }

      ws.onclose = () => {
        setStatus('disconnected')
        setTimeout(connect, 3000)
      }

      ws.onerror = () => { /* handled via onclose */ }
    }

    connect()
    return () => {
      const ws = wsRef.current
      if (ws) {
        ws.onclose = null
        ws.close()
        wsRef.current = null
      }
      setStatus('disconnected')
    }
  }, [roomCode])

  const disconnect = useCallback(() => {
    wsRef.current?.close()
    wsRef.current = null
    setParticipants(new Map())
    setStatus('disconnected')
  }, [])

  return { participants, status, disconnect }
}
