import { useEffect, useState } from 'react'
import { artifactStore } from '../store/artifactStore'
import './TopBar.css'

interface TopBarProps {
  step: number
  isCompleted: boolean
}

function TopBar({ step, isCompleted }: TopBarProps) {
  const [isShipped, setIsShipped] = useState(false)

  useEffect(() => {
    setIsShipped(artifactStore.isProjectShipped())
  }, [])

  const getStatusBadge = () => {
    if (isShipped) {
      return <span className="status-badge shipped">Shipped</span>
    }
    if (isCompleted) {
      return <span className="status-badge completed">✓ Completed</span>
    }
    return <span className="status-badge in-progress">In Progress</span>
  }

  return (
    <div className="top-bar">
      <div className="top-bar-left">AI Resume Builder</div>
      <div className="top-bar-center">Project 3 — Step {step} of 8</div>
      <div className="top-bar-right">
        {getStatusBadge()}
      </div>
    </div>
  )
}

export default TopBar
