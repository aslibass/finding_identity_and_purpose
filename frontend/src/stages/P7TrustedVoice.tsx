import { useState, useMemo } from 'react'
import { StageTemplate } from './StageTemplate'
import { buildArtifact, buildPrompt } from '../utils/trustedVoiceUtils'

interface Props {
  participantId: number
  onComplete: () => void
}

export function P7TrustedVoice({ participantId: _participantId, onComplete }: Props) {
  const [copied, setCopied] = useState(false)

  const artifact = useMemo(() => buildArtifact(), [])
  const prompt = useMemo(() => buildPrompt(artifact), [artifact])

  const hasAnswers = artifact.trim().length > 0

  async function handleCopy() {
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <StageTemplate
      arc="Purpose"
      stageNum="Stage 7"
      title="The Trusted Voice"
      invitation="Take your journey to a trusted theological voice for review and deeper discernment."
      isComplete
      onComplete={onComplete}
    >
      <div className="space-y-6">
        <p className="font-sans text-sm text-charcoal leading-relaxed">
          Your workshop answers have been assembled into a structured prompt. Paste it into a conversation
          with Claude — or any AI you trust — to receive a theological review of your journey, grounded
          in the trusted sources that shaped this workshop.
        </p>

        <div className="bg-parchment border border-sand rounded p-5 space-y-3">
          <p className="font-sans text-xs tracking-widest uppercase text-muted">What you will receive</p>
          <ul className="space-y-2">
            {[
              'A review of your calling statement for biblical grounding and coherence',
              'A check on whether story, gifts, and burden genuinely converge',
              'A reflection on the connection between the lie you named and the calling you arrived at',
              '2–3 book recommendations from the trusted sources, specific to your journey',
              'One honest question worth sitting with before you act',
              'A short Scripture-rooted blessing',
            ].map(item => (
              <li key={item} className="font-sans text-sm text-charcoal flex items-start gap-2.5">
                <span className="w-1 h-1 rounded-full bg-camel flex-shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {!hasAnswers && (
          <div className="border border-terracotta/30 bg-terracotta/5 rounded p-4">
            <p className="font-sans text-sm text-terracotta">
              No answers found in this session. Complete the workshop stages first, then return here to generate your prompt.
            </p>
          </div>
        )}

        {/* Prompt preview */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="font-sans text-xs tracking-widest uppercase text-muted">Your prompt</p>
            <button
              onClick={handleCopy}
              className={[
                'font-sans text-xs tracking-widest uppercase px-4 py-2 rounded transition-all',
                copied
                  ? 'bg-stage-green text-ivory'
                  : 'bg-burgundy text-ivory hover:bg-burgundy-light',
              ].join(' ')}
            >
              {copied ? '✓ Copied' : 'Copy prompt'}
            </button>
          </div>
          <div className="relative">
            <textarea
              readOnly
              value={prompt}
              rows={16}
              className="w-full bg-input-bg border border-sand rounded px-4 py-3 font-mono text-xs text-charcoal leading-relaxed resize-none focus:outline-none focus:border-camel"
            />
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent rounded-b pointer-events-none" />
          </div>
          <p className="font-sans text-xs text-muted mt-2 italic">
            Scroll to read the full prompt. Copy it and paste into a new Claude conversation.
          </p>
        </div>

        {/* Artifact preview */}
        {hasAnswers && (
          <details className="group">
            <summary className="font-sans text-xs tracking-widest uppercase text-muted cursor-pointer hover:text-charcoal transition-colors list-none flex items-center gap-2">
              <span className="group-open:rotate-90 transition-transform inline-block">›</span>
              Preview your assembled answers
            </summary>
            <pre className="mt-3 font-mono text-xs text-muted bg-parchment border border-sand rounded p-4 whitespace-pre-wrap leading-relaxed overflow-auto max-h-64">
              {artifact}
            </pre>
          </details>
        )}
      </div>
    </StageTemplate>
  )
}
