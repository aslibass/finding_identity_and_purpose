import { useState } from 'react'
import { StageTemplate } from './StageTemplate'
import { StageTabBar } from '../components/StageTabBar'
import { QuestionBlock } from '../components/QuestionBlock'
import { useAnswers } from '../hooks/useAnswers'

const ALWAYS = ['None of these fit me yet', 'Other (my own words)']

const QUESTIONS = [
  {
    key: 'q1', label: 'Where do your story, gifts, and burden overlap most clearly?',
    options: ['Caring for people in pain with clarity and presence', 'Teaching and forming people in truth', 'Building communities of belonging and accountability', 'Leading practical systems that support people well', 'Guiding discernment and decision-making', 'Integrating creativity with spiritual formation', ...ALWAYS],
  },
  {
    key: 'q2', label: 'What keeps appearing across your answers so far?',
    options: ['A repeated people group', 'A repeated kind of problem', 'A repeated kind of contribution', 'A repeated warning not to ignore this', 'A repeated joy when serving this way', 'A repeated call to repentance and courage', ...ALWAYS],
  },
  {
    key: 'q3', label: 'What would feel like a faithful next step, not just a good idea?',
    options: ['Start a small pilot in current context', 'Ask for discernment from trusted mentors', 'Commit to one concrete weekly action', 'Stop one competing commitment', 'Seek training for this direction', 'Test the call through service in community', ...ALWAYS],
  },
  {
    key: 'q4', label: 'What pattern seems too persistent to ignore?',
    options: ['People keep coming to me with similar needs', 'I keep returning to the same burden', 'I keep seeing fruit in one type of service', 'I keep feeling convicted about one direction', 'I keep receiving confirmation from others', 'I keep resisting this, but it returns', ...ALWAYS],
  },
  {
    key: 'q5', label: 'If you named your calling in one sentence, what would it be?',
    options: ['To help people move from confusion to clarity in Christ', 'To create spaces of honest healing and formation', 'To teach and guide people toward faithful obedience', 'To build communities where people are known and strengthened', 'To serve quietly by making others\' growth possible', 'I am not ready to name this yet', ...ALWAYS],
  },
]

const PRIOR_CONTEXT = [
  { stageId: 'I-5', key: 'q5', label: "Your life's lesson (I-5)" },
  { stageId: 'P-1', key: 'q3', label: 'Your tested value (P-1)' },
  { stageId: 'P-2', key: 'q1', label: 'Your gift overlap (P-2)' },
  { stageId: 'P-3', key: 'q1', label: 'What you carry (P-3)' },
]

interface Props {
  participantId: number
  onComplete: () => void
}

export function P4Convergence({ participantId, onComplete }: Props) {
  const { saveAnswer, getAnswer } = useAnswers(participantId)
  const [activeTab, setActiveTab] = useState('Exercise')

  const priorAnswers = PRIOR_CONTEXT.map(p => ({
    ...p,
    text: getAnswer(p.stageId, p.key),
  })).filter(p => p.text.trim())

  const [qOptions, setQOptions] = useState<Record<string, string>>(() =>
    Object.fromEntries(QUESTIONS.map(q => [q.key, getAnswer('P-4', `${q.key}_opt`)]))
  )
  const [qExamples, setQExamples] = useState<Record<string, string>>(() =>
    Object.fromEntries(QUESTIONS.map(q => [q.key, getAnswer('P-4', q.key)]))
  )

  function handleSelectOption(key: string, value: string) {
    setQOptions(prev => ({ ...prev, [key]: value }))
    saveAnswer('P-4', `${key}_opt`, value)
    if (value === 'None of these fit me yet') {
      setQExamples(prev => ({ ...prev, [key]: '' }))
      saveAnswer('P-4', key, '')
    }
  }

  function handleChangeExample(key: string, value: string) {
    setQExamples(prev => ({ ...prev, [key]: value }))
    saveAnswer('P-4', key, value)
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
      stageNum="Stage 4"
      title="The Convergence"
      invitation="Where do my story, gifts, and burden point together?"
      isComplete={isComplete}
      onComplete={onComplete}
    >
      <StageTabBar tabs={['Exercise', 'Questions']} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'Exercise' && (
        <div className="fade-in space-y-5">
          <p className="font-sans text-sm text-charcoal leading-relaxed">
            Test the emerging pattern against Scripture, community, and observable fruit before naming it.
          </p>

          <div className="bg-parchment border border-sand rounded p-5 space-y-3">
            <p className="font-sans text-xs tracking-widest uppercase text-muted">Instructions</p>
            <ol className="space-y-1.5">
              {['Write one short line under each heading: Scripture, Community, Fruit.', 'Continue only when all three headings are filled.'].map((s, i) => (
                <li key={i} className="font-sans text-sm text-charcoal flex gap-2">
                  <span className="font-serif text-muted flex-shrink-0">{i + 1}.</span>{s}
                </li>
              ))}
            </ol>
            <pre className="font-mono text-xs text-muted bg-ivory border border-sand rounded p-3 mt-2 whitespace-pre-wrap">
              {`Scripture: Serves others, builds up the body.\nCommunity: Two trusted people confirm this pattern.\nFruit: Consistent obedience, not short-term excitement.`}
            </pre>
          </div>

          {priorAnswers.length > 0 && (
            <div className="border border-sand rounded p-4 space-y-3">
              <p className="font-sans text-xs tracking-widest uppercase text-muted">From your earlier answers</p>
              {priorAnswers.map(p => (
                <div key={`${p.stageId}-${p.key}`}>
                  <p className="font-sans text-xs text-muted mb-1">{p.label}</p>
                  <p className="font-sans text-sm text-charcoal border-l-2 border-sand pl-3 italic leading-relaxed">{p.text}</p>
                </div>
              ))}
              <p className="font-sans text-xs text-muted italic pt-1">Synthesise — don't repeat.</p>
            </div>
          )}

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
