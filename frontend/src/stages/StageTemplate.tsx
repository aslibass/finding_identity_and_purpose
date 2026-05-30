import { ReactNode } from 'react'

interface Props {
  arc: 'Identity' | 'Purpose'
  stageNum: string
  title: string
  invitation: string
  isComplete: boolean
  onComplete: () => void
  children: ReactNode
}

export function StageTemplate({ arc, stageNum, title, invitation, isComplete, onComplete, children }: Props) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10 fade-in">
      <div className="mb-10">
        <p className="font-sans text-xs tracking-widest uppercase text-muted mb-3">
          {arc} · {stageNum}
        </p>
        <h2 className="font-serif text-4xl font-medium text-charcoal leading-snug">{title}</h2>
        <div className="mt-4 w-10 border-b-2 border-camel" />
        <p className="mt-5 font-sans text-base text-muted leading-relaxed">{invitation}</p>
      </div>

      <div className="space-y-8">{children}</div>

      <div className="border-t border-sand pt-6 mt-10">
        <button
          onClick={onComplete}
          disabled={!isComplete}
          className="bg-burgundy text-ivory font-sans text-sm tracking-widest uppercase px-8 py-3 rounded hover:bg-burgundy-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Complete stage
        </button>
      </div>
    </div>
  )
}
