import { useEffect, useRef, useCallback } from 'react'
import { WS_BASE } from '../api/env'

export function useParticipantSocket(participantId: number | null) {
  const wsRef = useRef<WebSocket | null>(null)
  // Messages queued before the socket opens
  const pendingRef = useRef<string[]>([])

  const safeSend = useCallback((msg: string) => {
    const ws = wsRef.current
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(msg)
    } else {
      pendingRef.current.push(msg)
    }
  }, [])

  useEffect(() => {
    if (!participantId) return

    const connect = () => {
      const ws = new WebSocket(`${WS_BASE}/ws/participant/${participantId}`)
      wsRef.current = ws

      ws.onopen = () => {
        // Flush any messages that were queued before the connection opened
        for (const msg of pendingRef.current) ws.send(msg)
        pendingRef.current = []
      }

      ws.onclose = () => {
        setTimeout(connect, 3000)
      }

      ws.onerror = () => {
        // Errors are handled via onclose reconnect; suppress unhandled rejection
      }
    }

    connect()
    return () => {
      const ws = wsRef.current
      if (ws) {
        ws.onclose = null // prevent reconnect on intentional unmount
        ws.close()
        wsRef.current = null
      }
    }
  }, [participantId])

  const sendStageUpdate = useCallback((stageId: string) => {
    safeSend(JSON.stringify({ type: 'stage_update', stage_id: stageId }))
  }, [safeSend])

  const sendStageComplete = useCallback((stageId: string) => {
    safeSend(JSON.stringify({ type: 'stage_complete', stage_id: stageId }))
  }, [safeSend])

  return { sendStageUpdate, sendStageComplete }
}
