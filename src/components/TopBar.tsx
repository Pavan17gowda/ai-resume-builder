import './TopBar.css'

interface TopBarProps {
  step: number
  isCompleted: boolean
}

function TopBar({ step, isCompleted }: TopBarProps) {
  return (
    <div className="top-bar">
      <div className="top-bar-left">AI Resume Builder</div>
      <div className="top-bar-center">Project 3 — Step {step} of 8</div>
      <div className="top-bar-right">
        <span className={`status-badge ${isCompleted ? 'completed' : 'in-progress'}`}>
          {isCompleted ? '✓ Completed' : 'In Progress'}
        </span>
      </div>
    </div>
  )
}

export default TopBar
