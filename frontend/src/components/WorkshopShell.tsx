import { useState, useEffect } from 'react'
import { ProgressBar } from './ProgressBar'
import { I1HonestInventory } from '../stages/I1HonestInventory'
import { GenericStage } from '../stages/GenericStage'
import { P1ValuesConvictions } from '../stages/P1ValuesConvictions'
import { P4Convergence } from '../stages/P4Convergence'
import { P6WhatsMIneToDo } from '../stages/P6WhatsMIneToDo'
import { P7TrustedVoice } from '../stages/P7TrustedVoice'
import { STAGE_CONFIGS } from '../stages/stageConfigs'
import { useParticipantSocket } from '../hooks/useWebSocket'
import { saveSession } from '../stores/session'
import { STAGE_ORDER } from '../api/types'
import { ThemeToggle } from './ThemeToggle'
import { ExportButton } from './ExportButton'

interface Props {
  participantId: number
  displayName: string
  roomCode: string
  initialStage: string
}

export function WorkshopShell({ participantId, displayName, roomCode, initialStage }: Props) {
  const [currentStage, setCurrentStage] = useState(initialStage)
  const [completedStages, setCompletedStages] = useState<Set<string>>(new Set())
  const { sendStageUpdate, sendStageComplete } = useParticipantSocket(participantId)

  useEffect(() => {
    sendStageUpdate(currentStage)
  }, [currentStage, sendStageUpdate])

  function completeStage() {
    sendStageComplete(currentStage)
    setCompletedStages(prev => new Set([...prev, currentStage]))
    const idx = STAGE_ORDER.indexOf(currentStage as typeof STAGE_ORDER[number])
    const next = STAGE_ORDER[idx + 1]
    if (next) {
      setCurrentStage(next)
      saveSession({ participantId, displayName, roomCode, currentStage: next })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function renderStage() {
    switch (currentStage) {
      case 'I-1':
        return <I1HonestInventory participantId={participantId} onComplete={completeStage} />
      case 'P-1':
        return <P1ValuesConvictions participantId={participantId} onComplete={completeStage} />
      case 'P-4':
        return <P4Convergence participantId={participantId} onComplete={completeStage} />
      case 'P-6':
        return <P6WhatsMIneToDo participantId={participantId} onComplete={completeStage} />
      case 'P-7':
        return <P7TrustedVoice participantId={participantId} onComplete={completeStage} />
      default: {
        const config = STAGE_CONFIGS[currentStage]
        if (config) {
          return <GenericStage key={currentStage} config={config} participantId={participantId} onComplete={completeStage} />
        }
        return (
          <div className="max-w-2xl mx-auto px-6 py-20 text-center fade-in">
            <p className="font-sans text-xs tracking-widest uppercase text-muted mb-4">Coming soon</p>
            <h2 className="font-serif text-3xl text-charcoal">Stage {currentStage}</h2>
          </div>
        )
      }
    }
  }

  const isLastStage = currentStage === STAGE_ORDER[STAGE_ORDER.length - 1]
  const workshopDone = isLastStage && completedStages.has(currentStage)

  return (
    <div className="min-h-svh bg-ivory flex flex-col">
      <ProgressBar currentStage={currentStage} completedStages={completedStages} />

      <div className="flex-1">
        {workshopDone ? (
          <div className="max-w-2xl mx-auto px-6 py-20 text-center fade-in-slow">
            <div className="mb-6 mx-auto w-12 border-b-2 border-camel" />
            <h2 className="font-serif text-4xl font-medium text-charcoal mb-4">
              Well done.
            </h2>
            <p className="font-sans text-base text-muted leading-relaxed mb-8">
              You have completed the Identity &amp; Purpose workshop.<br />
              Download your reflections below.
            </p>
            <ExportButton participantId={participantId} displayName={displayName} />
          </div>
        ) : (
          renderStage()
        )}
      </div>

      <footer className="border-t border-sand px-6 py-4 bg-parchment">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <p className="font-sans text-xs text-muted">
            Room <span className="font-medium tracking-wider">{roomCode}</span>
            <span className="mx-2 text-sand">·</span>
            {displayName}
          </p>
          <ThemeToggle />
        </div>
      </footer>
    </div>
  )
}
