import { useNavigate } from 'react-router-dom'
import './ProofFooter.css'

interface ProofFooterProps {
  step: number
  isCompleted: boolean
  onNext: () => void
  canGoNext: boolean
}

function ProofFooter({ step, isCompleted, onNext, canGoNext }: ProofFooterProps) {
  const navigate = useNavigate()

  return (
    <footer className="proof-footer">
      <button 
        className="footer-btn"
        onClick={() => navigate('/rb/proof')}
      >
        View Proof Page
      </button>
      
      <div className="footer-status">
        Step {step}/8 {isCompleted && '✓'}
      </div>

      <button 
        className="footer-btn next-btn"
        onClick={onNext}
        disabled={!canGoNext}
      >
        Next Step →
      </button>
    </footer>
  )
}

export default ProofFooter
