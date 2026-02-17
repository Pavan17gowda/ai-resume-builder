import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { artifactStore } from '../../store/artifactStore'
import { FinalSubmission } from '../../types'
import './Proof.css'

function Proof() {
  const navigate = useNavigate()
  const [artifacts, setArtifacts] = useState(artifactStore.getArtifacts())
  const [submission, setSubmission] = useState<FinalSubmission>(() => {
    const existing = artifactStore.getFinalSubmission()
    return existing || {
      lovableLink: '',
      githubLink: '',
      deployLink: '',
      testChecklistPassed: artifactStore.getTestChecklistStatus()
    }
  })
  const [copied, setCopied] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    setArtifacts(artifactStore.getArtifacts())
  }, [])

  const validateURL = (url: string, field: string): boolean => {
    if (!url) {
      setValidationErrors(prev => ({ ...prev, [field]: 'URL is required' }))
      return false
    }
    try {
      new URL(url)
      setValidationErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
      return true
    } catch {
      setValidationErrors(prev => ({ ...prev, [field]: 'Invalid URL format' }))
      return false
    }
  }

  const handleInputChange = (field: keyof FinalSubmission, value: string | boolean) => {
    const updated = { ...submission, [field]: value }
    setSubmission(updated)
    
    if (typeof value === 'string' && field !== 'testChecklistPassed') {
      validateURL(value, field)
    }
    
    artifactStore.saveFinalSubmission(updated)
    
    if (field === 'testChecklistPassed') {
      artifactStore.setTestChecklistStatus(value as boolean)
    }
  }

  const handleCopySubmission = () => {
    // Validate all URLs
    const lovableValid = validateURL(submission.lovableLink, 'lovableLink')
    const githubValid = validateURL(submission.githubLink, 'githubLink')
    const deployValid = validateURL(submission.deployLink, 'deployLink')

    if (!lovableValid || !githubValid || !deployValid) {
      return
    }

    const submissionText = `------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${submission.lovableLink}
GitHub Repository: ${submission.githubLink}
Live Deployment: ${submission.deployLink}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
------------------------------------------`

    navigator.clipboard.writeText(submissionText)
    
    // Mark as submitted
    const finalSubmission = {
      ...submission,
      submittedAt: new Date().toISOString()
    }
    artifactStore.saveFinalSubmission(finalSubmission)
    setSubmission(finalSubmission)
    
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const allStepsCompleted = artifacts.every(a => a.uploaded)
  const allLinksProvided = submission.lovableLink && submission.githubLink && submission.deployLink
  const isShipped = artifactStore.isProjectShipped()
  const canSubmit = allStepsCompleted && submission.testChecklistPassed && allLinksProvided

  return (
    <div className="proof-page">
      <header className="proof-header">
        <button className="back-btn" onClick={() => navigate('/rb/08-ship')}>
          ← Back to Steps
        </button>
        <h1>AI Resume Builder — Proof of Completion</h1>
        <div className={`status-badge ${isShipped ? 'shipped' : 'in-progress'}`}>
          {isShipped ? 'Shipped' : 'In Progress'}
        </div>
      </header>

      <div className="proof-content">
        {/* Section A: Step Completion Overview */}
        <section className="step-overview">
          <h2>Step Completion Overview</h2>
          <div className="status-grid">
            {artifacts.map(artifact => (
              <div 
                key={artifact.stepNumber} 
                className={`status-card ${artifact.uploaded ? 'completed' : 'incomplete'}`}
              >
                <div className="status-number">Step {artifact.stepNumber}</div>
                <div className="status-icon">
                  {artifact.uploaded ? '✓' : '○'}
                </div>
                <div className="status-label">
                  {artifact.uploaded ? 'Completed' : 'Not Completed'}
                </div>
                {artifact.fileName && (
                  <div className="status-file">{artifact.fileName}</div>
                )}
              </div>
            ))}
          </div>
          {!allStepsCompleted && (
            <p className="requirement-note">
              Complete all 8 steps to mark project as shipped.
            </p>
          )}
        </section>

        {/* Section B: Artifact Collection */}
        <section className="artifact-collection">
          <h2>Artifact Collection</h2>
          <p className="section-description">
            Required to mark project as shipped. All URLs must be valid.
          </p>

          <div className="input-group">
            <label>
              Lovable Project Link <span className="required">*</span>
            </label>
            <input
              type="url"
              placeholder="https://lovable.dev/projects/..."
              value={submission.lovableLink}
              onChange={(e) => handleInputChange('lovableLink', e.target.value)}
              onBlur={(e) => validateURL(e.target.value, 'lovableLink')}
              className={validationErrors.lovableLink ? 'error' : ''}
            />
            {validationErrors.lovableLink && (
              <span className="error-message">{validationErrors.lovableLink}</span>
            )}
          </div>

          <div className="input-group">
            <label>
              GitHub Repository Link <span className="required">*</span>
            </label>
            <input
              type="url"
              placeholder="https://github.com/username/repo"
              value={submission.githubLink}
              onChange={(e) => handleInputChange('githubLink', e.target.value)}
              onBlur={(e) => validateURL(e.target.value, 'githubLink')}
              className={validationErrors.githubLink ? 'error' : ''}
            />
            {validationErrors.githubLink && (
              <span className="error-message">{validationErrors.githubLink}</span>
            )}
          </div>

          <div className="input-group">
            <label>
              Deployed URL <span className="required">*</span>
            </label>
            <input
              type="url"
              placeholder="https://your-app.vercel.app"
              value={submission.deployLink}
              onChange={(e) => handleInputChange('deployLink', e.target.value)}
              onBlur={(e) => validateURL(e.target.value, 'deployLink')}
              className={validationErrors.deployLink ? 'error' : ''}
            />
            {validationErrors.deployLink && (
              <span className="error-message">{validationErrors.deployLink}</span>
            )}
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={submission.testChecklistPassed}
                onChange={(e) => handleInputChange('testChecklistPassed', e.target.checked)}
              />
              <span>All 10 checklist tests passed</span>
            </label>
            <p className="checkbox-note">
              Verify all tests in COMPREHENSIVE_TEST_CHECKLIST.md have passed.
            </p>
          </div>
        </section>

        {/* Final Submission */}
        <section className="final-submission">
          <h2>Final Submission</h2>
          
          <div className="requirements-checklist">
            <div className={`requirement-item ${allStepsCompleted ? 'met' : 'unmet'}`}>
              <span className="requirement-icon">{allStepsCompleted ? '✓' : '○'}</span>
              <span>All 8 steps marked completed</span>
            </div>
            <div className={`requirement-item ${submission.testChecklistPassed ? 'met' : 'unmet'}`}>
              <span className="requirement-icon">{submission.testChecklistPassed ? '✓' : '○'}</span>
              <span>All 10 checklist tests passed</span>
            </div>
            <div className={`requirement-item ${allLinksProvided ? 'met' : 'unmet'}`}>
              <span className="requirement-icon">{allLinksProvided ? '✓' : '○'}</span>
              <span>All 3 proof links provided</span>
            </div>
          </div>

          <button 
            className="copy-submission-btn"
            onClick={handleCopySubmission}
            disabled={!canSubmit}
          >
            {copied ? '✓ Copied!' : 'Copy Final Submission'}
          </button>

          {!canSubmit && (
            <p className="warning-message">
              Complete all requirements above to enable final submission.
            </p>
          )}

          {isShipped && (
            <div className="shipped-confirmation">
              <p className="shipped-message">Project 3 Shipped Successfully.</p>
              {submission.submittedAt && (
                <p className="shipped-date">
                  Submitted: {new Date(submission.submittedAt).toLocaleString()}
                </p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Proof
