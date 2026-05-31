import { useState } from 'react'
import { api } from '../api/client'
import { STAGE_LABELS } from '../api/types'

interface Props {
  participantId: number
  displayName: string
}

export function ExportButton({ participantId, displayName }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleExport() {
    setLoading(true)
    setError('')
    try {
      const answers = await api.getAnswers(participantId)

      const exportData = {
        exportDate: new Date().toISOString(),
        participantName: displayName,
        reflections: answers.map(answer => ({
          stage: answer.stage_id,
          stageName: STAGE_LABELS[answer.stage_id as keyof typeof STAGE_LABELS] || answer.stage_id,
          question: answer.question_key,
          answer: answer.answer_text,
          savedAt: answer.updated_at,
        })),
      }

      const timestamp = new Date().toISOString().split('T')[0]
      const filename = `identity-purpose-${displayName.replace(/\s+/g, '-')}-${timestamp}.json`

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export answers')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-6">
      <button
        onClick={handleExport}
        disabled={loading}
        className="px-6 py-3 bg-burgundy text-ivory font-sans text-sm tracking-widest uppercase rounded hover:bg-burgundy-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? 'Exporting...' : 'Export My Answers'}
      </button>
      {error && (
        <p className="mt-2 text-sm text-terracotta">{error}</p>
      )}
    </div>
  )
}
