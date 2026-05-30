# Persona Test Rubric For Claude

Use this rubric when building or revising the workshop app. Test the stage implementation against the three personas in `tests/personas.ts`.

## Goal

Confirm that each stage is:
- easy enough to enter
- deep enough to surface truth
- specific enough to fit the personas without overfitting to them
- structured enough to produce meaningful outputs in the app

## Test personas

- Sarah Chen
- Marcus Williams
- Priya Sharma

Read their source answers in `tests/personas.ts` before evaluating stage behaviour.

## What to test in each stage

### 1. Exercise tab entry
Check:
- Can the persona complete the exercise without needing expert vocabulary?
- Does the visual example make the task immediately understandable?
- Does the exercise avoid interpretive questions until after completion?

Pass if:
- The persona can act first and reflect second.

### 2. Questions tab recognition
Check:
- Do the multiple-choice options give the persona a recognizable first foothold?
- Is there always a plausible closest-fit answer?
- Are `None of these fit me yet` and `Other (my own words)` present where needed?

Pass if:
- The persona can recognize themselves without being forced into bad language.

### 3. Questions tab depth
Check:
- Does the required short example move the answer beyond checkbox recognition?
- Would the persona's likely example expose something real rather than generic?
- Do follow-up probes still support deeper facilitator work?

Pass if:
- The stage produces both recognition and evidence.

### 4. Theological and pastoral fit
Check:
- Does the stage remain biblically grounded?
- Does it avoid vague mysticism and generic self-help?
- Does it remain pastorally proportionate to the vulnerability requested?

Pass if:
- The stage fits `trusted_sources.md` and `review_expert_panel.md`.

### 5. Outcome quality
Check:
- Would the persona likely reach the same or better conclusion than in the narrative test file?
- Is the path easier, clearer, and less dependent on advanced self-language?
- Does the stage make it harder to hide behind abstraction?

Pass if:
- The updated structure improves access without flattening truth.

## Failure signs

A stage is failing if:
- the persona cannot find a recognizable option
- the options are so generic they flatten the wound or calling
- the stage can be completed with shallow or polished answers only
- the exercise and questions are mixed in a way that interrupts surfacing
- the stage drifts into self-improvement, self-branding, or vague spirituality

## Suggested Claude test prompt

Run the current stage implementation against the three personas in `tests/personas.ts`.

For each persona, assess:
- whether the exercise tab is easy to enter
- whether the question options provide recognizable language
- whether the short example step still surfaces something specific
- whether the likely conclusion is clearer, weaker, or unchanged compared with the persona source answers

Then report:
1. pass/fail per stage
2. wording gaps
3. any option sets that are too generic or too narrow
4. any places where the stage becomes easier but less truthful
