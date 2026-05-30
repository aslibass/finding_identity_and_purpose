import type { RoomOut, ParticipantOut, AnswerOut, RoomStatus } from './types'

const BASE = 'http://localhost:8000'

async function post<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

async function del(path: string): Promise<void> {
  const res = await fetch(`${BASE}${path}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(await res.text())
}

export const api = {
  createRoom: (): Promise<RoomOut> =>
    post('/rooms'),

  joinRoom: (display_name: string, room_code: string): Promise<ParticipantOut> =>
    post('/participants', { display_name, room_code }),

  getRoomStatus: (code: string): Promise<RoomStatus> =>
    get(`/rooms/${code}/status`),

  saveAnswer: (
    participantId: number,
    stage_id: string,
    question_key: string,
    answer_text: string,
  ): Promise<AnswerOut> =>
    post(`/participants/${participantId}/answers`, { stage_id, question_key, answer_text }),

  getAnswers: (participantId: number): Promise<AnswerOut[]> =>
    get(`/participants/${participantId}/answers`),

  deleteParticipant: (participantId: number): Promise<void> =>
    del(`/participants/${participantId}`),

  deleteRoom: (code: string): Promise<void> =>
    del(`/rooms/${code}`),
}
