import { STAGE_ORDER, STAGE_LABELS, type StageId } from '../api/types'

interface Props {
  currentStage: string
  completedStages: Set<string>
}

const IDENTITY = STAGE_ORDER.slice(0, 6)
const PURPOSE  = STAGE_ORDER.slice(6)

function ArcDots({
  stages,
  currentStage,
  completedStages,
  label,
}: {
  stages: readonly StageId[]
  currentStage: string
  completedStages: Set<string>
  label: string
}) {
  return (
    <div className="flex-1 min-w-0">
      <p className="font-sans text-xs tracking-widest uppercase text-muted mb-2">{label}</p>
      <div className="flex gap-1.5">
        {stages.map(id => {
          const done    = completedStages.has(id)
          const active  = id === currentStage
          return (
            <div
              key={id}
              title={STAGE_LABELS[id]}
              className={[
                'h-1.5 flex-1 rounded-full transition-colors duration-300',
                done   ? 'bg-stage-green' :
                active ? 'bg-camel' :
                         'bg-sand',
              ].join(' ')}
            />
          )
        })}
      </div>
    </div>
  )
}

export function ProgressBar({ currentStage, completedStages }: Props) {
  const currentLabel = STAGE_LABELS[currentStage as StageId] ?? currentStage

  return (
    <div className="bg-parchment border-b border-sand px-6 py-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex gap-6">
          <ArcDots
            stages={IDENTITY}
            currentStage={currentStage}
            completedStages={completedStages}
            label="Identity"
          />
          <ArcDots
            stages={PURPOSE}
            currentStage={currentStage}
            completedStages={completedStages}
            label="Purpose"
          />
        </div>
        <p className="font-serif text-sm italic text-muted mt-2">{currentLabel}</p>
      </div>
    </div>
  )
}
