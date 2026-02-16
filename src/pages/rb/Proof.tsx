import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { artifactStore } from '../../store/artifactStore'
import { ProofData } from '../../types'
import './Proof.css'

function Proof() {
  const navigate = useNavigate()
  const [artifacts, setArtifacts] = useState(artifactStore.getArtifacts())
  const [proofData, setProofData] = useState<ProofData>(artifactStore.getProofData())
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setArtifacts(artifactStore.getArtifacts())
  }, [])

  const handleInputChange = (field: keyof ProofData, value: string) => {
    const updated = { ...proofData, [field]: value }
    setProofData(updated)
    artifactStore.saveProofData(updated)
  }

  const handleCopySubmission = () => {
    const submission = `
AI Resume Builder - Final Submission
Project 3 - Build Track

Lovable Link: ${proofData.lovableLink}
GitHub Link: ${proofData.githubLink}
Deploy Link: ${proofData.deployLink}

Step Completion Status:
${artifacts.map(a => `Step ${a.stepNumber}: ${a.uploaded ? '✓ Completed' : '✗ Not Completed'}`).join('\n')}
    `.trim()

    navigator.clipboard.writeText(submission)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const allStepsCompleted = artifacts.every(a => a.uploaded)

  return (
    <div className="proof-page">
      <header className="proof-header">
        <button className="back-btn" onClick={() => navigate('/rb/01-problem')}>
          ← Back to Steps
        </button>
        <h1>AI Resume Builder - Proof of Completion</h1>
      </header>

      <div className="proof-content">
        <section className="step-status">
          <h2>Step Completion Status</h2>
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
                {artifact.fileName && (
                  <div className="status-file">{artifact.fileName}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="submission-links">
          <h2>Final Submission Links</h2>
          
          <div className="input-group">
            <label>Lovable Project Link</label>
            <input
              type="url"
              placeholder="https://lovable.dev/projects/..."
              value={proofData.lovableLink}
              onChange={(e) => handleInputChange('lovableLink', e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>GitHub Repository Link</label>
            <input
              type="url"
              placeholder="https://github.com/..."
              value={proofData.githubLink}
              onChange={(e) => handleInputChange('githubLink', e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Deployed Application Link</label>
            <input
              type="url"
              placeholder="https://..."
              value={proofData.deployLink}
              onChange={(e) => handleInputChange('deployLink', e.target.value)}
            />
          </div>

          <button 
            className="copy-submission-btn"
            onClick={handleCopySubmission}
            disabled={!allStepsCompleted}
          >
            {copied ? '✓ Copied!' : 'Copy Final Submission'}
          </button>

          {!allStepsCompleted && (
            <p className="warning">Complete all 8 steps to enable final submission.</p>
          )}
        </section>
      </div>
    </div>
  )
}

export default Proof
