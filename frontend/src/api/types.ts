export interface RoomOut {
  id: number
  code: string
  created_at: string
}

export interface ParticipantOut {
  id: number
  display_name: string
  current_stage: string
  joined_at: string
}

export interface AnswerOut {
  id: number
  stage_id: string
  question_key: string
  answer_text: string
  updated_at: string
}

export interface RoomStatus {
  code: string
  participants: ParticipantOut[]
}

export const STAGE_ORDER = [
  'I-1', 'I-2', 'I-3', 'I-4', 'I-5', 'I-6',
  'P-1', 'P-2', 'P-3', 'P-4', 'P-5', 'P-6', 'P-7',
] as const

export type StageId = typeof STAGE_ORDER[number]

export const STAGE_LABELS: Record<StageId, string> = {
  'I-1': 'The Honest Inventory',
  'I-2': 'The Divine Signature',
  'I-3': 'The Unshakable Ground',
  'I-4': 'Lies & True Names',
  'I-5': 'The Shaped Story',
  'I-6': 'Repentance & Remaking',
  'P-1': 'Values & Convictions',
  'P-2': 'How You\'re Made',
  'P-3': 'What Breaks Your Heart',
  'P-4': 'The Convergence',
  'P-5': 'Community & Discernment',
  'P-6': 'What\'s Mine to Do',
  'P-7': 'The Trusted Voice',
}

export const HIGH_VULNERABILITY_STAGES = new Set<StageId>(['I-4', 'I-5', 'P-3'])
