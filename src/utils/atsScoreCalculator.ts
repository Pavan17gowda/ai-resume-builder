import { ResumeData } from '../types/resume'

export interface ATSScoreResult {
  score: number
  level: 'needs-work' | 'getting-there' | 'strong'
  label: string
  suggestions: string[]
}

const ACTION_VERBS = [
  'built', 'led', 'designed', 'improved', 'created', 'developed',
  'managed', 'implemented', 'launched', 'achieved', 'increased',
  'reduced', 'optimized', 'established', 'coordinated', 'delivered'
]

const hasActionVerbs = (text: string): boolean => {
  const lowerText = text.toLowerCase()
  return ACTION_VERBS.some(verb => lowerText.includes(verb))
}

export const calculateATSScore = (data: ResumeData): ATSScoreResult => {
  let score = 0
  const suggestions: string[] = []

  // Name (+10)
  if (data.personalInfo.name) {
    score += 10
  } else {
    suggestions.push('Add your name (+10 points)')
  }

  // Email (+10)
  if (data.personalInfo.email) {
    score += 10
  } else {
    suggestions.push('Add your email address (+10 points)')
  }

  // Summary > 50 chars (+10)
  if (data.summary && data.summary.length > 50) {
    score += 10
  } else {
    suggestions.push('Add a professional summary with at least 50 characters (+10 points)')
  }

  // Experience with bullets (+15)
  if (data.experience.length > 0 && data.experience.some(exp => exp.description)) {
    score += 15
  } else {
    suggestions.push('Add at least 1 work experience with description (+15 points)')
  }

  // Education (+10)
  if (data.education.length > 0) {
    score += 10
  } else {
    suggestions.push('Add your education background (+10 points)')
  }

  // Skills count (+10)
  const totalSkills = 
    data.skillCategories.technical.length +
    data.skillCategories.soft.length +
    data.skillCategories.tools.length

  if (totalSkills >= 5) {
    score += 10
  } else {
    suggestions.push(`Add at least 5 skills (currently ${totalSkills}) (+10 points)`)
  }

  // Projects (+10)
  if (data.projects.length > 0) {
    score += 10
  } else {
    suggestions.push('Add at least 1 project (+10 points)')
  }

  // Phone (+5)
  if (data.personalInfo.phone) {
    score += 5
  } else {
    suggestions.push('Add your phone number (+5 points)')
  }

  // LinkedIn (+5)
  if (data.linkedin) {
    score += 5
  } else {
    suggestions.push('Add your LinkedIn profile (+5 points)')
  }

  // GitHub (+5)
  if (data.github) {
    score += 5
  } else {
    suggestions.push('Add your GitHub profile (+5 points)')
  }

  // Action verbs in summary (+10)
  if (data.summary && hasActionVerbs(data.summary)) {
    score += 10
  } else if (data.summary) {
    suggestions.push('Use action verbs in your summary (built, led, designed, etc.) (+10 points)')
  }

  // Determine level
  let level: 'needs-work' | 'getting-there' | 'strong'
  let label: string

  if (score <= 40) {
    level = 'needs-work'
    label = 'Needs Work'
  } else if (score <= 70) {
    level = 'getting-there'
    label = 'Getting There'
  } else {
    level = 'strong'
    label = 'Strong Resume'
  }

  return {
    score,
    level,
    label,
    suggestions: suggestions.slice(0, 5) // Top 5 suggestions
  }
}
