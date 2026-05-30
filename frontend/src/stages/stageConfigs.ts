export interface QuestionConfig {
  key: string
  label: string
  options: string[]
}

export interface ExerciseConfig {
  instructions: string[]
  visual?: string
}

export interface StageConfig {
  stageId: string
  arc: 'Identity' | 'Purpose'
  stageNum: string
  title: string
  invitation: string
  exercise?: {
    title: string
    description: string
    config: ExerciseConfig
  }
  questions: QuestionConfig[]
}

const ALWAYS = ['None of these fit me yet', 'Other (my own words)']

export const STAGE_CONFIGS: Record<string, StageConfig> = {
  'I-2': {
    stageId: 'I-2',
    arc: 'Identity',
    stageNum: 'Stage 2',
    title: 'The Divine Signature',
    invitation: 'Who does God say I am before I do anything?',
    exercise: {
      title: "God's Banquet",
      description: "Imagine being invited to God's banquet. Place yourself in the scene. Keep it simple: a mark, a word, or a quick sketch is enough.",
      config: {
        instructions: [
          'Place yourself in the banquet scene with a mark, word, or brief description.',
          'Note your position — near the host, at the edge, near the door, somewhere else.',
          'Continue when your position is clearly shown.',
        ],
        visual: 'Host table: [ H ] [ H ] [ H ]\nMain tables: [ ] [ ] [?] [ ] [ ]\nDoor: [ ]',
      },
    },
    questions: [
      {
        key: 'q1', label: 'When you hear the words "beloved," "chosen," or "adopted," what in you resists them?',
        options: ['I feel unworthy', 'I fear presumption', 'I distrust emotional language', 'I expect disappointment', 'I feel numb to those words', ...ALWAYS],
      },
      {
        key: 'q2', label: 'What do you still act as if you have to prove?',
        options: ['Competence', 'Moral strength', 'Spiritual consistency', 'Usefulness', 'Independence', 'Lovability', ...ALWAYS],
      },
      {
        key: 'q3', label: 'Where do you live as though acceptance is conditional?',
        options: ['When I fail', 'When I am unproductive', 'When I disappoint someone', 'When I feel spiritually dry', 'When I am not needed', 'In most areas of life', ...ALWAYS],
      },
      {
        key: 'q4', label: 'Which identity statement from faith is hardest for you to trust personally?',
        options: ['I am beloved', 'I am forgiven', 'I am adopted', 'I am chosen', 'I am secure in Christ', 'I am called for good works', ...ALWAYS],
      },
      {
        key: 'q5', label: 'What changes in your day when you remember you are already known?',
        options: ['I become less anxious', 'I become less performative', 'I become more honest', 'I become gentler with others', 'I become more prayerful', 'I do not notice much change yet', ...ALWAYS],
      },
    ],
  },

  'I-3': {
    stageId: 'I-3',
    arc: 'Identity',
    stageNum: 'Stage 3',
    title: 'The Unshakable Ground',
    invitation: 'What does it mean that God is near by promise, not feeling?',
    exercise: {
      title: 'Draw Your Image of God',
      description: 'Draw your relationship with God as simply as you can — shapes, stick figures, distance, or light are enough. The goal is to surface how God is experienced in your imagination and body, not artistic skill.',
      config: {
        instructions: [
          'Draw your image of God with the smallest sketch that feels honest.',
          'Show distance and placement — near, far, above, behind, inside, or outside.',
          'Continue once the sketch includes both you and God.',
        ],
        visual: ' [Light]\n\n        (you)',
      },
    },
    questions: [
      {
        key: 'q1', label: 'What do you do when you cannot feel God near?',
        options: ['I try harder spiritually', 'I withdraw', 'I distract myself', 'I keep simple faithful practices', 'I question everything', 'I seek someone to pray with', ...ALWAYS],
      },
      {
        key: 'q2', label: 'How quickly do you interpret silence as absence?',
        options: ['Almost immediately', 'After a few days', 'After a sustained difficult season', 'I usually do not interpret silence as absence', 'It depends on what else is happening in life', ...ALWAYS],
      },
      {
        key: 'q3', label: 'What practices actually steady you when your emotions are unsettled?',
        options: ['Scripture meditation', 'Set-time prayer', 'Worship', 'Silence and stillness', 'Honest conversation with trusted believers', 'Journaling', ...ALWAYS],
      },
      {
        key: 'q4', label: 'Where do you confuse spiritual maturity with spiritual intensity?',
        options: ['I equate strong feelings with strong faith', 'I chase spiritual highs', 'I feel like dryness means failure', 'I compare my experiences with others', 'I value visible fervour over quiet faithfulness', ...ALWAYS],
      },
      {
        key: 'q5', label: 'What promise do you most need to stand on without proof today?',
        options: ['God will never leave or forsake me', "God's grace is sufficient for me", 'God is near to the brokenhearted', 'God works all things for good', 'God gives wisdom to those who ask', 'I am held by Christ, not by my feelings', ...ALWAYS],
      },
    ],
  },

  'I-4': {
    stageId: 'I-4',
    arc: 'Identity',
    stageNum: 'Stage 4',
    title: 'Lies & True Names',
    invitation: 'What false stories do I carry — and what does God say instead?',
    questions: [
      {
        key: 'q1', label: 'What do you most often accuse yourself of being?',
        options: ['Not enough', 'Too much', 'A failure', 'Unreliable', 'Unlovable', 'Replaceable', ...ALWAYS],
      },
      {
        key: 'q2', label: 'What lie do you return to when you are tired, rejected, or ashamed?',
        options: ['I am on my own', 'I have to earn love', 'If I fail, I am nothing', 'I cannot change', 'I must stay in control', 'I do not belong', ...ALWAYS],
      },
      {
        key: 'q3', label: 'Whose voice taught you that lie?',
        options: ['Family environment', 'Church culture', 'Peer group', 'Authority figure', 'Repeated experiences, not one person', 'My own inner narrative over time', ...ALWAYS],
      },
      {
        key: 'q4', label: 'What do you do because that lie feels true?',
        options: ['Overwork', 'People-please', 'Withdraw', 'Defend myself', 'Hide struggle', 'Control outcomes', ...ALWAYS],
      },
      {
        key: 'q5', label: 'What true name are you least able to receive?',
        options: ['Beloved', 'Forgiven', 'Adopted', 'Chosen', 'Seen', 'Secure', ...ALWAYS],
      },
    ],
  },

  'I-5': {
    stageId: 'I-5',
    arc: 'Identity',
    stageNum: 'Stage 5',
    title: 'The Shaped Story',
    invitation: 'What experiences, wounds, and graces have most formed me?',
    exercise: {
      title: 'Draw Your Story as a Landscape',
      description: 'Draw your story as a landscape — mountains, valleys, rivers, deserts, roads, walls, shelters. The aim is to surface terrain, movement, and repeated patterns without forcing polished explanation.',
      config: {
        instructions: [
          'Sketch your story as a simple landscape.',
          'Include at least three terrain features — mountain, valley, river, road, wall, shelter.',
          'Continue once the map has enough detail to be read.',
        ],
        visual: 'Mountain ---- Valley ---- River ---- Shelter\n\n     Wall -------- Road',
      },
    },
    questions: [
      {
        key: 'q1', label: 'What events most changed how you see yourself or God?',
        options: ['Loss or grief', 'Major failure', 'Unexpected success', 'Relational betrayal', 'Spiritual renewal', 'Long season of waiting', ...ALWAYS],
      },
      {
        key: 'q2', label: 'Where have you been wounded in ways that still shape your instincts?',
        options: ['Rejection', 'Abandonment or absence', 'Shame', 'Neglect', 'Control or manipulation', 'Spiritual disappointment', 'Chronic misunderstanding', ...ALWAYS],
      },
      {
        key: 'q3', label: 'Which graces have you minimised but keep reappearing in your life?',
        options: ['Faithful people', 'One person who kept showing up', 'Unexpected provision', 'Repeated second chances', 'Quiet resilience', 'New clarity after confusion', 'Capacity to continue after pain', ...ALWAYS],
      },
      {
        key: 'q4', label: 'What part of your story do you avoid telling because it feels too exposed?',
        options: ['A failure', 'A wound', 'A hidden struggle', 'A family history piece', 'A season of doubt', 'A relational breakdown', ...ALWAYS],
      },
      {
        key: 'q5', label: 'What would someone who loves you say your life has been trying to teach you?',
        options: ['Slow down and receive', 'Trust God more than control', 'Tell the truth sooner', 'Let others help you', 'Stay faithful in small obedience', 'Stop measuring your worth by output', ...ALWAYS],
      },
    ],
  },

  'I-6': {
    stageId: 'I-6',
    arc: 'Identity',
    stageNum: 'Stage 6',
    title: 'Repentance & Remaking',
    invitation: 'What am I turning from — and who am I becoming?',
    questions: [
      {
        key: 'q1', label: 'What are you being asked to turn away from now?',
        options: ['People-pleasing', 'Control', 'Avoidance', 'Cynicism', 'Hidden compromise', 'Self-reliance', ...ALWAYS],
      },
      {
        key: 'q2', label: 'What pattern no longer serves the person you are becoming?',
        options: ['Perfectionism', 'Defensiveness', 'Emotional withdrawal', 'Overcommitment', 'Comparison', 'Procrastination', ...ALWAYS],
      },
      {
        key: 'q3', label: 'What do you need to name honestly before you can change?',
        options: ['Fear', 'Pride', 'Resentment', 'Shame', 'Exhaustion', 'Unbelief', ...ALWAYS],
      },
      {
        key: 'q4', label: 'What small act of obedience would prove this is real?',
        options: ['Confess to someone trusted', 'Apologise specifically', 'Set a clear boundary', 'Change one daily habit', 'Make one overdue conversation happen', 'Ask for prayer and accountability', ...ALWAYS],
      },
      {
        key: 'q5', label: 'What would repentance look like in your calendar, habits, or relationships?',
        options: ['A weekly schedule change', 'A repeated prayer rhythm', 'A clear relationship repair step', 'A consistent accountability check-in', 'A commitment to rest and limits', 'A practical stop-doing list', ...ALWAYS],
      },
    ],
  },

  'P-2': {
    stageId: 'P-2',
    arc: 'Purpose',
    stageNum: 'Stage 2',
    title: "How You're Made",
    invitation: 'What has God built into me that energises rather than depletes?',
    exercise: {
      title: 'Find Your Sweet Spot',
      description: 'Draw three circles — talent (what comes easily), skills (what you have built), and passion (what draws your energy). Name the overlap that feels most alive and most trustworthy.',
      config: {
        instructions: [
          'Draw three circles: talent, skills, and passion.',
          'Fill each circle with short phrases.',
          'Name at least one phrase in the overlap and continue.',
        ],
        visual: 'Talent: teaching, listening\nSkills: facilitation, writing\nPassion: spiritual formation, mentoring\nOverlap: guiding reflective conversations',
      },
    },
    questions: [
      {
        key: 'q1', label: 'What kinds of work leave you more alive than when you started?',
        options: ['Teaching or explaining', 'Listening or pastoral care', 'Building or creating', 'Organising or improving systems', 'Leading or convening people', 'Solving complex problems', ...ALWAYS],
      },
      {
        key: 'q2', label: 'What do other people ask you to help with most often?',
        options: ['Discernment and counsel', 'Clarity and communication', 'Strategy and planning', 'Practical support', 'Conflict navigation', 'Creative direction', ...ALWAYS],
      },
      {
        key: 'q3', label: 'What comes naturally enough that you underestimate it?',
        options: ['Noticing patterns', 'Asking good questions', 'Creating trust', 'Encouraging people', 'Structuring complexity', 'Staying calm under pressure', ...ALWAYS],
      },
      {
        key: 'q4', label: 'When do you lose track of time in a good way?',
        options: ['Deep conversation', 'Writing or teaching prep', 'Making or designing', 'Problem-solving sessions', 'Prayer and reflection', 'Building something practical', ...ALWAYS],
      },
      {
        key: 'q5', label: 'What have you done for years that still feels life-giving?',
        options: ['Mentoring', 'Serving behind the scenes', 'Teaching', 'Leading teams or groups', 'Creative expression', 'Building relationships across differences', ...ALWAYS],
      },
    ],
  },

  'P-3': {
    stageId: 'P-3',
    arc: 'Purpose',
    stageNum: 'Stage 3',
    title: 'What Breaks Your Heart',
    invitation: 'What injustice or need keeps finding me?',
    questions: [
      {
        key: 'q1', label: 'What kind of pain or injustice keeps drawing your attention?',
        options: ['Loneliness and disconnection', 'High-performing people quietly losing themselves', 'Young men growing up without steady guidance', 'Unequal access shaped by postcode, class, or system design', 'Family breakdown', 'Poverty or material vulnerability', 'Spiritual confusion', 'Church hurt', 'Injustice in systems or institutions', ...ALWAYS],
      },
      {
        key: 'q2', label: 'What do you feel compelled to act on, even when it is inconvenient?',
        options: ['Listening deeply to people in pain', 'Practical help', 'Advocacy or speaking up', 'Prayer and spiritual support', 'Mentoring or discipling', 'Creating safer spaces for others', ...ALWAYS],
      },
      {
        key: 'q3', label: 'What problem do you keep noticing that other people seem to miss?',
        options: ['Hidden burnout', 'Quiet despair', 'Relational fragmentation', 'Spiritual performative culture', 'Lack of practical follow-through', 'Exclusion of vulnerable people', ...ALWAYS],
      },
      {
        key: 'q4', label: 'What do you grieve that others may have normalised?',
        options: ['Contempt in public speech', 'Emotional numbness', 'Treating people as output', 'Cynicism as wisdom', 'Spiritual shallowness', 'Isolation as normal life', ...ALWAYS],
      },
      {
        key: 'q5', label: 'What part of the world leaves you unable to stay detached?',
        options: ['Young adults and students', 'Women carrying leadership and disappearing inside it', 'Boys and men without stable presence or guidance', 'People affected by structural inequity in care or opportunity', 'Families and parenting pressures', 'People in transition or crisis', 'Church communities in conflict', 'Workplaces under strain', 'People with little support network', ...ALWAYS],
      },
    ],
  },

  'P-5': {
    stageId: 'P-5',
    arc: 'Purpose',
    stageNum: 'Stage 5',
    title: 'Community & Discernment',
    invitation: 'How are my gifts and calling confirmed and sharpened in the body?',
    questions: [
      {
        key: 'q1', label: 'Who knows you well enough to confirm or challenge what you think you are seeing?',
        options: ['Spouse or close family member', 'Close friend', 'Spiritual mentor or pastor', 'Trusted colleague or team leader', 'Small group or community leaders', 'I do not currently have this person', ...ALWAYS],
      },
      {
        key: 'q2', label: 'What feedback do you tend to trust or dismiss?',
        options: ['I trust encouragement but dismiss correction', 'I trust correction but dismiss encouragement', 'I trust experts but not peers', 'I trust peers but avoid authority feedback', 'I trust feedback only when it confirms my view', 'I struggle to trust feedback at all', ...ALWAYS],
      },
      {
        key: 'q3', label: 'Where have others named strengths you overlooked in yourself?',
        options: ['Discernment', 'Leadership', 'Teaching', 'Mercy and care', 'Creating honest, safe space for others', 'Showing up consistently for overlooked people', 'Clarity in complexity', 'Perseverance under pressure', ...ALWAYS],
      },
      {
        key: 'q4', label: 'What do you need from community to discern faithfully?',
        options: ['Honest correction', 'Regular prayer', 'Accountability', 'Opportunities to test and learn', 'Wise boundaries and limits', 'Encouragement to continue', ...ALWAYS],
      },
      {
        key: 'q5', label: 'What kind of people sharpen your judgement rather than distort it?',
        options: ['Truthful and kind', 'Spiritually mature and grounded', 'Experienced in similar calling', 'Unimpressed by performance', 'Courageous enough to disagree', 'Patient and steady over time', ...ALWAYS],
      },
    ],
  },
}
