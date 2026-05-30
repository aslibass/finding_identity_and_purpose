import { useState } from 'react'
import { StageTemplate } from './StageTemplate'
import { StageTabBar } from '../components/StageTabBar'
import { QuestionBlock } from '../components/QuestionBlock'
import { useAnswers } from '../hooks/useAnswers'

const VALUES = ['Comfort', 'Truth', 'Approval', 'Control', 'Peace', 'Loyalty']

const ALWAYS = ['None of these fit me yet', 'Other (my own words)']

const QUESTIONS = [
  {
    key: 'q1', label: 'What do you protect when pressure rises?',
    options: ['Reputation', 'Relationships', 'Comfort', 'Truthfulness', 'Control', 'Time and energy boundaries', ...ALWAYS],
  },
  {
    key: 'q2', label: 'What do your recent sacrifices reveal about what matters most?',
    options: ['Security', 'Achievement', 'Family or community', 'Calling or service', 'Integrity', 'Rest and sustainability', ...ALWAYS],
  },
  {
    key: 'q3', label: 'Which of your stated values has cost you something real?',
    options: ['Honesty', 'Generosity', 'Faithfulness', 'Justice', 'Mercy', 'Humility', ...ALWAYS],
  },
  {
    key: 'q4', label: 'When have you chosen integrity over convenience?',
    options: ['In work decisions', 'In finances', 'In relationships', 'In speech and truth-telling', 'In sexual or moral boundaries', 'I cannot name a clear moment yet', ...ALWAYS],
  },
  {
    key: 'q5', label: 'What do you say no to because of what you believe?',
    options: ['Overwork', 'Compromise for approval', 'Dishonest shortcuts', 'Gossip or contempt', 'Commitments beyond capacity', 'Role drift from core calling', ...ALWAYS],
  },
]

interface Props {
  participantId: number
  onComplete: () => void
}

export function P1ValuesConvictions({ participantId, onComplete }: Props) {
  const { saveAnswer, getAnswer } = useAnswers(participantId)
  const [activeTab, setActiveTab] = useState('Exercise')

  const [ranking, setRanking] = useState<string[]>(() => {
    const saved = getAnswer('P-1', 'ranking')
    try { return JSON.parse(saved) } catch { return [...VALUES] }
  })

  const [qOptions, setQOptions] = useState<Record<string, string>>(() =>
    Object.fromEntries(QUESTIONS.map(q => [q.key, getAnswer('P-1', `${q.key}_opt`)]))
  )
  const [qExamples, setQExamples] = useState<Record<string, string>>(() =>
    Object.fromEntries(QUESTIONS.map(q => [q.key, getAnswer('P-1', q.key)]))
  )

  function move(i: number, dir: -1 | 1) {
    const next = [...ranking]
    ;[next[i], next[i + dir]] = [next[i + dir], next[i]]
    setRanking(next)
    saveAnswer('P-1', 'ranking', JSON.stringify(next))
  }

  function handleSelectOption(key: string, value: string) {
    setQOptions(prev => ({ ...prev, [key]: value }))
    saveAnswer('P-1', `${key}_opt`, value)
    if (value === 'None of these fit me yet') {
      setQExamples(prev => ({ ...prev, [key]: '' }))
      saveAnswer('P-1', key, '')
    }
  }

  function handleChangeExample(key: string, value: string) {
    setQExamples(prev => ({ ...prev, [key]: value }))
    saveAnswer('P-1', key, value)
  }

  const isComplete = QUESTIONS.every(q => {
    const opt = qOptions[q.key]
    if (!opt) return false
    if (opt === 'None of these fit me yet') return true
    return qExamples[q.key]?.trim().length > 0
  })

  return (
    <StageTemplate
      arc="Purpose"
      stageNum="Stage 1"
      title="Values & Convictions"
      invitation="What do I consistently choose when it costs me something?"
      isComplete={isComplete}
      onComplete={onComplete}
    >
      <StageTabBar tabs={['Exercise', 'Questions']} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'Exercise' && (
        <div className="fade-in space-y-6">
          <p className="font-sans text-sm text-charcoal leading-relaxed">
            Rank these values in the order you actually protect them under pressure — not the order you aspire to.
            Start with what you would defend hardest.
          </p>

          <div className="space-y-2">
            {ranking.map((val, i) => (
              <div key={val} className="flex items-center gap-3 bg-input-bg border border-sand rounded px-4 py-3">
                <span className="font-serif text-muted text-sm w-5 text-right flex-shrink-0">{i + 1}</span>
                <span className="font-sans text-sm text-charcoal flex-1">{val}</span>
                <div className="flex gap-1">
                  <button onClick={() => move(i, -1)} disabled={i === 0}
                    className="w-7 h-7 flex items-center justify-center text-muted hover:text-charcoal disabled:opacity-30 transition-colors">↑</button>
                  <button onClick={() => move(i, 1)} disabled={i === ranking.length - 1}
                    className="w-7 h-7 flex items-center justify-center text-muted hover:text-charcoal disabled:opacity-30 transition-colors">↓</button>
                </div>
              </div>
            ))}
          </div>

          <p className="font-sans text-xs text-muted italic">Your order: {ranking.join(' → ')}</p>

          <button onClick={() => setActiveTab('Questions')}
            className="bg-burgundy text-ivory font-sans text-xs tracking-widest uppercase px-6 py-2.5 rounded hover:bg-burgundy-light transition-colors">
            Continue to questions →
          </button>
        </div>
      )}

      {activeTab === 'Questions' && (
        <div className="fade-in space-y-8">
          {QUESTIONS.map((q, i) => (
            <QuestionBlock key={q.key} index={i + 1} label={q.label} options={q.options}
              selectedOption={qOptions[q.key] ?? ''} example={qExamples[q.key] ?? ''}
              onSelectOption={val => handleSelectOption(q.key, val)}
              onChangeExample={val => handleChangeExample(q.key, val)} />
          ))}
        </div>
      )}
    </StageTemplate>
  )
}
