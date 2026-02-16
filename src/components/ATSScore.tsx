import { ATSScore as ATSScoreType } from '../utils/atsScoring'
import './ATSScore.css'

interface ATSScoreProps {
  score: ATSScoreType
}

function ATSScore({ score }: ATSScoreProps) {
  const getScoreColor = (value: number): string => {
    if (value >= 80) return '#8B0000'
    if (value >= 60) return '#4a4a4a'
    return '#9ca3af'
  }

  return (
    <div className="ats-score-container">
      <div className="ats-score-header">
        <h3>ATS Readiness Score</h3>
        <div className="ats-score-value" style={{ color: getScoreColor(score.score) }}>
          {score.score}
        </div>
      </div>

      <div className="ats-score-meter">
        <div 
          className="ats-score-fill" 
          style={{ 
            width: `${score.score}%`,
            backgroundColor: getScoreColor(score.score)
          }}
        />
      </div>

      {score.suggestions.length > 0 && (
        <div className="ats-suggestions">
          <h4>Suggestions</h4>
          <ul>
            {score.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ATSScore
