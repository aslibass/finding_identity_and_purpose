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

      const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

      let markdown = `# Identity & Purpose Workshop\n\n`
      markdown += `**Participant:** ${displayName}\n`
      markdown += `**Completed:** ${date}\n\n`
      markdown += `---\n\n`

      // Group answers by stage
      const answersByStage = new Map<string, typeof answers>()
      answers.forEach(answer => {
        if (!answersByStage.has(answer.stage_id)) {
          answersByStage.set(answer.stage_id, [])
        }
        answersByStage.get(answer.stage_id)!.push(answer)
      })

      // Render each stage with its answers
      for (const stageId of Object.keys(STAGE_LABELS)) {
        const stageAnswers = answersByStage.get(stageId)
        if (!stageAnswers) continue

        const stageName = STAGE_LABELS[stageId as keyof typeof STAGE_LABELS]
        markdown += `## ${stageId}: ${stageName}\n\n`

        stageAnswers.forEach((answer, idx) => {
          markdown += `### Question ${idx + 1}\n`
          markdown += `${answer.question_key}\n\n`
          markdown += `**Your Response:**\n`
          markdown += `${answer.answer_text}\n\n`
        })

        markdown += `---\n\n`
      }

      const timestamp = new Date().toISOString().split('T')[0]
      const filename = `identity-purpose-${displayName.replace(/\s+/g, '-')}-${timestamp}.md`

      const blob = new Blob([markdown], { type: 'text/markdown' })
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
