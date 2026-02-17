export interface StepArtifact {
  stepNumber: number
  uploaded: boolean
  fileName?: string
  uploadedAt?: string
}

export interface ProofData {
  lovableLink: string
  githubLink: string
  deployLink: string
}

export interface FinalSubmission {
  lovableLink: string
  githubLink: string
  deployLink: string
  testChecklistPassed: boolean
  submittedAt?: string
}

export type ResumeTemplate = 'classic' | 'modern' | 'minimal'

export type ColorTheme = 'teal' | 'navy' | 'burgundy' | 'forest' | 'charcoal'

export const COLOR_THEMES: Record<ColorTheme, string> = {
  teal: 'hsl(168, 60%, 40%)',
  navy: 'hsl(220, 60%, 35%)',
  burgundy: 'hsl(345, 60%, 35%)',
  forest: 'hsl(150, 50%, 30%)',
  charcoal: 'hsl(0, 0%, 25%)'
}
