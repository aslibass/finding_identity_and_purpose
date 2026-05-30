interface Props {
  tabs: string[]
  active: string
  onChange: (tab: string) => void
}

export function StageTabBar({ tabs, active, onChange }: Props) {
  return (
    <div className="flex gap-0 border-b border-sand mb-8">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={[
            'px-5 py-2.5 font-sans text-xs tracking-widest uppercase transition-colors border-b-2 -mb-px',
            active === tab
              ? 'border-burgundy text-burgundy'
              : 'border-transparent text-muted hover:text-charcoal',
          ].join(' ')}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
