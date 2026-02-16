import { ResumeData } from '../types/resume'

export interface ATSScore {
  score: number
  suggestions: string[]
}

const countWords = (text: string): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

const hasNumbers = (text: string): boolean => {
  return /\d+[%kKmM]?|\d+\.\d+/.test(text)
}

const countSkills = (skills: string): number => {
  return skills.split(',').filter(s => s.trim().length > 0).length
}

export const calculateATSScore = (data: ResumeData): ATSScore => {
  let score = 0
  const suggestions: string[] = []

  // Summary: 40-120 words (+15)
  const summaryWords = countWords(data.summary)
  if (summaryWords >= 40 && summaryWords <= 120) {
    score += 15
  } else if (summaryWords < 40) {
    suggestions.push('Write a stronger summary (40–120 words).')
  } else if (summaryWords > 120) {
    suggestions.push('Shorten your summary to 40–120 words.')
  }

  // Projects: at least 2 (+10)
  if (data.projects.length >= 2) {
    score += 10
  } else {
    suggestions.push('Add at least 2 projects.')
  }

  // Experience: at least 1 (+10)
  if (data.experience.length >= 1) {
    score += 10
  } else {
    suggestions.push('Add at least 1 work experience entry.')
  }

  // Skills: at least 8 (+10)
  const skillCount = countSkills(data.skills)
  if (skillCount >= 8) {
    score += 10
  } else {
    suggestions.push('Add more skills (target 8+).')
  }

  // Links: GitHub or LinkedIn (+10)
  if (data.github || data.linkedin) {
    score += 10
  } else {
    suggestions.push('Add your GitHub or LinkedIn profile.')
  }

  // Numbers in experience/projects (+15)
  let hasNumbersInContent = false
  for (const exp of data.experience) {
    if (hasNumbers(exp.description)) {
      hasNumbersInContent = true
      break
    }
  }
  if (!hasNumbersInContent) {
    for (const proj of data.projects) {
      if (hasNumbers(proj.description)) {
        hasNumbersInContent = true
        break
      }
    }
  }
  if (hasNumbersInContent) {
    score += 15
  } else {
    suggestions.push('Add measurable impact (numbers) in bullets.')
  }

  // Education: complete fields (+10)
  let hasCompleteEducation = false
  if (data.education.length > 0) {
    hasCompleteEducation = data.education.some(edu => 
      edu.school && edu.degree && edu.field && edu.startDate && edu.endDate
    )
  }
  if (hasCompleteEducation) {
    score += 10
  } else if (data.education.length > 0) {
    suggestions.push('Complete all education fields.')
  } else {
    suggestions.push('Add your education background.')
  }

  // Cap at 100
  score = Math.min(score, 100)

  // Return top 3 suggestions
  return {
    score,
    suggestions: suggestions.slice(0, 3)
  }
}
