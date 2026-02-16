import { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { artifactStore } from '../store/artifactStore'
import TopBar from './TopBar'
import ContextHeader from './ContextHeader'
import BuildPanel from './BuildPanel'
import ProofFooter from './ProofFooter'
import './PremiumLayout.css'

interface PremiumLayoutProps {
  step: number
  children: ReactNode
}

function PremiumLayout({ step, children }: PremiumLayoutProps) {
  const navigate = useNavigate()
  const [canAccess, setCanAccess] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    const hasAccess = artifactStore.canAccessStep(step)
    const completed = artifactStore.isStepCompleted(step)
    
    setCanAccess(hasAccess)
    setIsCompleted(completed)

    if (!hasAccess) {
      navigate('/rb/01-problem')
    }
  }, [step, navigate])

  const handleNext = () => {
    if (isCompleted && step < 8) {
      const nextStep = step + 1
      navigate(`/rb/0${nextStep}-${getStepName(nextStep)}`)
    }
  }

  const getStepName = (stepNum: number): string => {
    const names = ['problem', 'market', 'architecture', 'hld', 'lld', 'build', 'test', 'ship']
    return names[stepNum - 1]
  }

  if (!canAccess) {
    return null
  }

  return (
    <div className="premium-layout">
      <TopBar step={step} isCompleted={isCompleted} />
      <ContextHeader step={step} />
      
      <div className="content-container">
        <main className="workspace">
          {children}
        </main>
        
        <aside className="build-panel">
          <BuildPanel step={step} onArtifactUploaded={() => setIsCompleted(true)} />
        </aside>
      </div>

      <ProofFooter 
        step={step} 
        isCompleted={isCompleted} 
        onNext={handleNext}
        canGoNext={isCompleted && step < 8}
      />
    </div>
  )
}

export default PremiumLayout
