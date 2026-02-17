import { ATSScoreResult } from '../utils/atsScoreCalculator'
import './ATSScoreCircle.css'

interface ATSScoreCircleProps {
  result: ATSScoreResult
}

function ATSScoreCircle({ result }: ATSScoreCircleProps) {
  const { score, level, label, suggestions } = result
  
  // Calculate circle progress
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const progress = circumference - (score / 100) * circumference

  const getColor = () => {
    switch (level) {
      case 'needs-work': return '#ef4444'
      case 'getting-there': return '#f59e0b'
      case 'strong': return '#10b981'
      default: return '#9ca3af'
    }
  }

  return (
    <div className="ats-score-circle-container">
      <h3 className="ats-title">ATS Resume Score</h3>
      
      <div className="circle-wrapper">
        <svg className="progress-ring" width="180" height="180">
          {/* Background circle */}
          <circle
            className="progress-ring-bg"
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="transparent"
            r={radius}
            cx="90"
            cy="90"
          />
          {/* Progress circle */}
          <circle
            className="progress-ring-progress"
            stroke={getColor()}
            strokeWidth="12"
            fill="transparent"
            r={radius}
            cx="90"
            cy="90"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: progress,
              transition: 'stroke-dashoffset 0.5s ease, stroke 0.3s ease'
            }}
          />
        </svg>
        <div className="score-content">
          <div className="score-number" style={{ color: getColor() }}>
            {score}
          </div>
          <div className="score-label" style={{ color: getColor() }}>
            {label}
          </div>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="ats-suggestions">
          <h4>Improve Your Score</h4>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ATSScoreCircle
