import { StepArtifact, ProofData } from '../types'

const STORAGE_KEY = 'rb_artifacts'
const PROOF_KEY = 'rb_proof_data'

export const artifactStore = {
  getArtifacts(): StepArtifact[] {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      const initial = Array.from({ length: 8 }, (_, i) => ({
        stepNumber: i + 1,
        uploaded: false
      }))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial))
      return initial
    }
    return JSON.parse(stored)
  },

  uploadArtifact(stepNumber: number, fileName: string): void {
    const artifacts = this.getArtifacts()
    const artifact = artifacts.find(a => a.stepNumber === stepNumber)
    if (artifact) {
      artifact.uploaded = true
      artifact.fileName = fileName
      artifact.uploadedAt = new Date().toISOString()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(artifacts))
    }
  },

  isStepCompleted(stepNumber: number): boolean {
    const artifacts = this.getArtifacts()
    const artifact = artifacts.find(a => a.stepNumber === stepNumber)
    return artifact?.uploaded || false
  },

  canAccessStep(stepNumber: number): boolean {
    if (stepNumber === 1) return true
    const artifacts = this.getArtifacts()
    const previousArtifact = artifacts.find(a => a.stepNumber === stepNumber - 1)
    return previousArtifact?.uploaded || false
  },

  getProofData(): ProofData {
    const stored = localStorage.getItem(PROOF_KEY)
    return stored ? JSON.parse(stored) : { lovableLink: '', githubLink: '', deployLink: '' }
  },

  saveProofData(data: ProofData): void {
    localStorage.setItem(PROOF_KEY, JSON.stringify(data))
  }
}
