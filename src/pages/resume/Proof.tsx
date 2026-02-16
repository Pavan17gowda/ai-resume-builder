import ResumeNav from '../../components/ResumeNav'
import './Proof.css'

function Proof() {
  return (
    <div className="proof-page-resume">
      <ResumeNav />
      
      <div className="proof-container-resume">
        <h1>Proof of Work</h1>
        
        <div className="proof-section">
          <h2>Resume Artifacts</h2>
          <p className="proof-placeholder">
            Upload your resume artifacts here to demonstrate completion.
          </p>
          
          <div className="artifact-grid">
            <div className="artifact-card">
              <div className="artifact-icon">📄</div>
              <p>Resume PDF</p>
            </div>
            <div className="artifact-card">
              <div className="artifact-icon">📊</div>
              <p>ATS Score</p>
            </div>
            <div className="artifact-card">
              <div className="artifact-icon">✅</div>
              <p>Validation</p>
            </div>
          </div>
        </div>

        <div className="proof-section">
          <h2>Submission Status</h2>
          <p className="proof-placeholder">
            Complete all sections to enable final submission.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Proof
