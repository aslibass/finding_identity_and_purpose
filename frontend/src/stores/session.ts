import { useState, useEffect } from 'react'

export interface Session {
  participantId: number
  displayName: string
  roomCode: string
  currentStage: string
}

const KEY = 'workshop_session'

export function loadSession(): Session | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveSession(s: Session) {
  localStorage.setItem(KEY, JSON.stringify(s))
}

export function clearSession() {
  localStorage.removeItem(KEY)
}

// Answer cache: { `${stageId}:${questionKey}` -> answerText }
const ANSWERS_KEY = 'workshop_answers'

export function loadAnswers(): Record<string, string> {
  try {
    const raw = localStorage.getItem(ANSWERS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function cacheAnswer(stageId: string, questionKey: string, text: string) {
  const answers = loadAnswers()
  answers[`${stageId}:${questionKey}`] = text
  localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers))
}

export function clearAnswers() {
  localStorage.removeItem(ANSWERS_KEY)
}
