import { useState } from 'react'
import { StageTemplate } from './StageTemplate'
import { StageTabBar } from '../components/StageTabBar'
import { QuestionBlock } from '../components/QuestionBlock'
import { useAnswers } from '../hooks/useAnswers'

const WORTH_ITEMS = [
  { key: 'role',         label: 'My job or main role' },
  { key: 'ability',      label: 'My ability to do something I am known for' },
  { key: 'reputation',   label: 'My reputation' },
  { key: 'usefulness',   label: 'My usefulness to other people' },
  { key: 'competence',   label: 'My competence or expertise' },
  { key: 'productivity', label: 'My productivity' },
  { key: 'creativity',   label: 'My creativity or skill' },
  { key: 'relationships',label: 'My relationships' },
  { key: 'status',       label: 'My status or influence' },
  { key: 'needed',       label: 'My sense of being needed' },
]

const ALWAYS = ['None of these fit me yet', 'Other (my own words)']

const QUESTIONS = [
  {
    key: 'q1', label: 'When do you feel most secure in yourself?',
    options: ['When I am performing well', 'When people affirm me', 'When I am needed by others', 'When I am in control', 'When I feel spiritually "on track"', ...ALWAYS],
  },
  {
    key: 'q2', label: 'What do you protect most carefully about your image?',
    options: ['Competence', 'Moral consistency', 'Spiritual maturity', 'Helpfulness', 'Independence', 'Composure', ...ALWAYS],
  },
  {
    key: 'q3', label: 'If your work, role, or reputation changed tomorrow, what would feel threatened?',
    options: ['My sense of worth', 'My place in community', 'My financial safety', 'My identity as useful', 'My confidence', 'My sense of calling', ...ALWAYS],
  },
  {
    key: 'q4', label: 'What do you reach for when you feel unseen, inadequate, or behind?',
    options: ['Work harder', 'Withdraw', 'Seek approval', 'Compare myself', 'Distract myself', 'Perform spiritually', ...ALWAYS],
  },
  {
    key: 'q5', label: 'Whose approval still matters too much?',
    options: ['Family', 'Partner or close friend', 'Church leaders', 'Colleagues or clients', 'Social audience', 'No single person, but people in general', ...ALWAYS],
  },
]

interface Props {
  participantId: number
  onComplete: () => void
}

export function I1HonestInventory({ participantId, onComplete }: Props) {
  const { saveAnswer, getAnswer } = useAnswers(participantId)

  const [activeTab, setActiveTab] = useState('Exercise')

  const [selected, setSelected] = useState<Set<string>>(() => {
    const raw = getAnswer('I-1', 'checklist')
    try { return new Set(JSON.parse(raw)) } catch { return new Set() }
  })

  const [qOptions, setQOptions] = useState<Record<string, string>>(() =>
    Object.fromEntries(QUESTIONS.map(q => [q.key, getAnswer('I-1', `${q.key}_opt`)]))
  )
  const [qExamples, setQExamples] = useState<Record<string, string>>(() =>
    Object.fromEntries(QUESTIONS.map(q => [q.key, getAnswer('I-1', q.key)]))
  )

  function toggleItem(key: string) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      saveAnswer('I-1', 'checklist', JSON.stringify([...next]))
      return next
    })
  }

  function handleSelectOption(key: string, value: string) {
    setQOptions(prev => ({ ...prev, [key]: value }))
    saveAnswer('I-1', `${key}_opt`, value)
    if (value === 'None of these fit me yet') {
      setQExamples(prev => ({ ...prev, [key]: '' }))
      saveAnswer('I-1', key, '')
    }
  }

  function handleChangeExample(key: string, value: string) {
    setQExamples(prev => ({ ...prev, [key]: value }))
    saveAnswer('I-1', key, value)
  }

  const isComplete = selected.size > 0 && QUESTIONS.every(q => {
    const opt = qOptions[q.key]
    if (!opt) return false
    if (opt === 'None of these fit me yet') return true
    return qExamples[q.key]?.trim().length > 0
  })

  return (
    <StageTemplate
      arc="Identity"
      stageNum="Stage 1"
      title="The Honest Inventory"
      invitation="Where do I actually derive my worth right now?"
      isComplete={isComplete}
      onComplete={onComplete}
    >
      <StageTabBar
        tabs={['Exercise', 'Questions']}
        active={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'Exercise' && (
        <div className="fade-in space-y-6">
          <p className="font-sans text-sm text-charcoal leading-relaxed">
            Select every line that would feel threatening if it were taken away.
            Keep the first pass simple — select first, reflect later.
          </p>

          <div className="space-y-2">
            {WORTH_ITEMS.map(item => {
              const checked = selected.has(item.key)
              return (
                <button
                  key={item.key}
                  onClick={() => toggleItem(item.key)}
                  className={[
                    'w-full text-left px-4 py-3.5 rounded border transition-all duration-150 flex items-center gap-3 group',
                    checked ? 'bg-parchment border-camel' : 'bg-input-bg border-sand hover:border-sand/80',
                  ].join(' ')}
                >
                  <span className={[
                    'w-4 h-4 rounded-sm border flex-shrink-0 flex items-center justify-center transition-colors',
                    checked ? 'bg-burgundy border-burgundy' : 'border-sand group-hover:border-camel',
                  ].join(' ')}>
                    {checked && (
                      <svg className="w-2.5 h-2.5 text-ivory" fill="none" viewBox="0 0 10 10">
                        <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className="font-sans text-sm text-charcoal">{item.label}</span>
                </button>
              )
            })}
          </div>

          <div className="bg-parchment border border-sand rounded p-4">
            <p className="font-sans text-xs tracking-widest uppercase text-muted mb-2">Instructions</p>
            <ol className="space-y-1.5">
              <li className="font-sans text-sm text-charcoal flex gap-2"><span className="font-serif text-muted">1.</span>Select every line that feels threatening if removed.</li>
              <li className="font-sans text-sm text-charcoal flex gap-2"><span className="font-serif text-muted">2.</span>Continue only after at least one line is selected.</li>
            </ol>
          </div>

          <button
            onClick={() => setActiveTab('Questions')}
            disabled={selected.size === 0}
            className="bg-burgundy text-ivory font-sans text-xs tracking-widest uppercase px-6 py-2.5 rounded hover:bg-burgundy-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue to questions →
          </button>
        </div>
      )}

      {activeTab === 'Questions' && (
        <div className="fade-in space-y-8">
          {selected.size > 0 && (
            <div className="bg-parchment border border-sand rounded p-4">
              <p className="font-sans text-xs tracking-widest uppercase text-muted mb-2">You selected</p>
              <ul className="space-y-1">
                {WORTH_ITEMS.filter(i => selected.has(i.key)).map(i => (
                  <li key={i.key} className="font-sans text-sm text-charcoal flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-camel flex-shrink-0" />
                    {i.label}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {QUESTIONS.map((q, i) => (
            <QuestionBlock
              key={q.key}
              index={i + 1}
              label={q.label}
              options={q.options}
              selectedOption={qOptions[q.key] ?? ''}
              example={qExamples[q.key] ?? ''}
              onSelectOption={val => handleSelectOption(q.key, val)}
              onChangeExample={val => handleChangeExample(q.key, val)}
            />
          ))}
        </div>
      )}
    </StageTemplate>
  )
}
