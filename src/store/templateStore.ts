import { ResumeTemplate } from '../types'

const TEMPLATE_KEY = 'resumeTemplate'

export const templateStore = {
  getTemplate(): ResumeTemplate {
    const stored = localStorage.getItem(TEMPLATE_KEY)
    return (stored as ResumeTemplate) || 'classic'
  },

  saveTemplate(template: ResumeTemplate): void {
    localStorage.setItem(TEMPLATE_KEY, template)
  }
}
