import { useCallback } from 'react'
import { api } from '../api/client'
import { cacheAnswer, loadAnswers } from '../stores/session'

export function useAnswers(participantId: number | null) {
  const saveAnswer = useCallback(
    async (stageId: string, questionKey: string, text: string) => {
      // Write-through: cache first, then sync to server
      cacheAnswer(stageId, questionKey, text)
      if (participantId) {
        await api.saveAnswer(participantId, stageId, questionKey, text).catch(() => {
          // Server sync failure is non-fatal — answer is safely in localStorage
        })
      }
    },
    [participantId],
  )

  const getAnswer = useCallback(
    (stageId: string, questionKey: string): string => {
      return loadAnswers()[`${stageId}:${questionKey}`] ?? ''
    },
    [],
  )

  return { saveAnswer, getAnswer }
}
