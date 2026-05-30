import { useState } from 'react'
import { StageTemplate } from './StageTemplate'
import { StageTabBar } from '../components/StageTabBar'
import { QuestionBlock } from '../components/QuestionBlock'
import { useAnswers } from '../hooks/useAnswers'

const ALWAYS = ['None of these fit me yet', 'Other (my own words)']

const QUESTIONS = [
  {
    key: 'q1', label: 'What is the next faithful step in front of you, and by what date will you do it?',
    options: ['Begin one concrete action this week', 'Schedule one difficult conversation', 'Start one recurring practice', 'Stop one competing commitment', 'Ask one person for accountability', 'I cannot name the step yet', ...ALWAYS],
  },
  {
    key: 'q2', label: 'What can you do in the next seven days that would count as obedience?',
    options: ['Have one honest conversation', 'Make one decision I have delayed', 'Commit one hour to focused action', 'Confess one hidden issue', 'Set one boundary and communicate it', 'Ask for prayer and support', ...ALWAYS],
  },
  {
    key: 'q3', label: 'What would make this step real rather than theoretical?',
    options: ['Calendar it', 'Tell a witness', 'Break it into first small task', 'Set a deadline with consequence', 'Remove one barrier now', 'Track completion visibly', ...ALWAYS],
  },
  {
    key: 'q4', label: 'What support or constraint do you need to move?',
    options: ['Accountability partner', 'Time block and protected focus', 'Clear boundaries', 'Practical resources', 'Emotional encouragement', 'Spiritual covering and prayer', ...ALWAYS],
  },
  {
    key: 'q5', label: 'What are you prepared to say yes to, and what must you leave behind?',
    options: ['Yes to obedience, no to delay', 'Yes to truth, no to image management', 'Yes to service, no to self-protection', 'Yes to faithfulness, no to distraction', 'Yes to accountability, no to isolation', 'I am not yet ready to answer this clearly', ...ALWAYS],
  },
]

interface Props {
  participantId: number
  onComplete: () => void
}

export function P6WhatsMIneToDo({ participantId, onComplete }: Props) {
  const { saveAnswer, getAnswer } = useAnswers(participantId)
  const [activeTab, setActiveTab] = useState('Exercise')

  const [commitment, setCommitment] = useState({
    action:  getAnswer('P-6', 'commit_action'),
    date:    getAnswer('P-6', 'commit_date'),
    witness: getAnswer('P-6', 'commit_witness'),
  })
  const [cardVisible, setCardVisible] = useState(false)

  const [qOptions, setQOptions] = useState<Record<string, string>>(() =>
    Object.fromEntries(QUESTIONS.map(q => [q.key, getAnswer('P-6', `${q.key}_opt`)]))
  )
  const [qExamples, setQExamples] = useState<Record<string, string>>(() =>
    Object.fromEntries(QUESTIONS.map(q => [q.key, getAnswer('P-6', q.key)]))
  )

  function handleSelectOption(key: string, value: string) {
    setQOptions(prev => ({ ...prev, [key]: value }))
    saveAnswer('P-6', `${key}_opt`, value)
    if (value === 'None of these fit me yet') {
      setQExamples(prev => ({ ...prev, [key]: '' }))
      saveAnswer('P-6', key, '')
    }
  }

  function handleChangeExample(key: string, value: string) {
    setQExamples(prev => ({ ...prev, [key]: value }))
    saveAnswer('P-6', key, value)
  }

  function handleCommitChange(field: 'action' | 'date' | 'witness', value: string) {
    setCommitment(prev => ({ ...prev, [field]: value }))
    saveAnswer('P-6', `commit_${field}`, value)
  }

  const questionsComplete = QUESTIONS.every(q => {
    const opt = qOptions[q.key]
    if (!opt) return false
    if (opt === 'None of these fit me yet') return true
    return qExamples[q.key]?.trim().length > 0
  })
  const commitmentComplete = commitment.action.trim() && commitment.date.trim() && commitment.witness.trim()
  const isComplete = questionsComplete && !!commitmentComplete

  return (
    <StageTemplate
      arc="Purpose"
      stageNum="Stage 6"
      title="What's Mine to Do"
      invitation="What is the one obedient step I'm being invited into?"
      isComplete={isComplete}
      onComplete={onComplete}
    >
      <StageTabBar tabs={['Exercise', 'Questions']} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'Exercise' && (
        <div className="fade-in space-y-6">
          <p className="font-sans text-sm text-charcoal leading-relaxed">
            Name one concrete action, one date, and one person who will know about it.
            If you cannot name all three, stay here until you can.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-muted mb-2">The action</label>
              <textarea value={commitment.action} onChange={e => handleCommitChange('action', e.target.value)}
                rows={2} placeholder="I will…"
                className="w-full bg-input-bg border border-sand rounded px-4 py-3 font-sans text-sm text-charcoal focus:outline-none focus:border-camel resize-none transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-muted mb-2">By this date</label>
                <input type="date" value={commitment.date} onChange={e => handleCommitChange('date', e.target.value)}
                  className="w-full bg-input-bg border border-sand rounded px-4 py-3 font-sans text-sm text-charcoal focus:outline-none focus:border-camel transition-colors" />
              </div>
              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-muted mb-2">Witness — who will know</label>
                <input type="text" value={commitment.witness} onChange={e => handleCommitChange('witness', e.target.value)}
                  placeholder="Name"
                  className="w-full bg-input-bg border border-sand rounded px-4 py-3 font-sans text-sm text-charcoal focus:outline-none focus:border-camel transition-colors" />
              </div>
            </div>
          </div>

          {commitmentComplete && (
            <div className="fade-in space-y-3">
              <button onClick={() => setCardVisible(v => !v)}
                className="font-sans text-sm text-burgundy hover:text-burgundy-light transition-colors underline underline-offset-2">
                {cardVisible ? 'Hide commitment card' : 'Preview commitment card'}
              </button>
              {cardVisible && (
                <div className="border-2 border-camel rounded p-7 bg-parchment fade-in">
                  <p className="font-sans text-xs tracking-widest uppercase text-muted mb-4">Commitment Card · Identity &amp; Purpose Workshop</p>
                  <p className="font-serif text-2xl text-charcoal mb-6 leading-snug">What's Mine to Do</p>
                  <div className="space-y-4 text-sm font-sans text-charcoal">
                    <div><p className="text-muted text-xs uppercase tracking-wider mb-1">I will</p><p className="leading-relaxed">{commitment.action}</p></div>
                    <div className="grid grid-cols-2 gap-6">
                      <div><p className="text-muted text-xs uppercase tracking-wider mb-1">By</p><p>{commitment.date}</p></div>
                      <div><p className="text-muted text-xs uppercase tracking-wider mb-1">Witness</p><p>{commitment.witness}</p></div>
                    </div>
                    <div className="pt-4 border-t border-sand"><p className="text-muted text-xs uppercase tracking-wider mb-3">Signature</p><div className="h-8 border-b border-sand w-48" /></div>
                    <p className="text-muted text-xs pt-2">Generated {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
              )}
              {cardVisible && (
                <button onClick={() => window.print()}
                  className="bg-burgundy text-ivory font-sans text-xs tracking-widest uppercase px-6 py-2.5 rounded hover:bg-burgundy-light transition-colors">
                  Print / Save as PDF
                </button>
              )}
            </div>
          )}

          <button onClick={() => setActiveTab('Questions')} disabled={!commitmentComplete}
            className="bg-burgundy text-ivory font-sans text-xs tracking-widest uppercase px-6 py-2.5 rounded hover:bg-burgundy-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
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
