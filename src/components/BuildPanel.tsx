import { useState } from 'react'
import { artifactStore } from '../store/artifactStore'
import './BuildPanel.css'

interface BuildPanelProps {
  step: number
  onArtifactUploaded: () => void
}

const stepInstructions = [
  'Define the core problem and user pain points for the AI Resume Builder.',
  'Research competitors and identify market opportunities.',
  'Design the system architecture including AI integration.',
  'Create high-level design diagrams and component structure.',
  'Detail the implementation plan with specific technologies.',
  'Build your AI Resume Builder in Lovable using the provided prompt.',
  'Test all features and document any issues found.',
  'Deploy your application and prepare final submission.'
]

function BuildPanel({ step, onArtifactUploaded }: BuildPanelProps) {
  const [copied, setCopied] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'worked' | 'error'>('idle')
  const [file, setFile] = useState<File | null>(null)

  const handleCopy = () => {
    navigator.clipboard.writeText(stepInstructions[step - 1])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0]
    if (uploadedFile) {
      setFile(uploadedFile)
    }
  }

  const handleWorked = () => {
    if (file) {
      artifactStore.uploadArtifact(step, file.name)
      setUploadStatus('worked')
      onArtifactUploaded()
    }
  }

  const handleError = () => {
    setUploadStatus('error')
  }

  return (
    <div className="build-panel-container">
      <h3>Build Instructions</h3>
      
      <div className="instruction-box">
        <p>{stepInstructions[step - 1]}</p>
      </div>

      <button className="copy-btn" onClick={handleCopy}>
        {copied ? '✓ Copied!' : 'Copy This Into Lovable'}
      </button>

      <a 
        href="https://lovable.dev" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="lovable-btn"
      >
        Build in Lovable →
      </a>

      <div className="upload-section">
        <h4>Upload Artifact</h4>
        <input 
          type="file" 
          onChange={handleFileUpload}
          accept=".pdf,.png,.jpg,.jpeg,.txt,.md,.zip"
        />
        {file && <p className="file-name">Selected: {file.name}</p>}
      </div>

      <div className="status-buttons">
        <button 
          className="status-btn worked" 
          onClick={handleWorked}
          disabled={!file}
        >
          It Worked ✓
        </button>
        <button 
          className="status-btn error" 
          onClick={handleError}
          disabled={!file}
        >
          Error ✗
        </button>
      </div>

      {uploadStatus === 'worked' && (
        <div className="status-message success">
          Artifact uploaded successfully!
        </div>
      )}
      {uploadStatus === 'error' && (
        <div className="status-message error-msg">
          Please review and try again.
        </div>
      )}
    </div>
  )
}

export default BuildPanel
