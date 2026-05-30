import { useState } from 'react'
import { ThemeToggle } from './ThemeToggle'

const PERSONAS = [
  {
    name: 'Sarah Chen',
    role: 'Chief Operating Officer, 48',
    arc: 'Identity wound: worth built entirely on competence and output.',
    moments: [
      {
        stage: 'I-1 · The Honest Inventory',
        label: 'What feels threatening if removed',
        quote: 'My competence or expertise. My job or main role. My reputation. My productivity. My status or influence.',
        note: 'Six of ten items selected. Nothing relational.',
      },
      {
        stage: 'I-4 · Lies & True Names',
        label: 'The exact sentence she hears',
        quote: '"You are only as good as your last result."',
        note: "Her father. He was not cruel — he just never said it was enough.",
      },
      {
        stage: 'P-4 · The Convergence',
        label: 'Her calling in one sentence',
        quote: 'I am called to use operational excellence to dismantle the structural inequalities that keep people from the care they deserve.',
        note: 'Her mother was once the patient who waited. That name is on a report she still carries.',
      },
      {
        stage: 'P-6 · What\'s Mine to Do',
        label: 'Her commitment',
        quote: 'Submit the healthcare equity task force proposal to the CEO by Thursday 5pm.',
        note: 'By 4 June 2026 · Witness: James Chen',
      },
    ],
  },
  {
    name: 'Marcus Williams',
    role: 'Senior Law Partner, 41',
    arc: 'Identity wound: built the wrong life proving himself from poverty.',
    moments: [
      {
        stage: 'I-1 · The Honest Inventory',
        label: 'What feels threatening if removed',
        quote: 'My reputation. My status or influence. My sense of being needed.',
        note: '"I grew up with nothing. The name I have built is the only thing that separates me from what I came from."',
      },
      {
        stage: 'I-4 · Lies & True Names',
        label: 'The exact sentence he hears',
        quote: '"You are a fraud and one day everyone will see it."',
        note: 'No single voice. His father left when he was seven. The lie grew in the silence.',
      },
      {
        stage: 'P-4 · The Convergence',
        label: 'His calling in one sentence',
        quote: 'I am called to be the consistent presence for fatherless young men that I never had — and to build structures that make that presence scalable.',
        note: 'A boy told him last month he was the only man who had come back every week. He said it without drama. It destroyed him.',
      },
      {
        stage: 'P-6 · What\'s Mine to Do',
        label: 'His commitment',
        quote: 'Book and hold the meeting with the managing partner to discuss restructuring my practice.',
        note: 'By 5 June 2026 · Witness: Denise Williams',
      },
    ],
  },
]

function ExampleJourneys() {
  const [active, setActive] = useState(0)
  const persona = PERSONAS[active]

  return (
    <section className="relative z-10 dark-section py-20">
      <div className="max-w-4xl mx-auto px-8">

        <div className="mb-10">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-sand/50 mb-3">Example journeys</p>
          <h2 className="font-serif text-4xl font-medium text-ivory">What the workshop produces</h2>
          <p className="font-sans text-sm text-sand/70 mt-3 max-w-xl leading-relaxed">
            Four moments from two participants who completed the full workshop.
            Names are illustrative; the patterns are real.
          </p>
        </div>

        {/* Persona tabs */}
        <div className="flex gap-0 border-b border-sand/20 mb-10">
          {PERSONAS.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setActive(i)}
              className={[
                'px-6 py-3 font-sans text-sm transition-colors border-b-2 -mb-px',
                active === i
                  ? 'border-camel text-ivory'
                  : 'border-transparent text-sand/50 hover:text-sand/80',
              ].join(' ')}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Persona context */}
        <div className="mb-8 fade-in" key={persona.name}>
          <p className="font-sans text-xs text-sand/50 uppercase tracking-widest mb-1">{persona.role}</p>
          <p className="font-sans text-sm text-sand/70 italic">{persona.arc}</p>
        </div>

        {/* Journey moments */}
        <div className="grid md:grid-cols-2 gap-5 fade-in" key={persona.name + '-moments'}>
          {persona.moments.map((moment, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded p-5 space-y-3"
            >
              <p className="font-sans text-xs tracking-widest uppercase text-camel/80">{moment.stage}</p>
              <p className="font-sans text-xs text-sand/50">{moment.label}</p>
              <p className="font-serif text-lg text-ivory leading-snug">{moment.quote}</p>
              <p className="font-sans text-xs text-sand/50 leading-relaxed border-t border-white/10 pt-3">{moment.note}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

interface Props {
  onGetStarted: () => void
  onFacilitator: () => void
}

const IDENTITY_STAGES = [
  { id: 'I-1', name: 'The Honest Inventory',   q: 'Where do I actually derive my worth right now?' },
  { id: 'I-2', name: 'The Divine Signature',    q: 'Who does God say I am before I do anything?' },
  { id: 'I-3', name: 'The Unshakable Ground',   q: 'What does it mean that God is near by promise, not feeling?' },
  { id: 'I-4', name: 'Lies & True Names',        q: 'What false stories do I carry — and what does God say instead?' },
  { id: 'I-5', name: 'The Shaped Story',         q: 'What experiences, wounds, and graces have most formed me?' },
  { id: 'I-6', name: 'Repentance & Remaking',    q: 'What am I turning from — and who am I becoming?' },
]

const PURPOSE_STAGES = [
  { id: 'P-1', name: 'Values & Convictions',       q: 'What do I consistently choose when it costs me something?' },
  { id: 'P-2', name: "How You're Made",             q: 'What has God built into me that energises rather than depletes?' },
  { id: 'P-3', name: 'What Breaks Your Heart',      q: 'What injustice or need keeps finding me?' },
  { id: 'P-4', name: 'The Convergence',             q: 'Where do my story, gifts, and burden point together?' },
  { id: 'P-5', name: 'Community & Discernment',     q: 'How are my gifts and calling confirmed and sharpened in the body?' },
  { id: 'P-6', name: "What's Mine to Do",           q: 'What is the one obedient step I\'m being invited into?' },
  { id: 'P-7', name: 'The Trusted Voice',           q: 'Take your journey to a trusted theological voice for review and discernment.' },
]

export function LandingPage({ onGetStarted, onFacilitator }: Props) {
  return (
    <div className="min-h-svh bg-ivory overflow-x-hidden">

      {/* Grain texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }}
      />

      {/* Nav */}
      <nav className="relative z-10 max-w-4xl mx-auto px-8 pt-6 flex justify-end">
        <ThemeToggle />
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-4xl mx-auto px-8 pt-12 pb-20">
        <div className="fade-in">
          <p className="font-sans text-xs tracking-[0.25em] uppercase text-muted mb-8">
            A guided workshop in
          </p>
          <h1 className="font-serif font-medium text-charcoal leading-[0.95] mb-0"
              style={{ fontSize: 'clamp(4rem, 10vw, 7rem)' }}>
            Identity<br />
            <span className="text-burgundy">&amp; Purpose</span>
          </h1>
        </div>

        <div className="fade-in mt-10 max-w-xl" style={{ animationDelay: '0.1s' }}>
          <p className="font-sans text-lg text-charcoal leading-relaxed">
            A live small-group workshop for experienced professionals who want to
            know who they are before God — and what they are called to do.
          </p>
          <p className="font-sans text-base text-muted mt-4 leading-relaxed">
            Thirteen stages. Two arcs. Private answers. A theological review to close.
          </p>
        </div>

        <div className="fade-in mt-10 flex items-center gap-5" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={onGetStarted}
            className="bg-burgundy text-ivory font-sans text-sm tracking-widest uppercase px-8 py-4 rounded hover:bg-burgundy-light transition-colors"
          >
            Enter a room
          </button>
          <a href="#how-it-works"
            className="font-sans text-sm text-muted hover:text-charcoal transition-colors underline underline-offset-4">
            How it works
          </a>
          <button
            onClick={onFacilitator}
            className="font-sans text-sm text-muted hover:text-charcoal transition-colors underline underline-offset-4">
            Facilitator →
          </button>
        </div>
      </section>

      {/* Divider rule */}
      <div className="max-w-4xl mx-auto px-8">
        <div className="border-t border-sand" />
      </div>

      {/* How it works */}
      <section id="how-it-works" className="relative z-10 max-w-4xl mx-auto px-8 py-20">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          {[
            {
              num: '01',
              title: 'Self-paced reflection',
              body: 'Each participant works through stages at their own pace. Your answers are private — only your name and current stage are visible to your facilitator.',
            },
            {
              num: '02',
              title: 'Live facilitation',
              body: 'Facilitators see who is in the room, where each person is, and who may need a moment. No content is shared — only presence.',
            },
            {
              num: '03',
              title: 'Yours to keep',
              body: 'At the end you receive a full export of your reflections and a commitment card. Your data can be deleted at any time.',
            },
            {
              num: '04',
              title: 'A theological review',
              body: 'The final stage assembles your answers into a prompt you can bring to an AI conversation. It returns a review grounded in trusted Christian voices — not generic advice.',
            },
          ].map((item, i) => (
            <div key={item.num} className="fade-in" style={{ animationDelay: `${0.1 * i}s` }}>
              <p className="font-serif text-5xl text-sand font-medium mb-4 leading-none">{item.num}</p>
              <h3 className="font-serif text-xl text-charcoal mb-3">{item.title}</h3>
              <p className="font-sans text-sm text-muted leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stage map */}
      <section className="relative z-10 bg-parchment border-y border-sand py-20">
        <div className="max-w-4xl mx-auto px-8">
          <div className="mb-12">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted mb-3">Thirteen stages</p>
            <h2 className="font-serif text-4xl font-medium text-charcoal">The workshop journey</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">

            {/* Identity arc */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-camel flex-shrink-0" />
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted">Identity Arc</p>
              </div>
              <div className="space-y-0">
                {IDENTITY_STAGES.map((stage, i) => (
                  <div
                    key={stage.id}
                    className="fade-in flex gap-4 py-5 border-b border-sand/60 last:border-0 group"
                    style={{ animationDelay: `${0.05 * i}s` }}
                  >
                    <span className="font-serif text-xs text-sand pt-0.5 flex-shrink-0 w-6">{i + 1}</span>
                    <div>
                      <p className="font-serif text-base text-charcoal group-hover:text-burgundy transition-colors">{stage.name}</p>
                      <p className="font-sans text-xs text-muted mt-0.5 leading-relaxed italic">{stage.q}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Purpose arc */}
            <div className="mt-12 md:mt-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-burgundy flex-shrink-0" />
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted">Purpose Arc</p>
              </div>
              <div className="space-y-0">
                {PURPOSE_STAGES.map((stage, i) => (
                  <div
                    key={stage.id}
                    className="fade-in flex gap-4 py-5 border-b border-sand/60 last:border-0 group"
                    style={{ animationDelay: `${0.05 * i}s` }}
                  >
                    <span className="font-serif text-xs text-sand pt-0.5 flex-shrink-0 w-6">{i + 1}</span>
                    <div>
                      <p className="font-serif text-base text-charcoal group-hover:text-burgundy transition-colors">{stage.name}</p>
                      <p className="font-sans text-xs text-muted mt-0.5 leading-relaxed italic">{stage.q}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Trusted Voice */}
      <section className="relative z-10 max-w-4xl mx-auto px-8 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="fade-in">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted mb-4">Stage P-7</p>
            <h2 className="font-serif text-4xl font-medium text-charcoal mb-5 leading-tight">
              The Trusted<br />Voice
            </h2>
            <p className="font-sans text-sm text-muted leading-relaxed mb-5">
              The final stage assembles your answers into a structured prompt grounded in the
              Christian formation tradition. Paste it into a conversation with Claude — or any AI
              you trust — to receive a review that draws on specific voices who have walked this ground.
            </p>
            <p className="font-sans text-sm text-muted leading-relaxed">
              The AI is given the trusted sources list, the four review criteria, and your actual answers.
              It cannot reach outside the tradition, offer generic advice, or give you what you want to hear.
            </p>
          </div>

          <div className="fade-in space-y-4" style={{ animationDelay: '0.1s' }}>
            {[
              { num: '1', title: 'Calling review', body: 'Is it biblically grounded, concrete, and testable — or does it read as a personal project?' },
              { num: '2', title: 'Convergence check', body: 'Does story, gift, and burden genuinely point together, or is the tension being resolved too quickly?' },
              { num: '3', title: 'The wound and the call', body: 'The connection between the lie you named and the calling you arrived at — the most important thread.' },
              { num: '4', title: 'Reading recommendations', body: '2–3 books from the trusted sources, chosen specifically for your journey.' },
              { num: '5', title: 'One honest question', body: 'Something worth sitting with before you act — drawn from what you actually wrote.' },
              { num: '6', title: 'A short blessing', body: 'Rooted in a Scripture passage chosen for this person, not a generic send-off.' },
            ].map(item => (
              <div key={item.num} className="flex gap-4">
                <span className="font-serif text-sand text-sm flex-shrink-0 w-4 pt-0.5">{item.num}</span>
                <div>
                  <p className="font-serif text-base text-charcoal">{item.title}</p>
                  <p className="font-sans text-xs text-muted leading-relaxed mt-0.5">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-8">
        <div className="border-t border-sand" />
      </div>

      {/* Audience + privacy */}
      <section className="relative z-10 max-w-4xl mx-auto px-8 py-20">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="fade-in">
            <h2 className="font-serif text-3xl font-medium text-charcoal mb-5">
              Who this is for
            </h2>
            <ul className="space-y-3 font-sans text-sm text-muted leading-relaxed">
              {[
                'Small groups of 10–15 experienced professionals',
                'Those who want depth, not a corporate survey',
                'Leaders who have achieved much but feel the gap between role and calling',
                'Anyone willing to ask honest questions with trusted people',
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-camel flex-shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="fade-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="font-serif text-3xl font-medium text-charcoal mb-5">
              Your privacy
            </h2>
            <ul className="space-y-3 font-sans text-sm text-muted leading-relaxed">
              {[
                'Your answers are stored locally and on the server — only you can see them',
                'Facilitators see your name, current stage, and time on stage — nothing else',
                'You can delete your data at any time during the workshop',
                'Your commitment card belongs to you — generated and printed locally',
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-camel flex-shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Example journeys */}
      <ExampleJourneys />

      {/* Pull quote */}
      <section className="relative z-10 border-t border-sand">
        <div className="max-w-2xl mx-auto px-8 py-20 text-center fade-in">
          <p className="font-serif text-2xl md:text-3xl text-charcoal leading-snug font-medium">
            "God calls each person by name into being. Human personhood, rationality, dignity,
            and morality derive from being made in God's image, loved by Christ, called into communion."
          </p>
          <div className="mt-8 w-10 border-b-2 border-camel mx-auto" />
        </div>
      </section>

      {/* CTA footer */}
      <section className="relative z-10 dark-section py-20">
        <div className="max-w-4xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-3xl font-medium text-ivory mb-2">
              Ready to begin?
            </h2>
            <p className="font-sans text-sm text-sand/70">
              You will need a room code from your facilitator.
            </p>
          </div>
          <button
            onClick={onGetStarted}
            className="flex-shrink-0 bg-ivory text-charcoal font-sans text-sm tracking-widest uppercase px-8 py-4 rounded hover:bg-parchment transition-colors"
          >
            Enter a room
          </button>
        </div>
      </section>

    </div>
  )
}
