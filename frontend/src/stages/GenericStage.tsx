import { useState } from 'react'
import { StageTemplate } from './StageTemplate'
import { StageTabBar } from '../components/StageTabBar'
import { QuestionBlock } from '../components/QuestionBlock'
import { useAnswers } from '../hooks/useAnswers'
import type { StageConfig } from './stageConfigs'

interface Props {
  config: StageConfig
  participantId: number
  onComplete: () => void
}

export function GenericStage({ config, participantId, onComplete }: Props) {
  const { saveAnswer, getAnswer } = useAnswers(participantId)
  const hasExercise = !!config.exercise
  const tabs = hasExercise ? ['Exercise', 'Questions'] : ['Questions']
  const [activeTab, setActiveTab] = useState(tabs[0])

  // options: `{key}_opt`, examples: `{key}_ex` (also stored as bare `{key}` for P-4 compat)
  const [options, setOptions] = useState<Record<string, string>>(() =>
    Object.fromEntries(config.questions.map(q => [q.key, getAnswer(config.stageId, `${q.key}_opt`)]))
  )
  const [examples, setExamples] = useState<Record<string, string>>(() =>
    Object.fromEntries(config.questions.map(q => [q.key, getAnswer(config.stageId, q.key)]))
  )

  function handleSelectOption(key: string, value: string) {
    setOptions(prev => ({ ...prev, [key]: value }))
    saveAnswer(config.stageId, `${key}_opt`, value)
    // If "None of these fit me yet" is selected, clear any existing example
    if (value === 'None of these fit me yet') {
      setExamples(prev => ({ ...prev, [key]: '' }))
      saveAnswer(config.stageId, key, '')
    }
  }

  function handleChangeExample(key: string, value: string) {
    setExamples(prev => ({ ...prev, [key]: value }))
    saveAnswer(config.stageId, key, value)   // bare key for P-4 compatibility
  }

  const isComplete = config.questions.every(q => {
    const opt = options[q.key]
    if (!opt) return false
    if (opt === 'None of these fit me yet') return true
    return examples[q.key]?.trim().length > 0
  })

  return (
    <StageTemplate
      arc={config.arc}
      stageNum={config.stageNum}
      title={config.title}
      invitation={config.invitation}
      isComplete={isComplete}
      onComplete={onComplete}
    >
      {hasExercise && <StageTabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />}

      {activeTab === 'Exercise' && config.exercise && (
        <div className="fade-in space-y-5">
          <p className="font-sans text-sm text-charcoal leading-relaxed">
            {config.exercise.description}
          </p>
          <div className="bg-parchment border border-sand rounded p-5 space-y-3">
            <p className="font-sans text-xs tracking-widest uppercase text-muted">Instructions</p>
            <ol className="space-y-1.5">
              {config.exercise.config.instructions.map((step, i) => (
                <li key={i} className="font-sans text-sm text-charcoal flex gap-2">
                  <span className="font-serif text-muted flex-shrink-0">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
            {config.exercise.config.visual && (
              <pre className="font-mono text-xs text-muted bg-ivory border border-sand rounded p-3 mt-3 whitespace-pre-wrap">
                {config.exercise.config.visual}
              </pre>
            )}
          </div>
          <button
            onClick={() => setActiveTab('Questions')}
            className="bg-burgundy text-ivory font-sans text-xs tracking-widest uppercase px-6 py-2.5 rounded hover:bg-burgundy-light transition-colors"
          >
            Continue to questions →
          </button>
        </div>
      )}

      {activeTab === 'Questions' && (
        <div className="fade-in space-y-8">
          {config.questions.map((q, i) => (
            <QuestionBlock
              key={q.key}
              index={i + 1}
              label={q.label}
              options={q.options}
              selectedOption={options[q.key] ?? ''}
              example={examples[q.key] ?? ''}
              onSelectOption={val => handleSelectOption(q.key, val)}
              onChangeExample={val => handleChangeExample(q.key, val)}
            />
          ))}
        </div>
      )}
    </StageTemplate>
  )
}
