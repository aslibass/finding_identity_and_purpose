import { useEffect, useState } from 'react'
import { STAGE_LABELS, STAGE_ORDER } from '../api/types'
import type { ParticipantState } from '../hooks/useFacilitatorSocket'

const HIGH_VULNERABILITY = new Set(['I-4', 'I-5', 'P-3'])
const IDENTITY_STAGES = new Set(['I-1','I-2','I-3','I-4','I-5','I-6'])
const STAGE_INDEX = Object.fromEntries(STAGE_ORDER.map((s, i) => [s, i]))

function formatDuration(ms: number): string {
  const mins = Math.floor(ms / 60000)
  if (mins < 1) return 'just arrived'
  if (mins === 1) return '1 min'
  if (mins < 60) return `${mins} mins`
  const hrs = Math.floor(mins / 60)
  const rem = mins % 60
  return rem > 0 ? `${hrs}h ${rem}m` : `${hrs}h`
}

interface Props {
  participant: ParticipantState
}

export function ParticipantCard({ participant }: Props) {
  const [, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 30000)
    return () => clearInterval(id)
  }, [])

  const { display_name, current_stage, stage_entered_at } = participant
  const stageName = STAGE_LABELS[current_stage as keyof typeof STAGE_LABELS] ?? current_stage
  const isSensitive = HIGH_VULNERABILITY.has(current_stage)
  const isIdentity = IDENTITY_STAGES.has(current_stage)
  const isDone = current_stage === 'P-7'
  const timeOnStage = Date.now() - stage_entered_at
  const isPaused = timeOnStage > 15 * 60 * 1000 && !isDone // > 15 mins

  // Progress: filled dots for completed stages, current = amber, rest = empty
  const currentIdx = STAGE_INDEX[current_stage] ?? 0
  const totalStages = STAGE_ORDER.length

  return (
    <div className={[
      'rounded border p-4 space-y-3 transition-all',
      isDone
        ? 'bg-stage-green/10 border-stage-green/30'
        : isPaused
          ? 'bg-terracotta/5 border-terracotta/30'
          : 'bg-input-bg border-sand',
    ].join(' ')}>

      {/* Name + arc badge */}
      <div className="flex items-start justify-between gap-2">
        <p className="font-serif text-lg text-charcoal leading-tight">{display_name}</p>
        <span className={[
          'font-sans text-xs px-2 py-0.5 rounded-full flex-shrink-0',
          isDone
            ? 'bg-stage-green/20 text-stage-green'
            : isIdentity
              ? 'bg-camel/20 text-camel'
              : 'bg-burgundy/10 text-burgundy',
        ].join(' ')}>
          {isDone ? 'Complete' : isIdentity ? 'Identity' : 'Purpose'}
        </span>
      </div>

      {/* Stage info */}
      <div>
        {isSensitive ? (
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta flex-shrink-0" />
            <p className="font-sans text-xs text-muted italic">
              {stageName} — sensitive stage
            </p>
          </div>
        ) : (
          <p className="font-sans text-xs text-charcoal">{stageName}</p>
        )}
        <div className="flex items-center gap-2 mt-1">
          <p className="font-sans text-xs text-muted">{formatDuration(timeOnStage)}</p>
          {isPaused && (
            <span className="font-sans text-xs text-terracotta">· paused here</span>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex gap-0.5">
        {STAGE_ORDER.map((s, i) => (
          <div
            key={s}
            className={[
              'h-1 flex-1 rounded-sm transition-colors',
              i < currentIdx ? 'bg-stage-green' :
              i === currentIdx ? 'bg-camel' :
              'bg-sand',
            ].join(' ')}
          />
        ))}
      </div>
      <p className="font-sans text-xs text-muted">
        {currentIdx + 1} of {totalStages}
      </p>
    </div>
  )
}
