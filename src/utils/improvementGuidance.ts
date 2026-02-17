import { ResumeData } from '../types/resume'
import { hasNumbers } from './bulletGuidance'

const countWords = (text: string): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

const countSkills = (skills: string): number => {
  return skills.split(',').filter(s => s.trim().length > 0).length
}

export const getTopImprovements = (data: ResumeData): string[] => {
  const improvements: string[] = []

  // Check projects
  if (data.projects.length < 2) {
    improvements.push('Add at least 2 projects to showcase your work.')
  }

  // Check for numbers in content
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
  if (!hasNumbersInContent) {
    improvements.push('Add measurable impact with numbers (%, X, k) in your bullets.')
  }

  // Check summary
  const summaryWords = countWords(data.summary)
  if (summaryWords < 40) {
    improvements.push('Expand your summary to 40-120 words for better impact.')
  }

  // Check skills
  const skillCount = countSkills(data.skills)
  if (skillCount < 8) {
    improvements.push('Add more skills to reach at least 8 (currently ' + skillCount + ').')
  }

  // Check experience
  if (data.experience.length === 0) {
    improvements.push('Add work experience, internships, or relevant project work.')
  }

  // Check education
  if (data.education.length === 0) {
    improvements.push('Add your education background.')
  }

  // Return top 3
  return improvements.slice(0, 3)
}
