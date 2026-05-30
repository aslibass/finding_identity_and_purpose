interface Props {
  index: number
  label: string
  options: string[]
  selectedOption: string
  example: string
  onSelectOption: (value: string) => void
  onChangeExample: (value: string) => void
}

export function QuestionBlock({
  index, label, options, selectedOption, example, onSelectOption, onChangeExample,
}: Props) {
  const hasSelection = selectedOption.length > 0
  const needsExample = hasSelection && selectedOption !== 'None of these fit me yet'

  return (
    <div className="space-y-3">
      <p className="font-sans text-sm text-charcoal leading-relaxed">
        <span className="font-serif text-muted mr-2">{index}.</span>
        {label}
      </p>

      <div className="flex flex-wrap gap-2">
        {options.map(opt => {
          const active = selectedOption === opt
          return (
            <button
              key={opt}
              onClick={() => onSelectOption(active ? '' : opt)}
              className={[
                'px-3 py-1.5 rounded-full border font-sans text-xs transition-all duration-150',
                opt === 'None of these fit me yet'
                  ? active
                    ? 'bg-muted/20 border-muted text-charcoal'
                    : 'border-sand text-muted hover:border-muted/60'
                  : active
                    ? 'bg-burgundy text-ivory border-burgundy'
                    : 'bg-input-bg border-sand text-charcoal hover:border-camel/70',
              ].join(' ')}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {needsExample && (
        <textarea
          value={example}
          onChange={e => onChangeExample(e.target.value)}
          rows={3}
          placeholder={
            selectedOption === 'Other (my own words)'
              ? 'Describe in your own words — one concrete example…'
              : 'One concrete example — 1 to 3 sentences…'
          }
          className="w-full bg-input-bg border border-sand rounded px-4 py-3 font-sans text-sm text-charcoal placeholder-muted/50 focus:outline-none focus:border-camel resize-none transition-colors leading-relaxed fade-in"
        />
      )}
    </div>
  )
}
