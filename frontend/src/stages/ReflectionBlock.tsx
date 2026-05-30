interface Question {
  key: string
  label: string
  rows?: number
}

interface Props {
  stageId: string
  questions: Question[]
  answers: Record<string, string>
  onChange: (key: string, value: string) => void
  intro?: string
}

export function ReflectionBlock({ stageId: _stageId, questions, answers, onChange, intro }: Props) {
  return (
    <div className="space-y-7">
      {intro && (
        <p className="font-sans text-sm text-charcoal leading-relaxed border-l-2 border-camel pl-4 italic">
          {intro}
        </p>
      )}
      {questions.map((q, i) => (
        <div key={q.key}>
          <label className="block font-sans text-sm text-charcoal leading-relaxed mb-2">
            <span className="font-serif text-muted mr-2">{i + 1}.</span>
            {q.label}
          </label>
          <textarea
            value={answers[q.key] ?? ''}
            onChange={e => onChange(q.key, e.target.value)}
            rows={q.rows ?? 3}
            className="w-full bg-input-bg border border-sand rounded px-4 py-3 font-sans text-sm text-charcoal placeholder-muted/50 focus:outline-none focus:border-camel resize-none transition-colors leading-relaxed"
            placeholder="Take your time…"
          />
        </div>
      ))}
    </div>
  )
}
