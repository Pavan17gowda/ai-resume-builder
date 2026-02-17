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

export type ResumeTemplate = 'classic' | 'modern' | 'minimal'
