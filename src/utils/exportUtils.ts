import { ResumeData } from '../types/resume'

export const generatePlainText = (data: ResumeData): string => {
  const lines: string[] = []

  // Name
  if (data.personalInfo.name) {
    lines.push(data.personalInfo.name.toUpperCase())
    lines.push('')
  }

  // Contact
  const contact: string[] = []
  if (data.personalInfo.email) contact.push(data.personalInfo.email)
  if (data.personalInfo.phone) contact.push(data.personalInfo.phone)
  if (data.personalInfo.location) contact.push(data.personalInfo.location)
  if (contact.length > 0) {
    lines.push(contact.join(' | '))
    lines.push('')
  }

  // Links
  const links: string[] = []
  if (data.github) links.push(data.github)
  if (data.linkedin) links.push(data.linkedin)
  if (links.length > 0) {
    lines.push(links.join(' | '))
    lines.push('')
  }

  // Summary
  if (data.summary) {
    lines.push('SUMMARY')
    lines.push('─'.repeat(50))
    lines.push(data.summary)
    lines.push('')
  }

  // Experience
  if (data.experience.length > 0 && data.experience.some(exp => exp.company || exp.position)) {
    lines.push('EXPERIENCE')
    lines.push('─'.repeat(50))
    data.experience.forEach(exp => {
      if (exp.position || exp.company) {
        if (exp.position) lines.push(exp.position)
        if (exp.company) lines.push(exp.company)
        if (exp.startDate || exp.endDate) {
          lines.push(`${exp.startDate || 'Start'} - ${exp.endDate || 'End'}`)
        }
        if (exp.description) lines.push(exp.description)
        lines.push('')
      }
    })
  }

  // Projects
  if (data.projects.length > 0 && data.projects.some(proj => proj.name)) {
    lines.push('PROJECTS')
    lines.push('─'.repeat(50))
    data.projects.forEach(proj => {
      if (proj.name) {
        lines.push(proj.name)
        if (proj.description) lines.push(proj.description)
        if (proj.technologies) lines.push(`Technologies: ${proj.technologies}`)
        lines.push('')
      }
    })
  }

  // Education
  if (data.education.length > 0 && data.education.some(edu => edu.school || edu.degree)) {
    lines.push('EDUCATION')
    lines.push('─'.repeat(50))
    data.education.forEach(edu => {
      if (edu.school || edu.degree) {
        if (edu.school) lines.push(edu.school)
        if (edu.degree) {
          const degreeText = edu.field ? `${edu.degree} in ${edu.field}` : edu.degree
          lines.push(degreeText)
        }
        if (edu.startDate || edu.endDate) {
          lines.push(`${edu.startDate || 'Start'} - ${edu.endDate || 'End'}`)
        }
        lines.push('')
      }
    })
  }

  // Skills
  if (data.skills) {
    lines.push('SKILLS')
    lines.push('─'.repeat(50))
    lines.push(data.skills)
    lines.push('')
  }

  return lines.join('\n').trim()
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy:', err)
    return false
  }
}

export const validateResumeForExport = (data: ResumeData): { isValid: boolean; warning: string } => {
  const hasName = !!data.personalInfo.name
  const hasProjectOrExperience = data.projects.length > 0 || data.experience.length > 0

  if (!hasName || !hasProjectOrExperience) {
    return {
      isValid: false,
      warning: 'Your resume may look incomplete.'
    }
  }

  return { isValid: true, warning: '' }
}
