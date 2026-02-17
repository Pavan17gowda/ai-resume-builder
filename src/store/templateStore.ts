import { ResumeTemplate, ColorTheme } from '../types'

const TEMPLATE_KEY = 'resumeTemplate'
const COLOR_KEY = 'resumeColorTheme'

export const templateStore = {
  getTemplate(): ResumeTemplate {
    const stored = localStorage.getItem(TEMPLATE_KEY)
    return (stored as ResumeTemplate) || 'classic'
  },

  saveTemplate(template: ResumeTemplate): void {
    localStorage.setItem(TEMPLATE_KEY, template)
  },

  getColorTheme(): ColorTheme {
    const stored = localStorage.getItem(COLOR_KEY)
    return (stored as ColorTheme) || 'teal'
  },

  saveColorTheme(color: ColorTheme): void {
    localStorage.setItem(COLOR_KEY, color)
  }
}
