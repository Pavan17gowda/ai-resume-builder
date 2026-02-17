import './ImprovementPanel.css'

interface ImprovementPanelProps {
  improvements: string[]
}

function ImprovementPanel({ improvements }: ImprovementPanelProps) {
  if (improvements.length === 0) {
    return null
  }

  return (
    <div className="improvement-panel">
      <h4>Top 3 Improvements</h4>
      <ul>
        {improvements.map((improvement, index) => (
          <li key={index}>{improvement}</li>
        ))}
      </ul>
    </div>
  )
}

export default ImprovementPanel
