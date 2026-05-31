import { loadAnswers } from '../stores/session'

function a(stageId: string, key: string): string {
  return loadAnswers()[`${stageId}:${key}`]?.trim() ?? ''
}

function opt(stageId: string, key: string): string {
  return a(stageId, `${key}_opt`)
}

function line(label: string, value: string): string {
  return value ? `${label}: ${value}` : ''
}

function section(heading: string, lines: string[]): string {
  const filled = lines.filter(Boolean)
  if (!filled.length) return ''
  return `${heading}\n${filled.map(l => `  ${l}`).join('\n')}`
}

export function buildArtifact(): string {
  // I-1: identity sources
  const checklistRaw = a('I-1', 'checklist')
  let checklist = ''
  try { checklist = (JSON.parse(checklistRaw) as string[]).join(', ') } catch { /* empty */ }

  // I-4: the lie
  const lie = opt('I-4', 'q2') || opt('I-4', 'q1')
  const lieExample = a('I-4', 'q2') || a('I-4', 'q1')
  const trueName = opt('I-4', 'q5')
  const trueNameExample = a('I-4', 'q5')

  // I-5: shaped story
  const storyLesson = a('I-5', 'q5') || opt('I-5', 'q5')
  const wound = opt('I-5', 'q2')
  const woundExample = a('I-5', 'q2')

  // I-6: repentance
  const turning = opt('I-6', 'q1')
  const turningExample = a('I-6', 'q1')
  const obedience = a('I-6', 'q4') || opt('I-6', 'q4')

  // P-1: values
  let valuesRanking = ''
  try { valuesRanking = (JSON.parse(a('P-1', 'ranking')) as string[]).join(' → ') } catch { /* empty */ }
  const testedValue = opt('P-1', 'q3')
  const testedValueExample = a('P-1', 'q3')

  // P-2: gifts
  const gift = a('P-2', 'q1') || opt('P-2', 'q1')
  const underestimated = a('P-2', 'q3') || opt('P-2', 'q3')

  // P-3: burden
  const burden = a('P-3', 'q1') || opt('P-3', 'q1')
  const burdenCarried = a('P-3', 'q5') || a('P-3', 'q4')

  // P-4: convergence
  const callingOption = opt('P-4', 'q5')
  const callingSentence = a('P-4', 'q5')
  const convergence = a('P-4', 'q1')

  // P-5: community
  const whoConfirms = a('P-5', 'q1') || opt('P-5', 'q1')
  const named = a('P-5', 'q3')

  // P-6: commitment
  const action = a('P-6', 'commit_action')
  const date = a('P-6', 'commit_date')
  const witness = a('P-6', 'commit_witness')
  const nextStep = a('P-6', 'q1')

  const identitySection = section('IDENTITY ARC — What was surfaced', [
    checklist ? `Worth currently derived from: ${checklist}` : '',
    line('The lie named', lie),
    lieExample ? `  → In their words: "${lieExample}"` : '',
    line('True name hardest to receive', trueName),
    trueNameExample ? `  → In their words: "${trueNameExample}"` : '',
    line('Wound that still shapes instincts', wound),
    woundExample ? `  → In their words: "${woundExample}"` : '',
    line('What the story has been trying to teach', storyLesson),
    line('Turning from', turning),
    turningExample ? `  → In their words: "${turningExample}"` : '',
    line('Act of obedience that would prove this real', obedience),
  ])

  const purposeSection = section('PURPOSE ARC — What emerged', [
    valuesRanking ? `Values ranking under pressure: ${valuesRanking}` : '',
    line('Tested value (the one that has cost them)', testedValue),
    testedValueExample ? `  → In their words: "${testedValueExample}"` : '',
    line('Work that energises rather than depletes', gift),
    line('Strength they underestimate', underestimated),
    line('What keeps drawing their attention', burden),
    burdenCarried ? `  → What they carry: "${burdenCarried}"` : '',
  ])

  const convergenceSection = section('THE CONVERGENCE — Where it pointed', [
    convergence ? `Where story, gifts and burden overlap: "${convergence}"` : '',
    callingOption && callingOption !== 'Other (my own words)' && callingOption !== 'None of these fit me yet'
      ? `Selected calling direction: ${callingOption}` : '',
    callingSentence ? `Calling in their own words: "${callingSentence}"` : '',
    line('Who can confirm or challenge this', whoConfirms),
    named ? `What community has already named: "${named}"` : '',
  ])

  const commitmentSection = section('THE COMMITMENT — What they have said yes to', [
    action ? `Action: "${action}"` : '',
    line('By', date),
    line('Witness', witness),
    nextStep && nextStep !== action ? `Additional next step: "${nextStep}"` : '',
  ])

  return [identitySection, purposeSection, convergenceSection, commitmentSection]
    .filter(Boolean)
    .join('\n\n')
}

export function buildPrompt(artifact: string): string {
  return `You are a trusted spiritual director and theologian with deep familiarity with the Christian formation tradition. An experienced professional has just completed a structured Identity & Purpose workshop. Your task is to review their journey with pastoral honesty and theological rigour.

---

TRUSTED SOURCES FRAMEWORK

Use these voices as your theological and pastoral framework. Do not recommend sources outside this list.

Priority voices for this workshop:
- Ruth Haley Barton — discernment, spiritual direction, calling
- Os Guinness — calling, vocation, obedience
- Michael Reeves — identity in Christ, adoption, delight in God
- Henri Nouwen — belovedness, woundedness, grace
- Leanne Payne — lies, healing, false identities, true naming
- Dan Allender — story, wounds, formation, vocation through pain
- Eugene Peterson — pastoral honesty, spiritual language, non-performative faith
- Dallas Willard — formation, presence, transformation of character

Supporting voices:
- J.I. Packer — adoption, assurance, knowing God
- Thom Gardner — Christian healing, identity, inner restoration
- N.T. Wright — identity, resurrection, vocation within God's story
- C.S. Lewis — desire, identity, moral and spiritual clarity
- Tim Keller — idols, identity, grace, calling in modern life
- Roy Godwin — presence, prayer, dependence on God
- D.A. Carson — theological clarity, endurance, biblical grounding
- Brother Lawrence — nearness of God in ordinary faithfulness

Core conviction guiding this work: God calls each person by name into being. Human personhood, rationality, dignity, and morality derive from being made in God's image, loved by Christ, called into communion.

---

REVIEW FRAMEWORK

Apply all four lenses to the participant's answers:

1. Biblical Fidelity — Is this anchored in Scripture and clear theological claims? Does it avoid vague spirituality or content that drifts from the gospel?
2. Clarity and Coherence — Is the language concrete and functionally honest? Is there overstatement or abstraction that needs grounding?
3. Pastoral Sensitivity — Is the calling proportionate and wise? Does it rush, shame, or overexpose anything that needs more time?
4. Discernment and Fruit — Does this lead to tested action and observable change? Or does it feel moving without producing concrete fruit?

Tone: pastoral, hope-filled, intelligent, and rooted in Scripture. Avoid vague mystical language, generic self-help framing, and weak platitudes. Translate theological concepts into clear, reasoned expressions. Do not condemn — but do not flatter either.

---

THE PARTICIPANT'S WORKSHOP ARTIFACT

${artifact || '[No answers have been saved yet. Ask the participant to complete the workshop stages before generating this prompt.]'}

---

WHAT TO PROVIDE

1. CALLING REVIEW
Review the calling statement. Is it biblically grounded and concrete enough to test? Does it avoid grandiosity? Does it leave room for God to act, or does it read as a personal project? Where is the gospel in it?

2. CONVERGENCE CHECK
Does the story (what formed them), the gift (what energises them), and the burden (what breaks their heart) genuinely point to the same place — or is there tension the participant may be resolving too quickly? Name what holds and what may still need testing.

3. THE WOUND AND THE CALL
Is there a connection between the lie they named and the calling they arrived at? This is often the most important thread in the whole workshop. Name it clearly — either the wound points toward the calling, or there is a gap worth exploring.

4. READING RECOMMENDATIONS
Recommend exactly 2–3 specific books or authors from the trusted sources list that speak most directly to this particular journey. For each, write one sentence explaining why it is relevant to what this person has written — not a generic description of the author.

5. ONE QUESTION TO SIT WITH
Offer one honest question drawn from what the participant has written — something the workshop may not have fully surfaced. Not a challenge to the calling, but a question worth carrying for a season before acting. Make it specific to their answers, not generic.

6. A SHORT BLESSING
Close with one short prayer or blessing rooted in a specific Scripture passage that is genuinely relevant to this person's journey. Do not use generic phrases. Choose the passage because of what they wrote, not because it is commonly used.`
}
