import { StepArtifact, ProofData, FinalSubmission } from '../types'

const STORAGE_KEY = 'rb_artifacts'
const PROOF_KEY = 'rb_proof_data'
const FINAL_SUBMISSION_KEY = 'rb_final_submission'
const TEST_CHECKLIST_KEY = 'rb_test_checklist_passed'

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
  },

  getFinalSubmission(): FinalSubmission | null {
    const stored = localStorage.getItem(FINAL_SUBMISSION_KEY)
    return stored ? JSON.parse(stored) : null
  },

  saveFinalSubmission(data: FinalSubmission): void {
    localStorage.setItem(FINAL_SUBMISSION_KEY, JSON.stringify(data))
  },

  getTestChecklistStatus(): boolean {
    const stored = localStorage.getItem(TEST_CHECKLIST_KEY)
    return stored === 'true'
  },

  setTestChecklistStatus(passed: boolean): void {
    localStorage.setItem(TEST_CHECKLIST_KEY, passed.toString())
  },

  isProjectShipped(): boolean {
    const artifacts = this.getArtifacts()
    const allStepsCompleted = artifacts.every(a => a.uploaded)
    const testsPassed = this.getTestChecklistStatus()
    const submission = this.getFinalSubmission()
    const allLinksProvided = submission && 
      submission.lovableLink && 
      submission.githubLink && 
      submission.deployLink
    
    return allStepsCompleted && testsPassed && !!allLinksProvided
  }
}
